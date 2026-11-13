// Níveis de risco de calor (RN01). O nome do nível sempre aparece escrito, nunca só a cor.
export const ORDEM_NIVEIS = ['baixo', 'atencao', 'alto', 'extremo']

// Limites da sensação térmica em °C: até 27 Baixo, até 32 Atenção, até 39 Alto, acima disso Extremo
export const LIMITES_SENSACAO = {
  baixo: 27,
  atencao: 32,
  alto: 39,
}

export const NIVEIS = {
  baixo: {
    id: 'baixo',
    rotulo: 'BAIXO',
    nome: 'Baixo',
    classeFundo: 'bg-risco-baixo',
    mensagem: 'Dia tranquilo por aqui. Mesmo assim, leve água.',
    dicas: [
      'Leve uma garrafa de água.',
      'Use protetor solar se for ficar na rua.',
      'Prefira roupas leves e claras.',
    ],
  },
  atencao: {
    id: 'atencao',
    rotulo: 'ATENÇÃO',
    nome: 'Atenção',
    classeFundo: 'bg-risco-atencao',
    mensagem: 'Calor chegando. Beba água antes de sentir sede.',
    dicas: [
      'Beba água a cada 30 minutos.',
      'Use boné ou chapéu na rua.',
      'Faça pausas na sombra quando puder.',
    ],
  },
  alto: {
    id: 'alto',
    rotulo: 'ALTO',
    nome: 'Alto',
    classeFundo: 'bg-risco-alto',
    mensagem: 'Calor alto. Procure sombra e água por perto.',
    dicas: [
      'Evite o sol entre 10h e 16h.',
      'Beba água mesmo sem sede.',
      'Pare na sombra a cada hora de trabalho.',
    ],
  },
  extremo: {
    id: 'extremo',
    rotulo: 'EXTREMO',
    nome: 'Extremo',
    classeFundo: 'bg-risco-extremo',
    mensagem: 'Calor extremo. Fique na sombra e cuide de quem está perto.',
    dicas: [
      'Fique em local fresco e com sombra.',
      'Beba água aos poucos, várias vezes.',
      'Tontura ou enjoo? Ligue 192 (SAMU).',
    ],
  },
}

// Opções de nível mínimo para receber alertas (RF05)
export const NIVEIS_DE_ALERTA = ['alto', 'extremo']
