import { NavLink } from 'react-router'
import Icone from './Icone.jsx'

// Navegação inferior fixa, só no celular
export default function BottomNav({ links }) {
  return (
    <nav
      aria-label="Navegação inferior"
      className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-marinho text-creme pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-4">
        {links.map((link) => (
          <li key={link.para}>
            <NavLink
              to={link.para}
              end={link.para === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-sm font-semibold ${isActive ? 'text-sol' : 'text-creme'}`
              }
            >
              <Icone nome={link.icone} />
              {link.rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
