# Origem dos assets

## Frame — composição geométrica

- Arquivo: [frame-composition.svg](frame-composition.svg).
- Criado em: 27/10/2026, nesta alteração do repositório, com assistência do Codex.
- Processo: SVG escrito diretamente em código, com formas geométricas, sem fotografia de referência, downloads, fontes incorporadas ou recursos externos.
- Conteúdo: disco verde, arco escuro e vaso terracota sobre fundo claro.
- Uso previsto: ilustração do projeto editorial conceitual Frame no portfólio MCode.
- Substitui: `artwork.jpg`, anteriormente atribuída genericamente ao Unsplash e removida da árvore atual. O arquivo antigo pode continuar no histórico Git.
- A criação deste arquivo não define uma licença geral para o repositório nem altera os direitos da identidade visual fornecida.

Ao substituir a arte, atualizar a origem aqui, o texto alternativo e as dimensões em `index.html`, a descrição de Frame e os documentos de planejamento.

## Bara's Hotel

- Arquivo: `baras-hotel.jpg`, captura fornecida pelo usuário e convertida de PNG para JPEG, mantendo os 1851 por 901 pixels.
- Projeto: site do Bara's Hotel, em Bom Conselho, Pernambuco.
- Uso: apresentação no portfólio, sem link externo e sem corte da captura.

## Instituto LEMMA — capa em vídeo

- Arquivos: `lemma-capa.webm`, `lemma-capa.mp4` (1820 × 700 px, 8 s em loop, sem áudio) e `lemma-capa-poster.jpg` (quadro de 5 s).
- Criados em 04/11/2026 com assistência do Claude Code: cena HTML determinística (`projetos/Instituto-Lemma/video-capa/index.html`, fora deste repositório) gravada quadro a quadro no Chromium a 30 fps e codificada com ffmpeg, no mesmo processo da capa da Vértice.
- Conteúdo: geometria (círculos, triângulo, eixos e curva) desenhada em torno da gravura de Évariste Galois do site do Instituto, com o olhar acompanhando um ponto sobre a curva, o título "Ciência sem concessões." e a linha "Exatas & Olimpíadas". Os arquivos da gravura e dos olhos vêm de `projetos/Instituto-Lemma/`. O primeiro e o último quadro são fundo vazio, para o loop fechar sem emenda.
- Uso: capa do card Instituto LEMMA em `index.html`, tocando enquanto o card está visível. Faixa larga porque o card ocupa a linha inteira da grade.

## Cartório Algacyr Barros — capa animada

- Arquivo: `cartorio-selo.png` (240 × 233 px), reduzido de `public/logo-icon-v3.png` do repositório `cartorio-project` (logo da serventia, pena dourada).
- Criada em 14/11/2026 com assistência do Claude Code. Diferente das outras capas, não é vídeo: é uma animação em HTML e CSS dentro do próprio card (`.cartorio-cover` em `index.html` e `styles.css`), 8 s em loop, pausada fora da tela por `app.mjs`.
- Conteúdo: a identidade do site do cartório (vinho, ouro velho e papel). O título "Seu atendimento começa com uma mensagem." sobe linha a linha, uma régua dourada se desenha, chega a mensagem do cidadão ("digitando…" e depois o texto), a serventia responde e o selo com o logo carimba a cena. O quadro final fica vazio para o loop fechar sem emenda.
- Uso: card do Cartório Algacyr Barros, que substituiu o card da Vértice em 14/11/2026. O site do cartório está marcado como `noindex` até a serventia autorizar a publicação.

## Sorvebom — capa animada

- Arquivos: `sorvebom-mag-cookies.webp`, `sorvebom-mag-black.webp`, `sorvebom-picole-abacaxi.webp`, `sorvebom-pote-sonho-de-verao-2l.webp` e `sorvebom-pote-leitinho-trufado-zero-1l.webp` (até 760 px de altura).
- Origem: recortes oficiais de produtos publicados em `sorvebom.mcode.dev.br/assets/images/produtos/`, baixados em 14/11/2026 com autorização do usuário. Os recortes originais tinham um halo branco (cerca de metade dos pixels semitransparentes da borda era quase branca), visível como contorno no fundo escuro.
- Limpeza (14/11/2026, com assistência do Claude Code, no navegador): erosão de 1 px do alfa, remoção da mistura com branco nos pixels semitransparentes, cor da borda puxada do interior opaco e suavização de 1 px. A ferramenta ficou em `tmp/defringe.html`, fora do Git.
- Uso: capa do card Sorvebom em `index.html`, agora em HTML e CSS (`.sorvebom-cover`), 8 s em loop: a tagline "A vida tem nosso sabor." em Anton e os cinco produtos entrando um a um. Substitui a capa em vídeo feita com HyperFrames em 03/11/2026, cujos recortes tinham a borda clara. Pausa fora da tela por `app.mjs` e toca mesmo com `prefers-reduced-motion`.

Ao alterar a capa da LEMMA, renderizar de novo, regenerar os três arquivos e manter o primeiro e o último quadro idênticos para o loop.

## Fontes

- Anton: [licença SIL OFL 1.1](fonts/OFL-Anton.txt), com identificação dos autores e repositório de origem.
- Barlow: [licença SIL OFL 1.1](fonts/OFL-Barlow.txt), com identificação dos autores e repositório de origem.
- Space Grotesk: texto e interface, arquivo variável `space-grotesk.ttf`, pesos 300–700. [Origem oficial](https://github.com/google/fonts/tree/main/ofl/spacegrotesk) e [licença OFL](fonts/OFL-SpaceGrotesk.txt).
- Geist Mono: navegação, metadados e terminais, arquivo variável `geist-mono.ttf`, pesos 100–900. [Origem oficial](https://github.com/google/fonts/tree/main/ofl/geistmono) e [licença OFL](fonts/OFL-GeistMono.txt).

As duas novas famílias foram obtidas do repositório oficial Google Fonts em 28/10/2026 e são servidas localmente, sem chamadas ao serviço de fontes durante o uso. A combinação visual se inspira na captura da Alethe em `refs/Captura de tela 2026-10-28 140314.png`; não afirma identificação exata das fontes da referência. Anton passou a compor os títulos principais; Barlow permanece como asset legado.

Preservar as licenças ao publicar ou converter as fontes.

## Fotos dos desenvolvedores

- `devs/dev-1.jpg`: foto fornecida pelo usuário para **Mateus Dias**, 853 × 1280 px.
- `devs/dev-2.jpg`: foto fornecida pelo usuário para **Caio Ribi**, 960 × 1280 px.
- Associação de nomes e fotos confirmada pelo usuário nesta conversa. Os arquivos originais foram preservados; o enquadramento é feito por CSS, com espaço reservado para evitar mudança de layout e carregamento tardio.
- Perfis GitHub confirmados pelo usuário: `root-mwteus` e `caioribi7`, respectivamente. Não foram adicionadas biografias, cargos ou especialidades não fornecidas.

## Identidade MCode — origem

Os arquivos utilizados pela página vêm de [MCode-Identidade-Visual](../MCode-Identidade-Visual/IDENTIDADE-VISUAL.md). Os originais são preservados; a confirmação de titularidade/autorização comercial pelos responsáveis continua pendente no planejamento.

Este documento é um registro de origem e deve ficar fora do pacote público de publicação, conforme o Roadmap.

## Imagem de compartilhamento

`social-preview.jpg` é uma captura da própria landing em 1200 × 630 px, preparada em 28/10/2026. Usa os assets existentes da MCode e fontes locais, sem fotografia ou conteúdo externo. Deve ser regenerada quando o hero mudar. O domínio definitivo ainda precisa ser definido para converter os metadados de imagem em URLs absolutas.
