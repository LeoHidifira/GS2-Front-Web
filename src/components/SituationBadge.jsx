import { SITUACOES } from '../constants/recursos.js'

const cores = {
  rascunho: 'bg-marinho/30',
  publicado: 'bg-green-700',
  a_confirmar: 'bg-amber-500',
}

// Situação do ponto de apoio, sempre escrita
export default function SituationBadge({ situacao }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm whitespace-nowrap">
      <span className={`w-2 h-2 rounded-full ${cores[situacao]}`} aria-hidden="true" />
      {SITUACOES[situacao]?.nome ?? situacao}
    </span>
  )
}
