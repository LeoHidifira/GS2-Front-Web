import { NavLink, Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { NAVEGACAO_PAINEL } from '../constants/textos.js'

const classeLink = ({ isActive }) =>
  `block px-3 py-2 font-semibold whitespace-nowrap border-b-2 md:border-b-0 md:border-l-2 ${
    isActive ? 'border-sol-escuro text-marinho' : 'border-transparent text-marinho/70 hover:text-marinho'
  }`

// Layout do painel do administrador: menu lateral no desktop e abas no celular
export default function PainelLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header
        inicio="/painel"
        complemento={
          <NavLink to="/" className="text-sm font-semibold underline underline-offset-4 rounded">
            Voltar ao app
          </NavLink>
        }
      />
      <div className="flex-1 w-full max-w-7xl mx-auto md:flex">
        <aside className="md:w-52 md:shrink-0 md:border-r border-marinho/15 px-4 pt-4 md:py-8">
          <p className="hidden md:block text-sm text-marinho/70 mb-2 px-3">Administração</p>
          <nav aria-label="Menu do painel">
            <ul className="flex md:flex-col gap-4 md:gap-1 overflow-x-auto border-b border-marinho/15 md:border-b-0">
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
