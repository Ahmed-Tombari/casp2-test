import { getAccessCodes, deleteAccessCode } from '@/actions/admin'
import { CodeGenerator } from '@/app/components/admin/CodeGenerator'

interface AccessCodeWithUser {
  id: string
  codeHash: string
  userId: string | null
  email: string | null
  validityDays: number
  expiresAt: Date
  used: boolean
  createdAt: Date
  user: {
    firstName: string
    lastName: string
    email: string
  } | null
}

export default async function AdminCodesPage() {
  const codes = await getAccessCodes() as AccessCodeWithUser[]

  function getStatus(code: AccessCodeWithUser) {
    if (code.used) return { label: 'Used', class: 'bg-gray-100 text-gray-700' }
    if (new Date(code.expiresAt) < new Date()) return { label: 'Expired', class: 'bg-red-100 text-red-700' }
    return { label: 'Active', class: 'bg-green-100 text-green-700' }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Access Codes</h2>
      
      <CodeGenerator />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Assigned To</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Validity</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Expires</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {codes.map((code) => {
              const status = getStatus(code)
              return (
                <tr key={code.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {code.user ? `${code.user.firstName} ${code.user.lastName}` : (code.email || 'Unassigned')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {code.validityDays} days
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(code.expiresAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${status.class}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">
                    <form action={async () => {
                      'use server'
                      await deleteAccessCode(code.id)
                    }} className="inline">
                      <button className="text-red-600 hover:text-red-800 font-medium text-xs">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
