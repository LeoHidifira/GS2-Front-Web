import { RECURSOS } from '../constants/recursos.js'
import Icone from './Icone.jsx'

// Recursos do ponto com ícone + texto
export default function ResourceList({ recursos, tamanho = 'normal' }) {
  if (recursos.length === 0) return <span className="text-tinta/65">Nenhum recurso informado</span>
  const grande = tamanho === 'grande'
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Recursos">
      {recursos.map((id) => (
        <li
          key={id}
          className={`inline-flex items-center gap-1.5 rounded-full bg-nevoa text-floresta-escuro font-medium ${
            grande ? 'px-4 py-2' : 'px-2.5 py-1 text-sm'
          }`}
        >
          <Icone nome={RECURSOS[id].icone} className={grande ? 'w-5 h-5' : 'w-4 h-4'} />
          {RECURSOS[id].nome}
        </li>
      ))}
    </ul>
  )
}
