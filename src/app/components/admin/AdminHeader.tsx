'use client'

import { ThemeSwitcher } from '../Theme/ThemeSwitcher'
import LanguageSwitcher from '../Layout/Header/LanguageSwitcher'
import { Icon } from '@iconify/react'
import { useTranslations } from 'next-intl'

interface AdminHeaderProps {
    user: {
        name?: string | null
        email?: string | null
        image?: string | null
    } | null
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const t = useTranslations('admin')
  return (
    <header className="sticky top-4 z-30 mb-8">
        <div className="flex items-center justify-between">
            {/* Search / Breadcrumbs placeholder */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-brand-navy/10 transition-all w-64 shadow-sm">
                    <Icon icon="solar:magnifer-linear" className="text-slate-400" width={20} />
                    <input 
                        type="text" 
                        placeholder={t('search')} 
                        className="bg-transparent border-none outline-none text-sm text-slate-700 dark:text-white placeholder:text-slate-400 w-full"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 pe-4 border-e border-slate-200 dark:border-slate-700">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
                
                <div className="flex items-center gap-3 ps-2">
                    <div className="hidden md:block text-end">
                        <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{user?.email}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-navy dark:bg-white flex items-center justify-center text-white dark:text-brand-navy font-bold shadow-md">
                        {user?.name?.[0]?.toUpperCase() || 'A'}
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
