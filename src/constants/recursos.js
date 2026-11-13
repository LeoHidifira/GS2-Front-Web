// Recursos oferecidos pelos pontos de apoio. O ícone (nome em Icone.jsx) é decorativo: o nome sempre aparece escrito.
export const RECURSOS = {
  agua: { id: 'agua', nome: 'Água', icone: 'agua' },
  sombra: { id: 'sombra', nome: 'Sombra', icone: 'sombra' },
  banheiro: { id: 'banheiro', nome: 'Banheiro', icone: 'banheiro' },
}

export const LISTA_RECURSOS = Object.values(RECURSOS)

export const SITUACOES = {
  rascunho: { id: 'rascunho', nome: 'Rascunho' },
  publicado: { id: 'publicado', nome: 'Publicado' },
  a_confirmar: { id: 'a_confirmar', nome: 'A confirmar' },
}

// Filtros de distância da tela do mapa (RF03)
export const OPCOES_DISTANCIA = [
  { valor: null, rotulo: 'Qualquer distância' },
  { valor: 1, rotulo: 'Até 1 km' },
  { valor: 3, rotulo: 'Até 3 km' },
  { valor: 5, rotulo: 'Até 5 km' },
]
