// Mensagem para listas vazias
export default function EmptyState({ titulo, descricao, children }) {
  return (
    <div className="text-center bg-areia rounded-2xl px-6 py-10">
      <p className="font-titulo text-lg font-semibold">{titulo}</p>
      {descricao && <p className="mt-2 text-marinho/80">{descricao}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
