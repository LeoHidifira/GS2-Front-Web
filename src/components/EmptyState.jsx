import Icone from './Icone.jsx'

// Mensagem para listas vazias
export default function EmptyState({ titulo, descricao, icone = 'folha', children }) {
  return (
    <div className="vidro rounded-[1.75rem] px-6 py-8 flex flex-col items-start gap-1">
      <span className="grid place-items-center w-11 h-11 rounded-2xl bg-nevoa text-musgo mb-2">
        <Icone nome={icone} className="w-5 h-5" />
      </span>
      <p className="font-semibold text-lg">{titulo}</p>
      {descricao && <p className="text-tinta/75">{descricao}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
