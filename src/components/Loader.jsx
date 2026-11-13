// Indicador de carregamento acessível
export default function Loader({ texto = 'Carregando...' }) {
  return (
    <div role="status" className="flex items-center gap-3 py-8 text-marinho/80">
      <span className="w-4 h-4 rounded-full border-2 border-marinho/20 border-t-marinho animate-spin" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  )
}
