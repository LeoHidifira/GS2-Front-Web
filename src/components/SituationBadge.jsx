import { SITUACOES } from '../constants/recursos.js'

const cores = {
  rascunho: 'bg-areia',
  publicado: 'bg-risco-baixo',
  a_confirmar: 'bg-risco-atencao',
}

// Selo com a situação do ponto de apoio, sempre escrita
export default function SituationBadge({ situacao }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-sm font-semibold border border-marinho/15 ${cores[situacao]}`}>
      {SITUACOES[situacao]?.nome ?? situacao}
    </span>
  )
}
