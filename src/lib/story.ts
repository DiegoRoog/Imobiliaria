import part1 from "../../public/assets/parte-1.json";
import part2 from "../../public/assets/parte-2.json";
import part3 from "../../public/assets/parte-3.json";
import { assetUrl } from "./asset-url";

export type Cue = {
  start: number;
  end: number;
  title: string;
  text: string;
  detail?: string;
  side?: "left" | "right";
  eyebrow?: string;
};
export type Sequence = {
  id: string;
  chapter: string;
  label: string;
  frames: string[];
  width: number;
  height: number;
  scrollVh: number;
  mobileVh: number;
  poster: number;
  cues: Cue[];
  final?: boolean;
};
const compact = (manifest: typeof part1) => ({
  frames: manifest.frames.map((frame) => assetUrl(frame.src)),
  width: manifest.width,
  height: manifest.height,
});

const arrivalChapters = [
  [
    "BOAS ESCOLHAS",
    "Grandes conquistas começam com boas escolhas.",
    "Encontrar o imóvel certo é uma decisão importante. E toda grande decisão merece atenção.",
    "ESCUTA • CLAREZA • PROXIMIDADE",
  ],
  [
    "CONHEÇA A IMOBILIÁRIA LUXURY",
    "Mais do que imóveis, novas possibilidades.",
    "Na Imobiliária Luxury, acreditamos que cada busca tem uma história, uma prioridade e um novo começo.",
    "CADA BUSCA TEM SUA HISTÓRIA",
  ],
  [
    "SEU PRÓXIMO ENDEREÇO",
    "Seu próximo endereço merece atenção aos detalhes.",
    "Descubra oportunidades e explore possibilidades que combinam com o seu estilo de vida.",
    "LOCALIZAÇÃO • ESPAÇO • ESTILO DE VIDA",
  ],
  [
    "CONVERSAS COM CLAREZA",
    "Confiança para dar o próximo passo.",
    "Uma boa experiência imobiliária começa com informações claras e uma conversa que entende suas necessidades.",
    "SUAS PERGUNTAS FAZEM PARTE DA ESCOLHA",
  ],
  [
    "ATENDIMENTO PRÓXIMO",
    "Uma imobiliária próxima das suas conquistas.",
    "Estamos aqui para transformar dúvidas em caminhos e aproximar você das opções que procura.",
    "COMECE PELO QUE IMPORTA PARA VOCÊ",
  ],
  [
    "A BUSCA É SUA",
    "Cada pessoa procura algo diferente.",
    "Mais espaço, uma nova localização, tranquilidade ou simplesmente o lugar ideal para começar outra etapa.",
    "DEFINA AS SUAS PRIORIDADES",
  ],
  [
    "CATÁLOGO DE IMÓVEIS",
    "Explore. Compare. Descubra.",
    "Conheça nosso catálogo de imóveis e encontre oportunidades para os seus próximos planos.",
    "CONHEÇA AS OPÇÕES ANTES DE DECIDIR",
  ],
  [
    "PRÓXIMOS PASSOS",
    "A sua próxima conquista pode começar aqui.",
    "Continue conhecendo a Imobiliária Luxury.",
    "UMA NOVA ETAPA COMEÇA COM UMA ESCOLHA",
  ],
];

const kitchenChapters = [
  [
    "RELACIONAMENTO",
    "Confiança é o primeiro passo.",
    "Escolher um imóvel fica mais simples quando você tem espaço para perguntar, explorar e decidir com tranquilidade.",
    "CONVERSE NO SEU RITMO",
  ],
  [
    "ATENÇÃO À SUA BUSCA",
    "Uma escolha importante merece atenção.",
    "Entender suas prioridades é essencial para encontrar oportunidades alinhadas aos seus planos.",
    "SEUS OBJETIVOS ORIENTAM A BUSCA",
  ],
  [
    "SEU ESTILO DE VIDA",
    "Seu estilo de vida faz parte da escolha.",
    "Cada detalhe pode fazer diferença. O importante é descobrir o que realmente importa para você.",
    "PENSE EM COMO VOCÊ QUER VIVER",
  ],
  [
    "CATÁLOGO DE IMÓVEIS",
    "Conheça as possibilidades.",
    "Explore nosso catálogo e descubra opções para diferentes necessidades e objetivos.",
    "EXPLORE • COMPARE • ESCOLHA",
  ],
  [
    "DECIDA COM CLAREZA",
    "Mais clareza. Mais confiança. Novos caminhos.",
    "Uma conversa pode ajudar você a organizar suas prioridades e dar o próximo passo.",
    "ESPAÇO PARA PERGUNTAR E DECIDIR",
  ],
  [
    "VAMOS CONVERSAR",
    "Estamos prontos para ouvir seus planos.",
    "Entre em contato com a Imobiliária Luxury e comece a descobrir suas possibilidades.",
    "ATENDIMENTO PRÓXIMO À SUA BUSCA",
  ],
];

const poolChapters = [
  [
    "NOVOS PLANOS",
    "Toda busca começa com um plano.",
    "Mudar de bairro, ganhar espaço ou começar outra etapa. Conte à Imobiliária Luxury o que você procura.",
    "FALE SOBRE SUAS PRIORIDADES",
  ],
  [
    "CONHEÇA SUAS OPÇÕES",
    "Olhe para além da primeira impressão.",
    "Compare o que cada opção oferece e pense em como ela se encaixa na sua rotina.",
    "UM IMÓVEL PARA O SEU ESTILO DE VIDA",
  ],
  [
    "UMA DECISÃO NO SEU TEMPO",
    "Escolha com tranquilidade.",
    "Reúna suas perguntas e compartilhe o que é indispensável. Uma conversa pode dar mais clareza ao próximo passo.",
    "ESPAÇO PARA TIRAR DÚVIDAS",
  ],
  [
    "IMOBILIÁRIA LUXURY",
    "O próximo passo é seu.",
    "Conheça nossas oportunidades ou entre em contato para conversar sobre seus planos.",
    "IMÓVEIS E ATENDIMENTO",
  ],
];

function chapters(content: string[][], ends: number[]): Cue[] {
  return content.map(([eyebrow, title, text, detail], index) => ({
    start: ends[index - 1] ?? 0,
    end: ends[index],
    eyebrow,
    title,
    text,
    detail,
  }));
}

export const arrival: Sequence = {
  ...compact(part1),
  id: "residencia",
  chapter: "01",
  label: "A imobiliária",
  scrollVh: 1100,
  mobileVh: 850,
  poster: 69,
  cues: chapters(
    arrivalChapters,
    [0.13, 0.29, 0.45, 0.59, 0.73, 0.82, 0.93, 1],
  ),
};

export const kitchen: Sequence = {
  ...compact(part2),
  id: "ambientes",
  chapter: "02",
  label: "Atendimento e confiança",
  scrollVh: 850,
  mobileVh: 700,
  poster: 32,
  cues: chapters(kitchenChapters, [0.16, 0.33, 0.5, 0.67, 0.84, 1]).map(
    (cue, index) => ({ ...cue, side: index % 2 === 0 ? "left" : "right" }),
  ),
};

export const pool: Sequence = {
  ...compact(part3),
  id: "proximo-capitulo",
  chapter: "03",
  label: "O próximo capítulo",
  scrollVh: 650,
  mobileVh: 550,
  poster: 65,
  final: true,
  cues: chapters(poolChapters, [0.14, 0.28, 0.43, 0.57]),
};
