import { Link, NavLink } from 'react-router'

// Cabeçalho com a logo. No desktop também mostra a navegação principal.
export default function Header({ links = [], inicio = '/', complemento }) {
  return (
    <header className="bg-creme border-b border-marinho/15 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to={inicio} className="flex items-center rounded">
          <img src="/logo-solara.png" alt="Solara, página inicial" className="h-10 w-auto" />
        </Link>
        {links.length > 0 && (
          <nav aria-label="Navegação principal" className="hidden md:block h-full">
            <ul className="flex gap-6 h-full">
              {links.map((link) => (
                <li key={link.para} className="h-full">
                  <NavLink
                    to={link.para}
                    end={link.para === '/'}
                    className={({ isActive }) =>
                      `h-full flex items-center border-b-2 font-semibold ${
                        isActive ? 'border-sol-escuro' : 'border-transparent text-marinho/75 hover:text-marinho'
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
        {complemento}
      </div>
    </header>
  )
}
