import { Link } from 'react-router'

const variantes = {
  primario: 'bg-marinho text-creme hover:bg-marinho/90',
  destaque: 'bg-sol-escuro text-white hover:bg-sol-escuro/90',
  secundario: 'bg-areia text-marinho hover:bg-areia/70 border border-marinho/15',
  perigo: 'bg-red-800 text-white hover:bg-red-900',
  texto: 'text-marinho underline underline-offset-4 hover:bg-areia',
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
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    tamanhos[tamanho],
    largura ? 'w-full' : '',
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
