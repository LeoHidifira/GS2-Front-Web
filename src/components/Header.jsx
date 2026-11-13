import { Link, NavLink } from 'react-router'
import Icone from './Icone.jsx'

// Cabeçalho flutuante de vidro. No desktop mostra a navegação em pílula no centro.
export default function Header({ links = [], inicio = '/', complemento }) {
  return (
    <header className="sticky top-0 z-20 px-3 pt-3 md:px-4 md:pt-4">
      <div className="vidro shadow-suave max-w-6xl mx-auto rounded-full h-16 pl-3 pr-2 md:pl-5 flex items-center justify-between gap-4">
        <Link to={inicio} className="flex items-center rounded-full shrink-0">
          <img src="/logo-solara.png" alt="Solara, página inicial" className="h-11 w-auto mix-blend-multiply" />
        </Link>

        {links.length > 0 && (
          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex gap-1 rounded-full bg-nevoa/80 p-1">
              {links.map((link) => (
                <li key={link.para}>
                  <NavLink
                    to={link.para}
                    end={link.para === '/'}
                    className={({ isActive }) =>
                      `block rounded-full px-5 py-2 text-[0.95rem] font-medium transition-colors ${
                        isActive ? 'bg-floresta text-creme shadow-suave' : 'text-tinta/75 hover:text-tinta hover:bg-white/70'
                      }`
                    }
                  >
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {complemento}
          {links.length > 0 && (
            <NavLink
              to="/alertas"
              aria-label="Alertas"
              className="md:hidden grid place-items-center w-11 h-11 rounded-full bg-white/80 border border-tinta/10"
            >
              <Icone nome="alerta" className="w-5 h-5" />
            </NavLink>
          )}
        </div>
      </div>
    </header>
  )
}
