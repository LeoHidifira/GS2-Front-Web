// Regras e conversões das regiões monitoradas

// Garante tipos corretos, mesmo que a API devolva números como texto
export function normalizarRegiao(regiao) {
  return {
    ...regiao,
    id: String(regiao.id),
    latitude: Number(regiao.latitude),
    longitude: Number(regiao.longitude),
    ativo: regiao.ativo === true || regiao.ativo === 'true',
  }
}

// Limites aproximados da Grande São Paulo, para pegar coordenadas digitadas erradas
const LIMITES_SP = { latMin: -24.1, latMax: -23.3, lonMin: -47.1, lonMax: -46.3 }

export function validarRegiao(valores) {
  const erros = {}
  const latitude = Number(String(valores.latitude).replace(',', '.'))
  const longitude = Number(String(valores.longitude).replace(',', '.'))

  if (!valores.nome?.trim()) erros.nome = 'Falta o nome da região.'
  if (!valores.bairro?.trim()) erros.bairro = 'Falta o bairro.'

  if (String(valores.latitude).trim() === '' || !Number.isFinite(latitude)) {
    erros.latitude = 'Falta a latitude. Exemplo: -23.6719'
  } else if (latitude < LIMITES_SP.latMin || latitude > LIMITES_SP.latMax) {
    erros.latitude = 'Essa latitude fica fora de São Paulo.'
  }

  if (String(valores.longitude).trim() === '' || !Number.isFinite(longitude)) {
    erros.longitude = 'Falta a longitude. Exemplo: -46.7794'
  } else if (longitude < LIMITES_SP.lonMin || longitude > LIMITES_SP.lonMax) {
    erros.longitude = 'Essa longitude fica fora de São Paulo.'
  }

  return erros
}

// Prepara os valores do formulário para enviar à API
export function prepararRegiao(valores) {
  return {
    nome: valores.nome.trim(),
    bairro: valores.bairro.trim(),
    latitude: Number(String(valores.latitude).replace(',', '.')),
    longitude: Number(String(valores.longitude).replace(',', '.')),
    ativo: Boolean(valores.ativo),
  }
}

export function ordenarPorNome(lista) {
  return [...lista].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

// Bairro mostrado na tela inicial: o escolhido pela pessoa, senão o piloto (Capão Redondo), senão o primeiro
export function escolherRegiaoAtual(regioes, idPreferido) {
  if (regioes.length === 0) return null
  return (
    regioes.find((r) => r.id === idPreferido) ??
    regioes.find((r) => r.nome.toLowerCase().includes('capão redondo')) ??
    regioes[0]
  )
}
