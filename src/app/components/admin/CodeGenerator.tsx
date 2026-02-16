'use client'

import { useState } from 'react'
import { generateAccessCode } from '@/actions/admin'

export function CodeGenerator() {
  const [validityDays, setValidityDays] = useState(1)
  const [email, setEmail] = useState('')
  const [rawCode, setRawCode] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    try {
      const res = await generateAccessCode({ validityDays, email })
      setRawCode(res.rawCode)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Generate Access Code</h3>
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Validity (Days)</label>
          <select 
            value={validityDays} 
            onChange={(e) => setValidityDays(Number(e.target.value))}
            className="p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value={1}>1 Day</option>
            <option value={2}>2 Days</option>
            <option value={10}>10 Days</option>
            <option value={30}>30 Days</option>
            <option value={365}>1 Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Email (Optional)</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none w-64"
          />
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Power Code'}
        </button>
      </div>

      {rawCode && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 font-bold mb-1">Raw Code (Save it now, it won&apos;t be shown again!):</p>
          <code className="text-2xl font-mono text-red-600 font-bold tracking-widest">{rawCode}</code>
        </div>
      )}
    </div>
  )
}
