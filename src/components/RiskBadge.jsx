import { NIVEIS } from '../constants/riscos.js'

// Selo do nível de risco: cor + nome escrito (nunca só a cor)
export default function RiskBadge({ nivel }) {
  const info = NIVEIS[nivel]
  if (!info) return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap text-tinta ${info.classeFundo}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-tinta" aria-hidden="true" />
      Risco {info.rotulo}
    </span>
  )
}
