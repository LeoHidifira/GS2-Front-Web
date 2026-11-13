import { TELEFONE_SAMU } from '../constants/textos.js'
import Button from './Button.jsx'
import Icone from './Icone.jsx'
import RiskBadge from './RiskBadge.jsx'

// Aviso de risco Alto ou Extremo (RF04)
export default function AlertBanner({ nivel, classeFundo, titulo, ate, motivo, emitidoEm, compacto = false }) {
  if (compacto) {
    return (
      <section role="alert" className={`border-l-4 border-marinho px-4 py-3 ${classeFundo}`}>
        <p className="font-semibold">{titulo}</p>
        <Button para="/alertas" variante="texto" tamanho="pequeno">
          Ver o alerta
        </Button>
      </section>
    )
  }

  return (
    <section role="alert" className={`border-2 border-marinho/80 px-4 py-4 md:px-5 ${classeFundo}`}>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <RiskBadge nivel={nivel} />
        <span className="font-semibold">{ate}</span>
      </p>
      <h2 className="mt-2 font-titulo text-2xl font-bold leading-snug">{titulo}</h2>
      <p className="mt-3">
        <strong>Por que este aviso: </strong>
        {motivo}
      </p>
      <p className="mt-1 text-sm">Aviso das {emitidoEm}.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button para="/mapa">
          Onde me refrescar
          <Icone nome="rota" className="w-5 h-5" />
        </Button>
        <Button href={`tel:${TELEFONE_SAMU}`} variante="secundario">
          <Icone nome="telefone" className="w-5 h-5" />
          Ligar {TELEFONE_SAMU}
        </Button>
      </div>
    </section>
  )
}
