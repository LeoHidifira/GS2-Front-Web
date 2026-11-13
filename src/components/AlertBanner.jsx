import { Link } from 'react-router'
import { TELEFONE_SAMU } from '../constants/textos.js'
import Button from './Button.jsx'
import Icone from './Icone.jsx'
import RiskBadge from './RiskBadge.jsx'

// Aviso de risco Alto ou Extremo (RF04)
export default function AlertBanner({ nivel, classeFundo, titulo, ate, motivo, emitidoEm, compacto = false }) {
  if (compacto) {
    return (
      <section role="alert" className={`relative rounded-[1.5rem] px-4 py-3.5 flex items-center gap-4 ${classeFundo}`}>
        <span className="grid place-items-center shrink-0 w-11 h-11 rounded-2xl bg-white/60">
          <Icone nome="alerta" className="w-5 h-5" />
        </span>
        <p className="flex-1 font-semibold">
          <Link to="/alertas" className="after:absolute after:inset-0 rounded">
            {titulo}
          </Link>
        </p>
        <span className="text-sm font-medium hidden sm:inline">Ver o alerta</span>
        <Icone nome="abrir" className="w-5 h-5 shrink-0" />
      </section>
    )
  }

  return (
    <section role="alert" className={`relative overflow-hidden rounded-[2rem] px-6 py-6 md:px-8 md:py-7 shadow-suave ${classeFundo}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 w-56 h-56 rounded-full border border-tinta/10" />
      <p className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full ring-1 ring-tinta/20">
          <RiskBadge nivel={nivel} />
        </span>
        <span className="font-semibold">{ate}</span>
      </p>
      <h2 className="relative mt-4 font-titulo text-3xl md:text-4xl font-normal leading-tight">{titulo}</h2>
      <p className="relative mt-3">
        <strong>Por que este aviso: </strong>
        {motivo}
      </p>
      <p className="relative mt-1 text-sm">Aviso das {emitidoEm}.</p>
      <div className="relative mt-6 flex flex-wrap gap-3">
        <Button para="/mapa" seta>
          Onde me refrescar
        </Button>
        <Button href={`tel:${TELEFONE_SAMU}`} variante="secundario">
          <Icone nome="telefone" className="w-5 h-5" />
          Ligar {TELEFONE_SAMU}
        </Button>
      </div>
    </section>
  )
}
