import { NavLink } from 'react-router'
import { TELEFONE_SAMU } from '../constants/textos.js'
import Icone from './Icone.jsx'

const classeItem = ({ isActive }) =>
  `flex flex-col items-center gap-1 py-2 text-[0.7rem] font-medium ${isActive ? 'text-floresta-escuro font-semibold' : 'text-tinta/65'}`

// Navegação inferior flutuante, só no celular. O link de destaque vira o botão redondo do meio.
export default function BottomNav({ links }) {
  const destaque = links.find((l) => l.destaque)
  const comuns = links.filter((l) => !l.destaque)
  const esquerda = comuns.slice(0, 2)
  const direita = comuns.slice(2)

  const item = (link) => (
    <li key={link.para}>
      <NavLink to={link.para} end={link.para === '/'} className={classeItem}>
        <Icone nome={link.icone} className="w-6 h-6" />
        {link.rotulo}
      </NavLink>
    </li>
  )

  return (
    <nav
      aria-label="Navegação inferior"
      className="md:hidden fixed bottom-0 inset-x-0 z-20 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]"
    >
      <ul className="vidro shadow-suave rounded-[1.75rem] grid grid-cols-5 items-center px-1">
        {esquerda.map(item)}
        {destaque && (
          <li className="flex justify-center">
            <NavLink
              to={destaque.para}
              className={({ isActive }) =>
                `-mt-7 flex flex-col items-center gap-1 text-[0.7rem] font-semibold ${isActive ? 'text-floresta-escuro' : 'text-tinta/80'}`
              }
            >
              <span className="grid place-items-center w-14 h-14 rounded-full bg-floresta text-creme shadow-suave ring-4 ring-creme">
                <Icone nome={destaque.icone} className="w-6 h-6" />
              </span>
              {destaque.rotulo}
            </NavLink>
          </li>
        )}
        {direita.map(item)}
        <li>
          <a href={`tel:${TELEFONE_SAMU}`} className="flex flex-col items-center gap-1 py-2 text-[0.7rem] font-medium text-tinta/65">
            <Icone nome="telefone" className="w-6 h-6" />
            SAMU {TELEFONE_SAMU}
          </a>
        </li>
      </ul>
    </nav>
  )
}
