'use client'

import { useState } from 'react'
import { register } from '@/actions/auth'
import { useRouter } from 'next/navigation'

export function RegisterModal({ onClose, onSwitchToLogin }: { onClose: () => void, onSwitchToLogin: () => void }) {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const res = await register(formData)
    if (res?.error) {
      setError(res.error)
    } else {
      onClose()
      router.refresh()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Account</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" placeholder="First Name" required className="p-3 border rounded-lg w-full" />
            <input name="lastName" placeholder="Last Name" required className="p-3 border rounded-lg w-full" />
          </div>
          <input name="email" type="email" placeholder="Email" required className="p-3 border rounded-lg w-full" />
          <input name="phone" placeholder="Phone" className="p-3 border rounded-lg w-full" />
          <input name="country" placeholder="Country" className="p-3 border rounded-lg w-full" />
          <input name="password" type="password" placeholder="Password" required className="p-3 border rounded-lg w-full" />
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
            Sign In
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
    </div>
  )
}
