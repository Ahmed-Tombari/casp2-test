import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { watermarkPdf } from '@/lib/pdf'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const blobUrl = searchParams.get('url')
  const accessCode = searchParams.get('code')

  if (!blobUrl) return new NextResponse('Missing URL', { status: 400 })

  let user = null
  const session = await getSession()
  
  if (session) {
    user = session.user
  } else if (accessCode) {
    // Check access code
    const crypto = await import('crypto')
    const codeHash = crypto.createHash('sha256').update(accessCode).digest('hex')
    
    const code = await prisma.accessCode.findUnique({
      where: { codeHash },
      include: { user: true }
    })

    if (!code || code.used || new Date(code.expiresAt) < new Date()) {
      return new NextResponse('Invalid or expired code', { status: 403 })
    }
    
    user = code.user ? { 
      name: `${code.user.firstName} ${code.user.lastName}`, 
      email: code.user.email 
    } : { 
      name: 'Guest User', 
      email: code.email || 'guest@example.com' 
    }
  }

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // Fetch file from Vercel Blob
  try {
    const response = await fetch(blobUrl)
    const pdfBuffer = await response.arrayBuffer()
    
    // Apply watermark
    const watermarkedBuffer = await watermarkPdf(pdfBuffer, user)

    // Log access
    await prisma.accessLog.create({
      data: {
        userId: session?.user?.id || null,
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      }
    })

    return new NextResponse(watermarkedBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
      }
    })
  } catch (error) {
    console.error('PDF Stream Error:', error)
    return new NextResponse('Error streaming PDF', { status: 500 })
  }
}
