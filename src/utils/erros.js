// Converte erros técnicos em mensagens curtas, no tom de voz da Solara
export function mensagemDeErro(erro, acao) {
  if (erro?.semConexao) return `Sem internet agora. Não deu para ${acao}.`
  if (erro?.message?.includes('VITE_API_URL')) return erro.message
  if (erro?.status === 404) return `Não encontramos esse registro. Não deu para ${acao}.`
  return `Não deu para ${acao}. Tente de novo em instantes.`
}
