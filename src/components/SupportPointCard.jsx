import { Link } from 'react-router'
import ResourceList from './ResourceList.jsx'

// Cartão de um ponto de apoio na lista do mapa (RF02)
export default function SupportPointCard({ id, nome, endereco, distancia, horario, aberto, aConfirmar, recursos }) {
  return (
    <article className="relative bg-white border border-areia rounded-2xl p-4 hover:border-marinho/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug">
          <Link to={`/pontos/${id}`} className="rounded hover:underline underline-offset-4 after:absolute after:inset-0 after:rounded-2xl">
            {nome}
          </Link>
        </h3>
        {distancia && <span className="shrink-0 font-semibold">{distancia}</span>}
      </div>
      <p className="text-marinho/85">{endereco}</p>
      <p className="mt-1 text-sm">
        {aberto === true && <strong className="text-green-900">Aberto agora</strong>}
        {aberto === false && <strong className="text-red-900">Fechado agora</strong>}
        {aberto !== null && ' · '}
        {horario}
      </p>
      {aConfirmar && (
        <p className="mt-2 text-sm font-semibold bg-risco-atencao rounded-lg px-2 py-1 inline-block">
          A confirmar: pessoas avisaram que pode estar fechado.
        </p>
      )}
      <div className="mt-3">
        <ResourceList recursos={recursos} />
      </div>
    </article>
  )
}
