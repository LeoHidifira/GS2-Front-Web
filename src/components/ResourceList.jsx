import { RECURSOS } from '../constants/recursos.js'
import Icone from './Icone.jsx'

// Recursos do ponto com ícone + texto
export default function ResourceList({ recursos, tamanho = 'normal' }) {
  if (recursos.length === 0) return <span className="text-marinho/70">Nenhum recurso informado</span>
  const icone = tamanho === 'grande' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 ${tamanho === 'grande' ? 'text-lg' : 'text-sm'}`} aria-label="Recursos">
      {recursos.map((id) => (
        <li key={id} className="inline-flex items-center gap-1.5">
          <Icone nome={RECURSOS[id].icone} className={`${icone} text-sol-escuro`} />
          {RECURSOS[id].nome}
        </li>
      ))}
    </ul>
  )
}
