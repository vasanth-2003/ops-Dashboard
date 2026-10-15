import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from '../ui/Sidebar.jsx'
import { T } from '../ui/typography.js'

function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!drawerOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [drawerOpen])

  return (
    <div className="flex min-h-screen bg-canvas">
      <div className="hidden lg:block sticky top-0 h-screen shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden flex items-center gap-3 h-14 px-4 bg-surface border-b border-border">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            className="size-9 flex items-center justify-center rounded-md border border-border text-fg-secondary"
          >
            <Menu size={20} strokeWidth={2} aria-hidden="true" />
          </button>
          <span className={`${T.h3} text-fg`}>Affiliate Ops</span>
        </header>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="h-full shrink-0">
            <Sidebar />
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="flex-1 bg-fg/40"
          />
        </div>
      )}
    </div>
  )
}

export default AppShell
