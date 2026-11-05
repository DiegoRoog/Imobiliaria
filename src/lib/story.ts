import part1 from "../../public/assets/parte-1.json";
import part2 from "../../public/assets/parte-2.json";
import part3 from "../../public/assets/parte-3.json";

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
  frames: manifest.frames.map((frame) => frame.src),
  width: manifest.width,
  height: manifest.height,
});

const arrivalChapters = [
  [
    "UM CONVITE PARA ENTRAR",
    "Alguns lugares mudam a nossa maneira de olhar.",
    "Antes da primeira porta, existe uma sensação. A paisagem se abre, a arquitetura se revela e a ideia de chegar em casa ganha um novo significado.",
    "Paisagem • Arquitetura • Presença",
  ],
  [
    "EM HARMONIA COM O ENTORNO",
    "A natureza faz parte da experiência.",
    "O verde emoldura a residência e acompanha a aproximação. Entre caminhos, jardins e novas perspectivas, cada olhar encontra um motivo para desacelerar.",
    "O tempo ganha outro ritmo",
  ],
  [
    "UMA NOVA PERSPECTIVA",
    "Há beleza no caminho, não apenas na chegada.",
    "A vista aérea dá lugar a uma descoberta mais próxima. Volumes, proporções e a relação com a paisagem começam a revelar a personalidade da residência.",
    "Uma descoberta a cada movimento",
  ],
  [
    "ARQUITETURA QUE PERMANECE",
    "O extraordinário se revela nos detalhes.",
    "A composição da fachada, a simetria e os elementos clássicos criam uma presença marcante. Uma arquitetura que convida a olhar mais uma vez.",
    "Proporção • Textura • Identidade",
  ],
  [
    "A ARTE DE CHEGAR",
    "Imagine voltar para um lugar assim.",
    "Deixar o dia lá fora. Percorrer o caminho até a entrada. Reconhecer, nos pequenos rituais da chegada, a sensação de pertencer a um lugar.",
    "Sua rotina, sob uma nova perspectiva",
  ],
  [
    "O PRIMEIRO PASSO",
    "Toda porta guarda uma nova possibilidade.",
    "A entrada é uma passagem entre o mundo e o seu espaço. O convite para descobrir ambientes, imaginar encontros e dar forma aos próximos planos.",
    "Uma história ainda por escrever",
  ],
  [
    "SEJA BEM-VINDO",
    "Uma nova forma de viver começa por dentro.",
    "O olhar atravessa a entrada e encontra luz, amplitude e uma composição acolhedora. A experiência deixa de ser contemplação e passa a ser presença.",
    "Entre. Permita-se descobrir.",
  ],
  [
    "ESPAÇOS PARA COMPARTILHAR",
    "O conforto também pode ser extraordinário.",
    "Na sala, a arquitetura se aproxima da vida. Lugares para reunir pessoas, prolongar conversas e transformar um dia comum em uma lembrança especial.",
    "Encontros • Convivência • Memórias",
  ],
  [
    "A BELEZA DE FICAR",
    "Um cenário para as histórias que importam.",
    "A escada, os materiais e a luz desenham diferentes perspectivas do interior. Mais do que observar um ambiente, este é o momento de imaginar a vida acontecendo nele.",
    "Detalhes que constroem uma atmosfera",
  ],
  [
    "CONTINUE A DESCOBERTA",
    "O seu lugar é aquele que faz sentido para você.",
    "Uma escolha envolve atmosfera, desejos e a maneira como você quer viver. Continue a visita e descubra os espaços que dão continuidade a essa experiência.",
    "A próxima cena espera por você",
  ],
];
const kitchenChapters = [
  [
    "A ARTE DE ACOLHER",
    "Onde a casa se transforma em encontro.",
    "Há ambientes que naturalmente aproximam as pessoas. A cozinha é um deles: um lugar para preparar, compartilhar e fazer da convivência parte da rotina.",
    "O cotidiano também merece ser especial",
  ],
  [
    "MATERIAIS E SENSAÇÕES",
    "Texturas que convidam a permanecer.",
    "Madeira, pedra e tons quentes compõem a atmosfera deste ambiente. A combinação de superfícies e iluminação cria uma leitura acolhedora do espaço.",
    "Madeira • Pedra • Luz",
  ],
  [
    "OLHE MAIS DE PERTO",
    "O conforto mora na soma dos detalhes.",
    "Os arcos, as luminárias e o desenho da ilha revelam novas camadas a cada movimento. Elementos que dialogam entre si e dão personalidade ao interior.",
    "Uma composição para descobrir com calma",
  ],
  [
    "NO CENTRO DA CONVIVÊNCIA",
    "Algumas conversas começam ao redor da mesa.",
    "Um café sem pressa, uma receita compartilhada, uma refeição que se estende. A casa também se revela nos momentos simples que você escolhe viver.",
    "Pequenos rituais. Grandes lembranças.",
  ],
  [
    "ESPAÇO PARA O SEU RITMO",
    "A sua rotina merece um novo cenário.",
    "Imagine manhãs tranquilas e noites entre pessoas queridas. Um ambiente ganha sentido quando acompanha os seus hábitos e abre espaço para novas possibilidades.",
    "Viver bem tem um significado pessoal",
  ],
  [
    "O PRAZER DE RECEBER",
    "Receber é criar espaço para o outro.",
    "Mais do que preparar uma refeição, é compartilhar tempo e atenção. É transformar a casa em um ponto de encontro e deixar que as melhores histórias aconteçam.",
    "Presença • Cuidado • Conexão",
  ],
  [
    "ESCOLHAS COM SIGNIFICADO",
    "Encontrar o seu lugar começa com um olhar atento.",
    "Observe a luz, os materiais e as sensações que cada espaço desperta. Reconhecer o que faz sentido para você é parte essencial dessa descoberta.",
    "Uma decisão que começa pelos seus desejos",
  ],
  [
    "AINDA HÁ MAIS PARA VIVER",
    "O próximo capítulo está logo adiante.",
    "Depois dos encontros e dos detalhes do interior, a visita segue para um novo momento. Um convite para respirar, desacelerar e imaginar a vida além das paredes.",
    "Continue. A experiência se abre lá fora.",
  ],
];
function chapters(content: string[][], until = 1): Cue[] {
  return content.map(([eyebrow, title, text, detail], index) => ({
    start: (index * until) / content.length,
    end: ((index + 1) * until) / content.length,
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
  label: "O convite",
  scrollVh: 1100,
  mobileVh: 850,
  poster: 69,
  cues: chapters(arrivalChapters),
};
export const kitchen: Sequence = {
  ...compact(part2),
  id: "ambientes",
  chapter: "02",
  label: "A arte de acolher",
  scrollVh: 850,
  mobileVh: 700,
  poster: 32,
  cues: chapters(kitchenChapters),
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
  cues: chapters(
    [
      [
        "UM NOVO HORIZONTE",
        "A vida também acontece do lado de fora.",
        "A passagem se abre para uma nova atmosfera. A luz da noite encontra a água e a visita ganha um ritmo mais tranquilo, feito para apreciar o momento.",
        "Respire. Há tempo para contemplar.",
      ],
      [
        "TEMPO PARA O QUE IMPORTA",
        "O privilégio de simplesmente estar.",
        "Deixar os compromissos em pausa. Compartilhar uma conversa, observar os reflexos e permitir que o tempo seja vivido com mais presença.",
        "Tranquilidade • Encontro • Bem-estar",
      ],
      [
        "OUTRA LUZ, NOVAS SENSAÇÕES",
        "Um mesmo lugar. Infinitas possibilidades.",
        "As galerias iluminadas emolduram a piscina e revelam outra leitura da arquitetura. Um cenário para imaginar noites especiais e momentos que ficam na memória.",
        "A beleza de viver cada instante",
      ],
      [
        "UM CONVITE PARA IMAGINAR",
        "Que histórias você gostaria de viver aqui?",
        "A melhor parte de descobrir um lugar é perceber as possibilidades que ele desperta. Seus planos, suas pessoas e uma nova maneira de aproveitar o tempo.",
        "O próximo passo começa com você",
      ],
    ],
    0.57,
  ),
};
