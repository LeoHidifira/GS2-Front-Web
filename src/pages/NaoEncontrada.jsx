import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useTituloDaPagina from '../hooks/useTituloDaPagina.js'

export default function NaoEncontrada() {
  useTituloDaPagina('Página não encontrada')
  return (
    <div className="space-y-6">
      <p className="sobrescrito text-tinta/60">Erro 404</p>
      <h1 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
        Página não <em className="text-terra">encontrada</em>
      </h1>
      <EmptyState titulo="Esse endereço não existe." descricao="Volte ao início para ver o calor no seu bairro." icone="mapa">
        <Button para="/" seta>
          Ir para o início
        </Button>
      </EmptyState>
    </div>
  )
}
