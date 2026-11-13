import { Link } from 'react-router'
import { RECURSOS } from '../constants/recursos.js'
import Icone from './Icone.jsx'
import ResourceList from './ResourceList.jsx'

// Linha de um ponto de apoio na lista (RF02). A linha inteira leva ao detalhe.
export default function SupportPointCard({ id, nome, endereco, distancia, horario, aberto, aConfirmar, recursos }) {
  const iconePrincipal = recursos[0] ? RECURSOS[recursos[0]].icone : 'mapa'
  return (
    <article className="relative group flex gap-4 px-4 py-4 md:px-5 rounded-2xl hover:bg-white/70 transition-colors">
      <span className="grid place-items-center shrink-0 w-12 h-12 rounded-2xl bg-floresta text-creme">
        <Icone nome={iconePrincipal} className="w-5 h-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold text-lg leading-snug">
            <Link to={`/pontos/${id}`} className="rounded group-hover:underline underline-offset-4 after:absolute after:inset-0">
              {nome}
            </Link>
          </h3>
          {distancia && <span className="shrink-0 font-semibold tabular-nums">{distancia}</span>}
        </div>
        <p className="text-tinta/70">{endereco}</p>
        <p className="mt-1.5 text-sm flex flex-wrap items-center gap-1.5">
          <Icone nome="relogio" className="w-4 h-4 text-tinta/55" />
          {aberto === true && <strong className="text-green-800">Aberto agora</strong>}
          {aberto === false && <strong className="text-red-800">Fechado agora</strong>}
          {aberto !== null && <span aria-hidden="true">·</span>}
          {horario}
        </p>
        {aConfirmar && <p className="mt-1 text-sm font-semibold text-amber-900">Pode estar fechado. Estamos conferindo.</p>}
        <div className="mt-2.5">
          <ResourceList recursos={recursos} />
        </div>
      </div>
    </article>
  )
}
