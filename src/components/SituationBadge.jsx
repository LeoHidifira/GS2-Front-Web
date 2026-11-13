import { SITUACOES } from '../constants/recursos.js'

const cores = {
  rascunho: 'bg-nevoa text-tinta/80',
  publicado: 'bg-salvia/70 text-floresta-escuro',
  a_confirmar: 'bg-risco-atencao text-tinta',
}

// Situação do ponto de apoio, sempre escrita
export default function SituationBadge({ situacao }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${cores[situacao] ?? ''}`}>
      {SITUACOES[situacao]?.nome ?? situacao}
    </span>
  )
}
