import { Outlet } from 'react-router'
import Header from '../components/Header.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Footer from '../components/Footer.jsx'
import Button from '../components/Button.jsx'
import { NAVEGACAO_CIDADAO } from '../constants/textos.js'

// Layout do cidadão: no celular, navegação inferior flutuante; no desktop, cabeçalho em pílula
export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 bg-floresta text-creme px-4 py-2 rounded-full"
      >
        Pular para o conteúdo
      </a>
      <Header
        links={NAVEGACAO_CIDADAO}
        complemento={
          <Button para="/mapa" seta className="hidden md:inline-flex">
            Onde me refrescar
          </Button>
        }
      />
      <main id="conteudo" className="flex-1 w-full max-w-6xl mx-auto px-4 pt-6 md:pt-10">
        <Outlet />
      </main>
      <Footer />
      <BottomNav links={NAVEGACAO_CIDADAO} />
    </div>
  )
}
