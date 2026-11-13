import { Link } from 'react-router'

const variantes = {
  primario: 'bg-marinho text-creme hover:bg-black',
  destaque: 'bg-sol-escuro text-white hover:bg-[#8a3814]',
  secundario: 'bg-transparent text-marinho border border-marinho/40 hover:border-marinho hover:bg-white',
  perigo: 'bg-red-800 text-white hover:bg-red-900',
  texto: 'text-marinho underline underline-offset-4 decoration-marinho/40 hover:decoration-marinho',
}

const tamanhos = {
  pequeno: 'px-3 py-1.5 text-sm',
  normal: 'px-4 py-2.5',
  grande: 'px-5 py-4 text-lg',
}

// Botão reutilizável. Com "para" vira link interno; com "href", link externo.
export default function Button({
  children,
  variante = 'primario',
  tamanho = 'normal',
  largura = false,
  para,
  href,
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex items-center gap-2 rounded-md font-semibold transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variante === 'texto' ? 'px-0 py-1' : tamanhos[tamanho],
    largura ? 'w-full justify-between' : 'justify-center',
    variantes[variante],
    className,
  ].join(' ')

  if (para) {
    return (
      <Link to={para} className={classes} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
