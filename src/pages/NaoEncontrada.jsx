import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

export default function NaoEncontrada() {
  useTituloDaPagina('Página não encontrada')
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <EmptyState titulo="Esse endereço não existe." descricao="Volte ao início para ver o calor no seu bairro.">
        <Button para="/">Ir para o início</Button>
      </EmptyState>
    </div>
  )
}
