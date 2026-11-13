import { NIVEIS } from '../constants/riscos.js'

// Selo do nível de risco: cor + nome escrito (nunca só a cor)
export default function RiskBadge({ nivel, tamanho = 'normal' }) {
  const info = NIVEIS[nivel]
  if (!info) return null
  const classes = tamanho === 'grande' ? 'px-4 py-1.5 text-lg' : 'px-2.5 py-0.5 text-sm'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold text-marinho border border-marinho/20 ${info.classeFundo} ${classes}`}
    >
      Risco {info.rotulo}
    </span>
  )
}
