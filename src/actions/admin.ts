'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// --- User Management ---

export async function getUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
  revalidatePath('/admin/users')
}

export async function updateUserRole(id: string, role: 'USER' | 'ADMIN') {
  await prisma.user.update({
    where: { id },
    data: { role },
  })
  revalidatePath('/admin/users')
}

// --- Access Code Management ---

export async function getAccessCodes() {
  return await prisma.accessCode.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function generateAccessCode(data: {
  validityDays: number
  userId?: string
  email?: string
}) {
  const rawCode = crypto.randomBytes(12).toString('hex').toUpperCase()
  const codeHash = crypto.createHash('sha256').update(rawCode).digest('hex')
  
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + data.validityDays)

  await prisma.accessCode.create({
    data: {
      codeHash,
      validityDays: data.validityDays,
      expiresAt: expiresAt,
      userId: data.userId || null,
      email: data.email || null,
    },
  })

  revalidatePath('/admin/codes')
  return { rawCode } // Only return raw code once
}

export async function deleteAccessCode(id: string) {
  await prisma.accessCode.delete({ where: { id } })
  revalidatePath('/admin/codes')
}
