import { TELEFONE_SAMU } from '../constants/textos.js'
import Button from './Button.jsx'
import Icone from './Icone.jsx'
import RiskBadge from './RiskBadge.jsx'

// Aviso de risco Alto ou Extremo (RF04)
export default function AlertBanner({ nivel, classeFundo, titulo, ate, motivo, emitidoEm, compacto = false }) {
  return (
    <section role="alert" className={`rounded-2xl border-2 border-marinho/25 p-5 ${classeFundo}`}>
      <div className="flex flex-wrap items-center gap-2">
        <RiskBadge nivel={nivel} />
        <span className="font-bold">{ate}</span>
      </div>
      <h2 className="mt-2 text-xl font-bold leading-snug">{titulo}</h2>
      {!compacto && (
        <>
          <p className="mt-2">
            <strong>Por que este aviso: </strong>
            {motivo}
          </p>
          <p className="mt-1 text-sm">Aviso emitido às {emitidoEm}.</p>
        </>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        {compacto ? (
          <Button para="/alertas" variante="secundario" tamanho="pequeno">
            Ver alerta
          </Button>
        ) : (
          <>
            <Button para="/mapa">Onde me refrescar</Button>
            <Button href={`tel:${TELEFONE_SAMU}`} variante="secundario">
              <Icone nome="telefone" className="w-5 h-5" />
              Passou mal? Ligue {TELEFONE_SAMU}
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
