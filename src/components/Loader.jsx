// Indicador de carregamento acessível
export default function Loader({ texto = 'Carregando...' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-marinho">
      <span className="w-6 h-6 rounded-full border-4 border-areia border-t-sol animate-spin" aria-hidden="true" />
      <span>{texto}</span>
    </div>
  )
}
