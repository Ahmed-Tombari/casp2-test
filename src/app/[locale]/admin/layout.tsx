import { ReactNode } from 'react'
import { Link } from '@/i18n/routing'
import { getSession } from '@/lib/auth'
import { redirect } from '@/i18n/routing'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession()
  if (!session || session.user.role !== 'ADMIN') {
    redirect({ href: '/', locale: 'ar' })
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Casp Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            Dashboard
          </Link>
          <Link href="/admin/users" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            Users
          </Link>
          <Link href="/admin/codes" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium">
            Access Codes
          </Link>
          <hr className="my-2" />
          <Link href="/" className="block p-3 rounded-lg hover:bg-gray-50 text-gray-600">
            Back to Site
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
