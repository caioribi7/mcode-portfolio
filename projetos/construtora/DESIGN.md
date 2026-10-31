# DESIGN — Direção A: Composição Arquitetônica Aberta (Vértice Engenharia & Obra)

> **Status do documento:** Planejamento aprovado — Direção A. Pronto para implementação.

## 1. Conceito Visual e Justificativa

**Conceito:** *Monografia de Arquitetura & Matéria Construída.*

A direção rompe simultaneamente com dois vícios do mercado:
1. **O clichê de empreiteira genérica:** capacetes amarelos, preto/amarelo automático e slogans vazios.
2. **O fetiche de template de software ("Blueprint Cosplay"):** excesso de bordas cinzas, grades repetitivas de cartões idênticos e dezenas de micro-etiquetas em monoespaçada (`PRANCHA 01`, `PILAR A`, `01 / ORÇAMENTO`) que fazem uma construtora de alto padrão parecer um dashboard de TI.

A **Composição Arquitetônica Aberta** adota a elegância de publicações impressas de arquitetura:
- **Respiro e assimetria:** seções que respiram, permitindo que o olho percorra títulos expressivos e peças visuais sem ser confinado em caixas retangulares fechadas.
- **Hierarquia com escala real:** contraste evidente entre títulos principais e textos de leitura contínua, sem inflacionar a página com elementos puramente decorativos.
- **Superfícies minerais:** tons quentes e calmos inspirados em concreto curado, areia lavada, madeira e aço corten/terracota.

---

## 2. Paleta de Cores e Materiais

| Token CSS | Hex | Função no Sistema | Critério de Uso |
|---|---|---|---|
| `--bg-primary` | `#F4F1EA` | Fundo principal (Concreto calcário claro) | Superfície mineral arejada e acolhedora |
| `--bg-elevated` | `#EAE5DA` | Painéis sutis e áreas de leitura técnica | Contraste suave por tom de matéria |
| `--bg-dark` | `#181917` | Faixa de contraste (Método Executivo e Rodapé) | Ritmo e profundidade gráfica |
| `--ink-primary` | `#181917` | Títulos e texto principal sobre fundo claro | Alto contraste (> 14:1) para legibilidade absoluta |
| `--ink-secondary` | `#4A4943` | Textos de leitura e parágrafos de apoio | Leitura confortável em blocos editoriais |
| `--ink-muted` | `#6E6C64` | Metadados e legendas informativas | Apoio visual contido |
| `--ink-on-dark` | `#F4F1EA` | Texto principal sobre `--bg-dark` | Máxima nitidez na faixa escura |
| `--accent` | `#9E3E22` | Terracota / Aço corten (Ações principais e âncoras) | Ponto focal com gravidade arquitetônica |
| `--accent-hover` | `#7D2E16` | Estado ativo/hover de botões | Transição tátil escura |
| `--rule-line` | `#D6D0C3` | Linhas divisórias sutis de prancha e lista (`1px`) | Estrutura limpa sem "prender" o conteúdo em caixas |
| `--rule-strong` | `#181917` | Filetes de cabeçalho e ênfase estrutural | Peso gráfico deliberado |

*Nota:* Sem sombras difusas falsas, sem gradientes de aplicativo e sem glassmorphism. O volume decorre da geometria dos planos e da respiração entre blocos.

---

## 3. Tipografia e Hierarquia

Fontes servidas localmente em formato `.ttf` com licença aberta (SIL OFL) em `assets/fonts/`:

- **Família Principal (`Space Grotesk`):**
  - Mantida por sua geometria limpa, neutra e contemporânea, perfeitamente alinhada a projetos de arquitetura moderna.
  - **Calibração de Hierarquia:**
    - Título Hero (`h1`): `clamp(2.5rem, 4.5vw + 1rem, 4.25rem)`, peso 600, entrelinha justa `1.05`, tracking levemente negativo `-0.025em`.
    - Títulos de Seção (`h2`): `clamp(1.85rem, 3vw + 0.5rem, 3rem)`, peso 600, entrelinha `1.12`.
    - Títulos de Frentes e Etapas (`h3`): `clamp(1.25rem, 1.8vw + 0.3rem, 1.65rem)`, peso 600.
    - Corpo de leitura (`body`): `1.0625rem` (`17px`), entrelinha `1.65`, largura máxima restrita a `55ch–62ch` para evitar fadiga visual.
- **Família de Suporte (`Geist Mono`):**
  - **Uso estritamente contido:** reservada para numerais de etapa (`01`, `02`, `03`), cotas reais de projeto e legendas de identificação de estudo ilustrativo.
  - **Eliminação do ruído:** banidas as dezenas de tags cosméticas em monoespaçada que inflacionavam o layout anterior.

---

## 4. Ritmo de Seções e Composição (Adeus aos Cartões Repetitivos)

1. **Aviso de Demonstração (Topo):** Faixa sutil no topo do viewport, transparente quanto ao caráter conceitual da MCode.
2. **Hero Editorial Assimétrico (`#inicio`):**
   - Lado esquerdo dominante: título que sintetiza a proposta de engenharia de planejamento, texto de leitura enxuto e dois botões de ação com hierarquia bem diferenciada (um primário sólido em terracota e um secundário de contorno fino).
   - Lado direito com respiro: composição visual arquitetônica de proporção vertical com acabamento limpo, acompanhada de legenda discreta.
3. **Frentes de Atuação em Lista Aberta (`#atuacao`):**
   - Substituição da grade de 3 cartões por uma **lista horizontal aberta com divisórias sutis de 1px**.
   - Cada linha apresenta o número da frente, o título, o escopo essencial e a entrega principal em fluxo de leitura horizontal, sem cartões encapsulados.
4. **Estudos de Tipologia em Exposição Contínua (`#tipologias`):**
   - Fim das abas que escondiam 2/3 dos projetos.
   - Apresentação visual direta de estudos arquitetônicos de referência, combinando imagens em escala ampla com fichas técnicas limpas posicionadas logo ao lado ou abaixo, demonstrando clareza de materiais e sistemas construtivos.
5. **Método Construtivo em Sequência Linear (`#metodo`):**
   - Seção de contraste em grafite estrutural (`#181917`).
   - Apresentação em **fluxo linear de 4 etapas** integradas no ritmo vertical, com numerais expressivos (`01` a `04`) integrados ao texto explicativo, sem caixas 2x2.
6. **Comparativo de Rigor Técnico (`#rigor`):**
   - Comparação tipográfica direta em 2 colunas abertas (*O que o improviso tolera* vs. *O que o rigor Vértice exige*), abordando abertamente aditivos surpresa, incompatibilidade e compras emergenciais.
7. **Contato Demonstrativo Simples (`#contato`):**
   - Seção de encerramento acolhedora, com orientações diretas de como alinhar a primeira reunião técnica e dados institucionais demonstrativos, acompanhados de aviso explícito de que nenhum dado é coletado ou enviado.

---

## 5. Diretriz de Imagens e Ilustrações

- Imagens e ilustrações precisam ter **relevância compositiva e função clara**, evitando tanto cliparts vetoriais genéricos quanto fotos decorativas sem propósito.
- As peças visuais exibem proporção calculada, enquadramento de escala e legendas honestas: `Referência visual ilustrativa — Estudo conceitual MCode`.

---

## 6. Acessibilidade e Movimento

- Navegação por âncoras internas limpa e com `:focus-visible` destacado em terracota.
- Contraste em conformidade com WCAG AA em todas as seções claras e escuras.
- Suporte integral a `prefers-reduced-motion: reduce` para rolagem e transições imediatas.
- Total usabilidade em telas estreitas a partir de `320px`, sem estouro de largura.
