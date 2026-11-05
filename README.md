# Imobiliária Luxury

Landing page conceitual local: hero Dia/Noite, visita cinematográfica por rolagem, quatro cards expansíveis e encerramento na piscina.

## Executar

Requer Node.js 20.9 ou superior. Neste projeto foi usado Node.js 24.21.0.

```powershell
npm ci
npm run dev
```

Abra http://127.0.0.1:3000.

```powershell
npm run typecheck
npm run lint
npm run build
npm start
```

`npm start` serve o build de produção; encerre o servidor de desenvolvimento antes de usar a mesma porta.

## Estrutura

- `src/app`: página, metadados, tipografia e estilos responsivos.
- `src/components`: Hero, ScrollSequence, Values, Contact e MotionPreference.
- `src/lib/story.ts`: manifestos compactados para o cliente, ritmo e marcadores de narrativa.
- `src/lib/frame-cache.ts`: fila de carregamento e cache compartilhado de ImageBitmap.
- `src/lib/config.ts`: destinos de contato e redes sociais.
- `src/lib/motion.ts`: preferência do sistema e modo de leitura.
- `public/assets`: imagens WebP e três manifestos completos.

Os destinos de contato são `null` por padrão. Os botões explicam que se trata de uma demonstração, sem coletar dados. Configure URLs reais apenas em `src/lib/config.ts`.
