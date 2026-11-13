import Button from './Button.jsx'

// Mensagem de erro com opção de tentar de novo
export default function ErrorMessage({ mensagem, onTentarDeNovo }) {
  return (
    <div role="alert" className="border-l-4 border-red-800 bg-white px-4 py-3">
      <p className="font-semibold">{mensagem}</p>
      {onTentarDeNovo && (
        <Button variante="texto" tamanho="pequeno" className="mt-1" onClick={onTentarDeNovo}>
          Tentar de novo
        </Button>
      )}
    </div>
  )
}
