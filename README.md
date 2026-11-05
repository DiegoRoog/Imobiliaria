# Imobiliária Luxury

Landing page de portfólio que apresenta a Imobiliária Luxury. As imagens são ilustrativas e representam o padrão visual da marca.

[Abrir a Imobiliária Luxury no GitHub Pages](https://diegoroog.github.io/Imobiliaria/)

O projeto usa Next.js com App Router, React, TypeScript, CSS e Canvas 2D. O hero alterna entre Dia e Noite, com uma máscara que acompanha o cursor. A visita tem três sequências com 271 frames WebP e textos que acompanham a rolagem nos dois sentidos. A página inclui quatro cards expansíveis, um modo de leitura sem animações e botões para catálogo e atendimento.

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

`npm start` serve o build de produção na porta 3000.

## Estrutura

- `src/app`: página, metadados, tipografia e estilos responsivos.
- `src/components`: Hero, ScrollSequence, Values, Contact e MotionPreference.
- `src/lib/story.ts`: manifestos compactados para o cliente, ritmo e marcadores de narrativa.
- `src/lib/frame-cache.ts`: fila de carregamento e cache compartilhado de ImageBitmap.
- `src/lib/config.ts`: destinos de catálogo e contato.
- `src/lib/motion.ts`: preferência do sistema e modo de leitura.
- `public/assets`: imagens WebP e três manifestos completos.

Os destinos de catálogo e contato ficam em `src/lib/config.ts`. Enquanto estiverem definidos como `null`, os botões exibem um aviso.

## Publicação

O workflow `.github/workflows/pages.yml` roda em pushes para `main` e pode ser acionado manualmente. Ele instala as dependências do lockfile, exporta o site em `out/` e publica o artefato no ambiente `github-pages`.

Para gerar localmente a mesma exportação usada no Pages, execute em PowerShell.

```powershell
$env:GITHUB_PAGES = 'true'
$env:NEXT_PUBLIC_BASE_PATH = '/Imobiliaria'
npm run build
Remove-Item Env:GITHUB_PAGES, Env:NEXT_PUBLIC_BASE_PATH
```

Sirva `out/` sob o prefixo `/Imobiliaria/` para testar os caminhos da versão publicada.
