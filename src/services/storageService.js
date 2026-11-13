// Acesso ao localStorage. Falhas (modo privado, armazenamento cheio) nunca quebram o app.
const PREFIXO = 'solara:'

export function ler(chave, padrao = null) {
  try {
    const valor = localStorage.getItem(PREFIXO + chave)
    return valor === null ? padrao : JSON.parse(valor)
  } catch {
    return padrao
  }
}

export function salvar(chave, valor) {
  try {
    localStorage.setItem(PREFIXO + chave, JSON.stringify(valor))
  } catch {
    // sem armazenamento disponível: o app segue funcionando sem salvar
  }
}

export function remover(chave) {
  try {
    localStorage.removeItem(PREFIXO + chave)
  } catch {
    // idem
  }
}
