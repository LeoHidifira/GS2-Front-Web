// Cliente HTTP base. Todas as requisições do app passam por aqui.
const TEMPO_LIMITE_MS = 12000

export class ErroDeApi extends Error {
  constructor(mensagem, { status = null, semConexao = false } = {}) {
    super(mensagem)
    this.name = 'ErroDeApi'
    this.status = status
    this.semConexao = semConexao
  }
}

export async function requisitar(url, { metodo = 'GET', corpo, ...opcoes } = {}) {
  const controle = new AbortController()
  const tempo = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS)

  let resposta
  try {
    resposta = await fetch(url, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
      ...opcoes,
    })
  } catch {
    throw new ErroDeApi('Sem conexão com o servidor.', { semConexao: true })
  } finally {
    clearTimeout(tempo)
  }

  if (!resposta.ok) {
    throw new ErroDeApi(`O servidor respondeu com erro ${resposta.status}.`, { status: resposta.status })
  }

  if (resposta.status === 204) return null
  const texto = await resposta.text()
  return texto ? JSON.parse(texto) : null
}
