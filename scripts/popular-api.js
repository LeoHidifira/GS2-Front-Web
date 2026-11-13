// Envia os dados de exemplo (dados-exemplo.json) para a API de CRUD configurada no .env.
// Uso: npm run popular-api
// Rode uma vez só, logo depois de criar os recursos "regioes" e "pontos" na MockAPI.
import { readFileSync, existsSync } from 'node:fs'

function lerUrlDaApi() {
  if (process.env.VITE_API_URL) return process.env.VITE_API_URL
  if (!existsSync('.env')) return null
  const linha = readFileSync('.env', 'utf-8')
    .split(/\r?\n/)
    .find((l) => l.trim().startsWith('VITE_API_URL='))
  return linha ? linha.split('=').slice(1).join('=').trim() : null
}

async function enviar(url, dados) {
  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) throw new Error(`POST ${url} respondeu ${resposta.status}`)
  return resposta.json()
}

const base = lerUrlDaApi()?.replace(/\/+$/, '')
if (!base) {
  console.error('Defina VITE_API_URL no arquivo .env antes de rodar este script.')
  process.exit(1)
}

const { regioes, pontos } = JSON.parse(readFileSync('dados-exemplo.json', 'utf-8'))
const novosIds = new Map()

console.log(`Enviando dados para ${base}`)
for (const { id, ...regiao } of regioes) {
  const criada = await enviar(`${base}/regioes`, regiao)
  novosIds.set(id, String(criada.id))
  console.log(`  região ${regiao.nome} -> id ${criada.id}`)
}
for (const { id, ...ponto } of pontos) {
  const criado = await enviar(`${base}/pontos`, { ...ponto, regiaoId: novosIds.get(ponto.regiaoId) })
  console.log(`  ponto ${ponto.nome} -> id ${criado.id}`)
}
console.log('Pronto!')
