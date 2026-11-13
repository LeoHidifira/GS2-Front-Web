import { NavLink, Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import Icone from '../components/Icone.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import Button from '../components/Button.jsx'
import { NAVEGACAO_PAINEL } from '../constants/textos.js'

// Layout do painel do administrador: trilho lateral flutuante no desktop e abas em pílula no celular
export default function PainelLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header
        inicio="/painel"
        complemento={
          <Button para="/" variante="secundario" tamanho="pequeno">
            <Icone nome="voltar" className="w-4 h-4" />
            Voltar ao app
          </Button>
        }
      />
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 pt-6 md:pt-10 pb-10 md:flex md:gap-8">
        <aside className="md:w-56 md:shrink-0">
          <div className="md:sticky md:top-28 vidro shadow-suave rounded-full md:rounded-[2rem] p-1.5 md:p-3">
            <p className="hidden md:block sobrescrito text-tinta/60 px-3 pt-2 pb-3">Administração</p>
            <nav aria-label="Menu do painel">
              <ul className="flex md:flex-col gap-1">
                {NAVEGACAO_PAINEL.map((link) => (
                  <li key={link.para} className="flex-1 md:flex-none">
                    <NavLink
                      to={link.para}
                      className={({ isActive }) =>
                        `flex items-center justify-center md:justify-start gap-2.5 rounded-full px-4 py-2.5 font-medium whitespace-nowrap transition-colors ${
                          isActive ? 'bg-floresta text-creme shadow-suave' : 'text-tinta/75 hover:bg-white/80 hover:text-tinta'
                        }`
                      }
                    >
                      <Icone nome={link.icone} className="w-5 h-5" />
                      {link.rotulo}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
        <main id="conteudo" className="flex-1 min-w-0 pt-6 md:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
