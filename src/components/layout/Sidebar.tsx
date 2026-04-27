import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/useAppStore'

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Models', path: '/models' },
  { name: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const { sidebarOpen } = useAppStore()
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 mt-[var(--navbar-height)] w-[var(--sidebar-width)] transform border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 ease-in-out md:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <nav className="flex h-full flex-col gap-2 p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                  : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
              )}
            >
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
