import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AppLayout from './layouts/AppLayout.jsx'
import PainelLayout from './layouts/PainelLayout.jsx'
import Inicio from './pages/Inicio.jsx'
import Alertas from './pages/Alertas.jsx'
import Mapa from './pages/Mapa.jsx'
import DetalhePonto from './pages/DetalhePonto.jsx'
import Historico from './pages/Historico.jsx'
import MeusBairros from './pages/MeusBairros.jsx'
import PainelRegioes from './pages/painel/PainelRegioes.jsx'
import PainelPontos from './pages/painel/PainelPontos.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route path="/historico/:regiaoId" element={<Historico />} />
          <Route path="/bairros" element={<MeusBairros />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
        <Route path="/painel" element={<PainelLayout />}>
          <Route index element={<Navigate to="regioes" replace />} />
          <Route path="regioes" element={<PainelRegioes />} />
          <Route path="pontos" element={<PainelPontos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
