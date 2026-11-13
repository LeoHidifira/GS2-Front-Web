// Ícones de traço em SVG. São decorativos: o texto ao lado sempre explica o que significam.
const caminhos = {
  inicio: 'M3.5 11 12 4l8.5 7M6 9.5V19a1 1 0 0 0 1 1h3.5v-5h3v5H17a1 1 0 0 0 1-1V9.5',
  mapa: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  alerta: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15l1.5-2ZM10 20.5a2 2 0 0 0 4 0',
  bairros: 'M4 20V9l5-3 5 3v11M14 20v-7l6-3v10M2 20h20M7 12h4M7 16h4',
  telefone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  voltar: 'M15 5l-7 7 7 7',
  abrir: 'M9 5l7 7-7 7',
  rota: 'M5 12h14M13 6l6 6-6 6',
  agua: 'M12 3.5s-6 6.6-6 11a6 6 0 0 0 12 0c0-4.4-6-11-6-11Z',
  sombra: 'M12 21v-4M12 3 5.5 13h3L6 17h12l-2.5-4h3L12 3Z',
  banheiro: 'M7 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM5 9h4v6H8v5H6v-5H5V9ZM15 9h4l1.5 6H18v5h-2v-5h-2.5L15 9ZM12 3v18',
  relogio: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  grafico: 'M5 20V12M10 20V7M15 20v-5M20 20V4',
  calendario: 'M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7ZM4 10h16M8 3v4M16 3v4',
  folha: 'M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19c3-4 6-6 9-8',
  termometro: 'M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0ZM12 10v7',
  sol: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4',
  localizacao: 'M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM12 2v3M12 19v3M2 12h3M19 12h3M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  mais: 'M12 5v14M5 12h14',
  painel: 'M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z',
  regioes: 'M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4ZM9 4v13.5M15 6.5V20',
  letra: 'M4 19 9 5l5 14M5.8 14h6.4M15 19l3-8 3 8M15.8 17h4.4',
}

export default function Icone({ nome, className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={caminhos[nome]} />
    </svg>
  )
}
