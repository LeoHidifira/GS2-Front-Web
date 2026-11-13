// Tabela reutilizável do painel. Em telas pequenas, rola na horizontal dentro do próprio quadro.
export default function DataTable({ legenda, colunas, linhas, acoes }) {
  return (
    <div className="vidro shadow-suave rounded-[1.75rem] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[0.95rem]">
          <caption className="sr-only">{legenda}</caption>
          <thead>
            <tr className="bg-nevoa/70">
              {colunas.map((coluna) => (
                <th key={coluna.chave} scope="col" className="px-5 py-3 sobrescrito text-tinta/65 whitespace-nowrap">
                  {coluna.titulo}
                </th>
              ))}
              {acoes && (
                <th scope="col" className="px-5 py-3 text-right">
                  <span className="sr-only">Ações</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-tinta/[0.07]">
            {linhas.map((linha) => (
              <tr key={linha.id} className="align-middle hover:bg-white/60 transition-colors">
                {colunas.map((coluna, i) => (
                  <td key={coluna.chave} className={`px-5 py-4 ${i === 0 ? 'font-semibold' : ''}`}>
                    {coluna.render ? coluna.render(linha) : linha[coluna.chave]}
                  </td>
                ))}
                {acoes && (
                  <td className="px-5 py-4">
                    <div className="flex gap-2 justify-end">{acoes(linha)}</div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
