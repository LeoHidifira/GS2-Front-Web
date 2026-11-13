// Ícones simples em SVG. São decorativos: o texto ao lado sempre explica o que significam.
const caminhos = {
  inicio: 'M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5',
  mapa: 'M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  alerta: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15l1.5-2ZM10 20.5a2 2 0 0 0 4 0',
  bairros: 'M4 20V9l5-3 5 3v11M14 20v-7l6-3v10M2 20h20M7 12h4M7 16h4',
  telefone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z',
  voltar: 'M15 5l-7 7 7 7',
  rota: 'M5 12h14M13 6l6 6-6 6',
}

export default function Icone({ nome, className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
