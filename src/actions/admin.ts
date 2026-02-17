'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'
import { encrypt, decrypt } from '@/lib/encryption'

// --- User Management ---

export async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      accessCodes: {
        select: {
          code: true,
          used: true,
          expiresAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return users.map(user => ({
    ...user,
    accessCodes: user.accessCodes.map(ac => ({
      ...ac,
      code: ac.code ? decrypt(ac.code) : null
    }))
  }))
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
  const codes = await prisma.accessCode.findMany({
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

  return codes.map(code => ({
    ...code,
    code: code.code ? decrypt(code.code) : null
  }))
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
      code: encrypt(rawCode),
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

export async function getUnassignedCodes() {
  const codes = await prisma.accessCode.findMany({
    where: {
      userId: null,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  })

  return codes.map(code => ({
    ...code,
    code: code.code ? decrypt(code.code) : null
  }))
}

export async function assignCode(codeId: string, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: true },
  })

  if (!user) throw new Error('User not found')

  const updatedCode = await prisma.accessCode.update({
    where: { id: codeId },
    data: {
      userId,
      email: user.email,
    },
  })

  revalidatePath('/admin/users')
  revalidatePath('/admin/codes')

  return {
    ...updatedCode,
    code: updatedCode.code ? decrypt(updatedCode.code) : null
  }
}
