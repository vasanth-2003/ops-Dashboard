import { NavLink } from 'react-router-dom'
import { T } from './typography.js'

const BASE = 'h-10 w-full flex items-center gap-3 px-3 py-2 rounded-md'

function NavItemContent({ icon: Icon, label, active }) {
  return (
    <>
      <Icon
        size={20}
        strokeWidth={2}
        aria-hidden="true"
        className={`shrink-0 ${active ? 'text-brand' : 'text-fg-tertiary'}`}
      />
      <span className={`${active ? `${T.bodySemibold} text-brand-on-subtle` : `${T.bodyMedium} text-fg-secondary`}`}>
        {label}
      </span>
    </>
  )
}

// With `to` it is a route link whose active state comes from the URL; without it, a plain button (Settings).
function NavItem({ label, icon, to, end }) {
  if (!to) {
    return (
      <button type="button" className={BASE}>
        <NavItemContent icon={icon} label={label} active={false} />
      </button>
    )
  }

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${BASE} ${isActive ? 'bg-brand-subtle' : ''}`}
    >
      {({ isActive }) => <NavItemContent icon={icon} label={label} active={isActive} />}
    </NavLink>
  )
}

export default NavItem
