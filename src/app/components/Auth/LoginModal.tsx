'use client'

import { useState } from 'react'
import { login } from '@/actions/auth'
import { useRouter } from '@/i18n/routing'

export function LoginModal({ onClose, onSwitchToRegister }: { onClose: () => void, onSwitchToRegister: () => void }) {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const res = await login(formData)
    if (res?.error) {
      setError(res.error)
    } else if (res?.user) {
      onClose()
      if (res.user.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/')
      }
      router.refresh()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome Back</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form action={handleSubmit} className="space-y-4">
          <input name="email" type="email" placeholder="Email" required className="p-3 border rounded-lg w-full" />
          <input name="password" type="password" placeholder="Password" required className="p-3 border rounded-lg w-full" />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  )
}
