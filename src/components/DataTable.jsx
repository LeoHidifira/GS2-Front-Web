// Tabela reutilizável do painel. Em telas pequenas, rola na horizontal dentro do próprio quadro.
export default function DataTable({ legenda, colunas, linhas, acoes }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-areia bg-white">
      <table className="w-full text-left">
        <caption className="sr-only">{legenda}</caption>
        <thead className="bg-areia">
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna.chave} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                {coluna.titulo}
              </th>
            ))}
            {acoes && (
              <th scope="col" className="px-4 py-3 font-semibold">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {linhas.map((linha) => (
            <tr key={linha.id} className="border-t border-areia align-top">
              {colunas.map((coluna) => (
                <td key={coluna.chave} className="px-4 py-3">
                  {coluna.render ? coluna.render(linha) : linha[coluna.chave]}
                </td>
              ))}
              {acoes && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">{acoes(linha)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
