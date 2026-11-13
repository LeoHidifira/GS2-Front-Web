import Button from './Button.jsx'

// Mensagem de erro com opção de tentar de novo
export default function ErrorMessage({ mensagem, onTentarDeNovo }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-800/25 bg-white/80 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
      <p className="font-semibold text-red-900">{mensagem}</p>
      {onTentarDeNovo && (
        <Button variante="secundario" tamanho="pequeno" onClick={onTentarDeNovo}>
          Tentar de novo
        </Button>
      )}
    </div>
  )
}
