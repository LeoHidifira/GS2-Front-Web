import { RECURSOS } from '../constants/recursos.js'

// Recursos do ponto com ícone + texto
export default function ResourceList({ recursos, tamanho = 'normal' }) {
  if (recursos.length === 0) return <span>Nenhum recurso informado</span>
  const classes = tamanho === 'grande' ? 'px-3 py-1.5' : 'px-2 py-0.5 text-sm'
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Recursos">
      {recursos.map((id) => (
        <li key={id} className={`inline-flex items-center gap-1 bg-creme border border-marinho/15 rounded-full ${classes}`}>
          <span aria-hidden="true">{RECURSOS[id].icone}</span>
          {RECURSOS[id].nome}
        </li>
      ))}
    </ul>
  )
}
