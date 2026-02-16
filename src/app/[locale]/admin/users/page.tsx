import { getUsers, deleteUser, updateUserRole } from '@/actions/admin'

export default async function AdminUsersPage() {
  const users = await getUsers()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Created</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <form action={async () => {
                    'use server'
                    await updateUserRole(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')
                  }} className="inline">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                      {user.role === 'ADMIN' ? 'Demote' : 'Promote'}
                    </button>
                  </form>
                  <form action={async () => {
                    'use server'
                    // Note: window.confirm doesn't work in server actions direct calls like this in some contexts, 
                    // but keeping logic consistent with existing implementation for now.
                    await deleteUser(user.id)
                  }} className="inline">
                    <button className="text-red-600 hover:text-red-800 font-medium text-xs">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
