import { NavLink, Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import { NAVEGACAO_PAINEL } from '../constants/textos.js'

const classeLink = ({ isActive }) =>
  `block px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap ${
    isActive ? 'bg-marinho text-creme' : 'hover:bg-areia'
  }`

// Layout do painel do administrador: menu lateral no desktop e abas no celular
export default function PainelLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header
        inicio="/painel"
        complemento={
          <NavLink to="/" className="font-semibold underline underline-offset-4 rounded">
            Voltar ao app
          </NavLink>
        }
      />
      <div className="flex-1 w-full max-w-6xl mx-auto md:flex">
        <aside className="md:w-60 md:shrink-0 md:border-r border-areia px-4 pt-4 md:py-8">
          <p className="hidden md:block text-sm font-semibold uppercase tracking-wide text-marinho/70 mb-3 px-4">
            Painel
          </p>
          <nav aria-label="Menu do painel">
            <ul className="flex md:flex-col gap-2 overflow-x-auto">
              {NAVEGACAO_PAINEL.map((link) => (
                <li key={link.para}>
                  <NavLink to={link.para} className={classeLink}>
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main id="conteudo" className="flex-1 min-w-0 px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
