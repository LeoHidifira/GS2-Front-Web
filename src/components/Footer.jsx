import { Link } from 'react-router'
import { SLOGAN, TELEFONE_SAMU } from '../constants/textos.js'

// Rodapé com o slogan, a fonte dos dados e o telefone do SAMU
export default function Footer() {
  return (
    <footer className="border-t border-marinho/15 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-6 text-sm text-marinho/75 flex flex-col md:flex-row md:justify-between gap-2">
        <p>
          <span className="font-semibold text-marinho">Solara</span> · {SLOGAN}
        </p>
        <p>
          Emergência: <a href={`tel:${TELEFONE_SAMU}`} className="font-semibold text-marinho underline underline-offset-2">SAMU {TELEFONE_SAMU}</a>
          {' · '}Clima: Open-Meteo{' · '}
          <Link to="/painel" className="underline underline-offset-2">
            Administração
          </Link>
        </p>
      </div>
    </footer>
  )
}
