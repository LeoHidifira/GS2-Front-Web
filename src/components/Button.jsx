import { Link } from 'react-router'
import Icone from './Icone.jsx'

const variantes = {
  primario: 'bg-floresta text-creme hover:bg-floresta-escuro shadow-suave',
  destaque: 'bg-terra text-white hover:bg-[#6f4730] shadow-suave',
  secundario: 'bg-white/70 text-tinta border border-tinta/15 hover:bg-white hover:border-tinta/30',
  claro: 'bg-creme text-floresta-escuro hover:bg-white',
  perigo: 'bg-red-800 text-white hover:bg-red-900',
  texto: 'text-tinta underline underline-offset-4 decoration-tinta/30 hover:decoration-tinta',
}

const tamanhos = {
  pequeno: 'px-3.5 py-1.5 text-sm',
  normal: 'px-5 py-2.5',
  grande: 'px-6 py-4 text-lg',
}

// Bolinha com a seta, no fim dos botões de ação principal
const corDaSeta = {
  primario: 'bg-creme text-floresta-escuro',
  destaque: 'bg-white text-terra',
  claro: 'bg-floresta text-creme',
}

// Botão reutilizável em formato de pílula. Com "para" vira link interno; com "href", link externo.
// Com "seta", ganha a bolinha com seta no fim, como chamada para ação.
export default function Button({
  children,
  variante = 'primario',
  tamanho = 'normal',
  largura = false,
  seta = false,
  para,
  href,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center gap-2 rounded-full font-semibold transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variante === 'texto' ? 'px-0 py-1 rounded-sm' : tamanhos[tamanho],
    seta && variante !== 'texto' ? 'pr-1.5' : '',
    largura ? 'w-full justify-between' : 'justify-center',
    variantes[variante],
    className,
  ].join(' ')

  const conteudo = (
    <>
      {children}
      {seta && (
        <span
          className={`ml-2 grid place-items-center rounded-full ${tamanho === 'grande' ? 'w-11 h-11' : 'w-8 h-8'} ${
            corDaSeta[variante] ?? 'bg-floresta text-creme'
          }`}
        >
          <Icone nome="rota" className="w-4 h-4" />
        </span>
      )}
    </>
  )

  if (para) {
    return (
      <Link to={para} className={classes} {...props}>
        {conteudo}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {conteudo}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {conteudo}
    </button>
  )
}
