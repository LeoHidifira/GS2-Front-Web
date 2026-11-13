import { Link, NavLink } from 'react-router'
import { SLOGAN } from '../constants/textos.js'

// Cabeçalho com a logo. No desktop também mostra a navegação principal.
export default function Header({ links = [], inicio = '/', complemento }) {
  return (
    <header className="bg-creme/95 backdrop-blur border-b border-areia sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to={inicio} className="flex items-center gap-3 rounded-lg">
          <img src="/logo-solara.png" alt="Solara" className="h-11 w-auto" />
          <span className="hidden sm:block text-sm text-marinho/80 max-w-48 leading-tight">{SLOGAN}</span>
        </Link>
        {links.length > 0 && (
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex gap-1">
              {links.map((link) => (
                <li key={link.para}>
                  <NavLink
                    to={link.para}
                    end={link.para === '/'}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg font-semibold ${isActive ? 'bg-marinho text-creme' : 'hover:bg-areia'}`
                    }
                  >
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {complemento}
      </div>
    </header>
  )
}
