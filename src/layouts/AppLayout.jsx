import { Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { NAVEGACAO_CIDADAO } from '../constants/textos.js'

// Layout do cidadão: conteúdo central pensado para celular e navegação inferior fixa
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 bg-marinho text-creme px-4 py-2 rounded-lg"
      >
        Pular para o conteúdo
      </a>
      <Header links={NAVEGACAO_CIDADAO} />
      <main id="conteudo" className="flex-1 w-full max-w-2xl mx-auto px-4 pt-4 pb-28 md:pb-10">
        <Outlet />
      </main>
      <BottomNav links={NAVEGACAO_CIDADAO} />
    </div>
  )
}
