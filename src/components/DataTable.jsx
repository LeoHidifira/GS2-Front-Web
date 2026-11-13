// Tabela reutilizável do painel. Em telas pequenas, rola na horizontal dentro do próprio quadro.
export default function DataTable({ legenda, colunas, linhas, acoes }) {
  return (
    <div className="overflow-x-auto border border-marinho/15 bg-white">
      <table className="w-full text-left text-[0.95rem]">
        <caption className="sr-only">{legenda}</caption>
        <thead className="border-b-2 border-marinho/20">
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna.chave} scope="col" className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap">
                {coluna.titulo}
              </th>
            ))}
            {acoes && (
              <th scope="col" className="px-4 py-2.5 text-sm font-semibold text-right">
                <span className="sr-only">Ações</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.id} className="border-t border-marinho/10 align-top hover:bg-creme">
              {colunas.map((coluna) => (
                <td key={coluna.chave} className="px-4 py-3">
                  {coluna.render ? coluna.render(linha) : linha[coluna.chave]}
                </td>
              ))}
              {acoes && (
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">{acoes(linha)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
