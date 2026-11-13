import { Link } from 'react-router'
import Icone from './Icone.jsx'
import ResourceList from './ResourceList.jsx'

// Linha de um ponto de apoio na lista (RF02). A linha inteira leva ao detalhe.
export default function SupportPointCard({ id, nome, endereco, distancia, horario, aberto, aConfirmar, recursos }) {
  return (
    <article className="relative py-4 group">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug">
          <Link
            to={`/pontos/${id}`}
            className="rounded group-hover:underline underline-offset-4 after:absolute after:inset-0"
          >
            {nome}
          </Link>
        </h3>
        {distancia && <span className="shrink-0 font-semibold tabular-nums">{distancia}</span>}
      </div>
      <p className="text-marinho/80">{endereco}</p>
      <p className="mt-1 text-sm flex items-center gap-1.5">
        <Icone nome="relogio" className="w-4 h-4 text-marinho/60" />
        {aberto === true && <strong className="text-green-800">Aberto agora</strong>}
        {aberto === false && <strong className="text-red-800">Fechado agora</strong>}
        {aberto !== null && <span aria-hidden="true">·</span>}
        {horario}
      </p>
      {aConfirmar && (
        <p className="mt-1 text-sm font-semibold text-amber-900">Pode estar fechado. Estamos conferindo.</p>
      )}
      <div className="mt-2">
        <ResourceList recursos={recursos} />
      </div>
    </article>
  )
}
