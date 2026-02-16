'use client'
import { useState } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { HeaderItem } from '../../../../types/menu'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

type Props = {
  item: HeaderItem
  depth?: number
  onClick?: () => void
  onBookAccessClick?: () => void
}

const MobileHeaderLink = ({ item, depth = 0, onClick, onBookAccessClick }: Props) => {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const hasSubmenu = !!item.submenu?.length

  return (
    <div className="w-full">
      <Link
        href={item.href}
        onClick={(e) => {
          if (hasSubmenu) {
            e.preventDefault()
            setOpen(!open)
          } else if (item.href === '/services/book-access' && onBookAccessClick) {
            e.preventDefault()
            onBookAccessClick()
            // Close mobile menu
            if (onClick) onClick()
          } else if (onClick) {
            onClick()
          }
        }}
        className={`flex items-center justify-between py-3 px-4 rounded-xl font-black ${
          path === item.href
            ? 'text-brand-orange bg-brand-orange/10'
            : 'text-brand-navy dark:text-white hover:bg-brand-sky/10'
        }`}
        aria-expanded={hasSubmenu ? open : undefined}
      >
        <span>{item.label}</span>
        {hasSubmenu && (
          <Icon
            icon="solar:alt-arrow-down-linear"
            className={`transition-transform ${open ? 'rotate-180' : ''}`}
          />
        )}
      </Link>

      <AnimatePresence>
        {open && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ps-4"
          >
            {item.submenu!.map((child, index) => (
              <MobileHeaderLink
                key={`${child.href}-${index}`}
                item={child}
                depth={depth + 1}
                onClick={onClick}
                onBookAccessClick={onBookAccessClick}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileHeaderLink
