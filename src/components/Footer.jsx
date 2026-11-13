import { Link } from 'react-router'
import { SLOGAN, TELEFONE_SAMU } from '../constants/textos.js'

// Rodapé com o slogan, a fonte dos dados e o telefone do SAMU
export default function Footer() {
  return (
    <footer className="mt-14 px-3 md:px-4 pb-28 md:pb-6">
      <div className="max-w-6xl mx-auto rounded-[2rem] bg-floresta-escuro text-creme/80 px-6 py-6 md:px-8 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p>
          <span className="font-titulo text-lg text-creme">Solara</span>
          <span className="mx-2" aria-hidden="true">·</span>
          {SLOGAN}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a href={`tel:${TELEFONE_SAMU}`} className="font-semibold text-creme underline underline-offset-4 decoration-creme/40">
            Emergência: SAMU {TELEFONE_SAMU}
          </a>
          <span>Clima: Open-Meteo</span>
          <Link to="/painel" className="underline underline-offset-4 decoration-creme/40 hover:text-creme">
            Administração
          </Link>
        </p>
      </div>
    </footer>
  )
}
