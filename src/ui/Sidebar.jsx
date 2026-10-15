import { Calendar, Compass, LayoutDashboard, Link, Settings2, Wallet } from 'lucide-react'
import NavItem from './NavItem.jsx'
import { T } from './typography.js'

const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, to: '/', end: true },
  { label: 'Links & analytics', icon: Link, to: '/links' },
  { label: 'Research board', icon: Compass, to: '/research' },
  { label: 'Content calendar', icon: Calendar, to: '/content' },
  { label: 'Payouts', icon: Wallet, to: '/payouts' },
]

function Sidebar() {
  return (
    <aside className="w-60 h-full flex flex-col gap-6 px-4 py-5 bg-surface border-r border-border">
      <div data-figma="brand" className="flex items-center gap-3 px-2 py-1">
        <div className={`size-8 shrink-0 flex items-center justify-center rounded-md bg-brand text-on-brand ${T.captionMedium}`}>
          AO
        </div>
        <div className="flex flex-col whitespace-nowrap">
          <span className={`${T.h3} text-fg`}>Affiliate Ops</span>
          <span className={`${T.captionRegular} text-fg-tertiary`}>Internal workspace</span>
        </div>
      </div>

      <nav data-figma="nav" aria-label="Main" className="flex flex-col gap-1">
        <div className="pl-3 pt-2 pb-1">
          <p className={`${T.overline} text-fg-tertiary`}>Workspace</p>
        </div>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      <div data-figma="spacer" className="flex-1" />

      <div data-figma="settings">
        <NavItem label="Settings" icon={Settings2} />
      </div>

      <div data-figma="user" className="flex items-center gap-3 p-3 rounded-md bg-subtle">
        <div className={`size-8 shrink-0 flex items-center justify-center rounded-full bg-brand-subtle text-brand-on-subtle ${T.captionMedium}`}>
          OW
        </div>
        <div className="flex flex-col min-w-0 whitespace-nowrap">
          <span className={`${T.bodySemibold} text-fg`}>Owner</span>
          <span className={`${T.captionRegular} text-fg-tertiary`}>Admin</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
