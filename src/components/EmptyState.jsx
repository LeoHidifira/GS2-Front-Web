// Mensagem para listas vazias
export default function EmptyState({ titulo, descricao, children }) {
  return (
    <div className="border-t border-b border-marinho/15 py-6">
      <p className="font-semibold text-lg">{titulo}</p>
      {descricao && <p className="mt-1 text-marinho/80">{descricao}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
