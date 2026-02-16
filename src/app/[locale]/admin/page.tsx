import prisma from '@/lib/prisma'

export default async function AdminDashboard() {
  try {
    const userCount = await prisma.user.count()
    const codeCount = await prisma.accessCode.count()
    const activeCodeCount = await prisma.accessCode.count({ where: { expiresAt: { gt: new Date() } } })

    return (
      <div>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium text-sm">Total Users</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">{userCount}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium text-sm">Total Access Codes</h3>
            <p className="text-3xl font-bold mt-2 text-gray-900">{codeCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-gray-500 font-medium text-sm">Active Codes</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">{activeCodeCount}</p>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to load admin dashboard:', error)
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-xl">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Dashboard</h2>
        <p className="text-red-600">There was an issue fetching the dashboard data. Please check your database connection.</p>
        <div className="mt-6 flex gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
             <h3 className="text-gray-500 font-medium text-sm">Total Users</h3>
             <p className="text-2xl font-bold mt-1">--</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex-1">
             <h3 className="text-gray-500 font-medium text-sm">Access Codes</h3>
             <p className="text-2xl font-bold mt-1">--</p>
          </div>
        </div>
      </div>
    )
  }
}
