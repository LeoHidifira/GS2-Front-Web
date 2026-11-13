import { NIVEIS } from '../constants/riscos.js'

// Selo do nível de risco: cor + nome escrito (nunca só a cor)
export default function RiskBadge({ nivel }) {
  const info = NIVEIS[nivel]
  if (!info) return null
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap">
      <span className={`w-3 h-3 rounded-sm border border-marinho/40 ${info.classeFundo}`} aria-hidden="true" />
      Risco {info.rotulo}
    </span>
  )
}
