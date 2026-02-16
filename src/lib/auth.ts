import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = process.env.JWT_SECRET || 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Session expires in 24 hours
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const session = (await cookies()).get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  // Refresh the session expiration
  const parsed = await decrypt(session)
  if (!parsed) return

  const res = NextResponse.next()
  
  // Create a new token with updated expiration
  const newSession = await encrypt(parsed)
  
  res.cookies.set({
    name: 'session',
    value: newSession,
    httpOnly: true,
    secure: true, // Always true in production/dev for this requirements
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: 'strict',
  })
  
  return res
}
