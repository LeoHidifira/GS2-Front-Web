import Button from './Button.jsx'

// Mensagem de erro com opção de tentar de novo
export default function ErrorMessage({ mensagem, onTentarDeNovo }) {
  return (
    <div role="alert" className="bg-risco-extremo/50 border border-red-900/20 rounded-2xl px-5 py-4">
      <p className="font-semibold">{mensagem}</p>
      {onTentarDeNovo && (
        <Button variante="secundario" tamanho="pequeno" className="mt-3" onClick={onTentarDeNovo}>
          Tentar de novo
        </Button>
      )}
    </div>
  )
}
