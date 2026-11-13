import { NavLink } from 'react-router'
import Icone from './Icone.jsx'

// Navegação inferior fixa, só no celular
export default function BottomNav({ links }) {
  return (
    <nav
      aria-label="Navegação inferior"
      className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-creme border-t border-marinho/20 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-4">
        {links.map((link) => (
          <li key={link.para}>
            <NavLink
              to={link.para}
              end={link.para === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 pt-2 pb-2.5 text-xs font-semibold border-t-2 -mt-px ${
                  isActive ? 'border-sol-escuro text-marinho' : 'border-transparent text-marinho/65'
                }`
              }
            >
              <Icone nome={link.icone} className="w-6 h-6" />
              {link.rotulo}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
