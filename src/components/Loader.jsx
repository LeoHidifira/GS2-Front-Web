// Indicador de carregamento acessível
export default function Loader({ texto = 'Carregando...' }) {
  return (
    <div role="status" className="flex items-center gap-3 py-8 text-tinta/75">
      <span className="w-5 h-5 rounded-full border-2 border-salvia border-t-floresta animate-spin" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  )
}
