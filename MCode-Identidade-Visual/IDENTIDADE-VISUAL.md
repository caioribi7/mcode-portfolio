# MCode — Guia de identidade visual

Versão 1.0 · Identidade aprovada: Módulo MC, com barra inferior prolongada.

## 1. Conceito

A identidade combina precisão, energia e uma linguagem visual ligada a tecnologia. O símbolo integra as iniciais **M** e **C** em uma estrutura geométrica: diagonais a 45°, terminais retos e uma base horizontal. A barrinha inferior começa na mesma linha vertical da borda interna esquerda da concavidade do M — o ajuste aprovado na versão final.

O verde neon é o ponto de reconhecimento da marca. O fundo quase preto cria contraste e dá espaço para que a geometria apareça com clareza. A assinatura **MCode** usa letras desenhadas em vetor, com formas retas e curvas contidas. Manter a grafia com M e C maiúsculos.

O contexto de tecnologia foi adotado para orientar os exemplos. As aplicações da apresentação são demonstrações visuais, não afirmações sobre produtos ou serviços da MCode.

## 2. Paleta

| Cor | HEX | RGB | CMYK aproximado* | Papel |
|---|---|---|---|---|
| Verde neon | `#A3FF12` | 163, 255, 18 | 36, 0, 93, 0 | Símbolo, destaques e chamadas |
| Preto profundo | `#0B100D` | 11, 16, 13 | 31, 0, 19, 94 | Fundo principal e marca sobre claro |
| Branco suave | `#F1F5EF` | 241, 245, 239 | 2, 0, 2, 4 | Assinatura e texto sobre escuro |
| Superfície | `#111A14` | 17, 26, 20 | 35, 0, 23, 90 | Cartões e planos secundários |
| Cinza verde | `#829488` | 130, 148, 136 | 12, 0, 8, 42 | Texto secundário sobre escuro |
| Divisória | `#2A332D` | 42, 51, 45 | 18, 0, 12, 80 | Linhas e separadores decorativos |

*Conversões matemáticas de referência, sem perfil de impressão. O neon RGB não é reproduzido fielmente em CMYK. Para impressos com efeito fluorescente, definir tinta especial com a gráfica mediante prova física. Não foi fixada equivalência Pantone.

Como ponto de partida para composições, usar aproximadamente 75% de fundos neutros, 20% de textos e áreas claras e 5% de verde. Essa proporção orienta o equilíbrio; não é uma regra matemática para cada peça.

## 3. Versões do logo

| Nome no arquivo | Aplicação |
|---|---|
| `horizontal` | Versão principal: cabeçalhos, assinaturas e materiais largos |
| `vertical` | Composição centralizada: capas, peças quadradas e apresentações |
| `simbolo` | Avatar, favicon, ícone e espaços compactos |
| `assinatura` | Nome MCode isolado, quando o símbolo já estiver presente na composição |

| Sufixo | Cores e fundo recomendado |
|---|---|
| `cor-escuro` | Símbolo neon e nome branco suave, sobre preto profundo |
| `cor-claro` | Toda a marca em preto profundo, sobre branco ou branco suave |
| `preto` | Preto puro, para reprodução em uma cor |
| `branco` | Branco puro, sobre fundo escuro uniforme |
| `verde` | Marca inteiramente neon, sobre preto profundo |

Os SVG e PNG de logos têm fundo transparente. O avatar, a capa e os ícones web têm fundo escuro incorporado. A versão clara é propositalmente escura para preservar o contraste: não usar letras brancas ou verde neon diretamente sobre branco.

## 4. Construção, alinhamento e área de proteção

No desenho mestre do símbolo, a caixa é de 256 × 256 unidades. A forma ocupa x=24 a 232 e y=48 a 208. As hastes principais e a barra inferior têm 40 unidades de espessura; as diagonais são a 45°. A barra inferior vai de x=84 a 232 e está alinhada ao início da concavidade interna do M em x=84.

Definir **u** como a espessura de uma haste do símbolo. Reservar ao menos **1u de espaço livre fora do desenho visível** em todos os lados. A margem transparente de um arquivo não substitui automaticamente essa área de proteção; conferir o espaço na composição final.

Usar as assinaturas fornecidas com suas proporções e espaçamentos. Não reposicionar letras, deslocar a barrinha nem aproximar manualmente o nome do símbolo.

## 5. Tamanhos mínimos

| Elemento | Digital recomendado | Impresso recomendado |
|---|---|---|
| Símbolo | Caixa de 24 px; favicon de 16 px como exceção | 8 mm de largura da forma |
| Horizontal | 220 px de largura do arquivo | 45 mm de largura do arquivo |
| Vertical | 180 px de largura do arquivo | 35 mm de largura do arquivo |
| Assinatura isolada | 160 px de largura do arquivo | 30 mm de largura do arquivo |

O pack inclui favicon de 16 px, mas 24–32 px preservam melhor a abertura interna. Os mínimos impressos são orientações conservadoras: fazer prova no material e processo escolhidos. Em bordado ou gravação, usar a versão monocromática e aumentar se necessário para manter as aberturas.

## 6. Tipografia

**Logo:** lettering próprio construído em curvas SVG. Não há fonte para instalar e não se deve redigitar o nome para reproduzir o logo.

**Textos de apoio:** Segoe UI, com Arial e sans-serif como alternativas. Usar Semibold/Bold para títulos e Regular para textos. Para trechos de código, usar Consolas, com Courier New e monospace como alternativas. São fontes do ambiente de uso; não estão incluídas nem licenciadas por este pack. Verificar a licença antes de redistribuir ou hospedar arquivos de fonte.

Sugestão para interfaces: títulos entre 32 e 48 px, subtítulos de 22–28 px e corpo de 16–18 px. Preferir caixa normal nos textos; reservar caixa alta com espaçamento moderado para pequenos rótulos.

## 7. Direção gráfica e contraste

Compor com margens generosas, alinhamentos claros, poucos elementos e blocos de cor plana. As diagonais de 45° do símbolo podem orientar recortes e detalhes gráficos discretos, sem reconstruir ou deformar o logo.

Sobre fundo escuro, usar branco suave para leitura e neon para destaques. Em botões neon, usar texto preto profundo. Sobre fundos claros, usar texto e marca escuros. A cor Divisória é decorativa e não deve ser a única indicação de um controle ou estado.

Não depender apenas da cor para indicar estados: combinar com rótulos, formas ou ícones. As combinações de referência são verificadas no arquivo `05-Apresentacao/contraste.json`; validar novamente ao mudar cores, opacidade ou fundo.

Em fotografias, colocar o logo sobre uma área uniforme ou uma placa sólida escura com a área de proteção. Não aplicar diretamente em regiões visualmente carregadas.

## 8. Usos a evitar

- Esticar, comprimir, inclinar ou girar o logo.
- Mudar a posição da barra inferior ou alterar o espaço interno do monograma.
- Adicionar brilho, sombras, degradês ou contornos ao desenho mestre.
- Trocar as cores, aplicar transparência ou usar neon sobre branco.
- Redigitar MCode com uma fonte parecida.
- Usar o logo como padrão denso ou deixá-lo competir com elementos próximos.

## 9. Conteúdo e escolha dos arquivos

| Pasta | Conteúdo |
|---|---|
| `01-Logos-SVG` | 4 composições × 5 versões de cor, vetoriais e transparentes |
| `02-Logos-PNG` | As mesmas 20 versões em larguras de 1024 e 2048 px |
| `03-Web` | Favicon SVG/ICO/PNG, Apple Touch Icon, ícones 192/512, manifest, trecho HTML e tokens CSS |
| `04-Social` | Avatar quadrado de 1024 px e capa de 1584 × 396 px, em SVG e PNG |
| `05-Apresentacao` | Apresentação HTML com exemplos, painel PNG/SVG e registros de verificação |

Usar SVG em sites e editores vetoriais. Para apresentações e documentos que não aceitem SVG, usar PNG. Os PNG são exportados em largura nominal indicada no nome; a altura acompanha a proporção. PNG branco sobre transparência pode parecer vazio em visualizadores com fundo branco.

O avatar mantém o monograma dentro de uma região segura para recorte circular. A capa é um modelo geral de 1584 × 396 px; conferir os recortes e sobreposições da plataforma antes de publicar. Os ícones do manifest são do tipo `any`, sem promessa de adequação a todas as máscaras de ícones de aplicativos nativos.

Para instalar os recursos web, copiar os arquivos de `03-Web` para a raiz pública e usar `head.html` como referência, ajustando caminhos se estiverem em outra pasta. O arquivo `mcode-tokens.css` contém as cores e as famílias tipográficas de apoio.

## 10. Reprodução e manutenção

Os mestres são SVG com formas vetoriais e lettering em curvas. Não dependem de fontes, imagens incorporadas ou efeitos. Para impressão, enviar o SVG à gráfica e solicitar conversão no fluxo dela, com perfil e prova de cor. Este pack não contém PDF CMYK, AI ou EPS.

A apresentação contém simulações de aplicação em contextos digitais. Não são interfaces implementadas nem produtos publicados. Nenhum processo de impressão física foi validado.

Manter os mestres desta pasta como referência. Novas peças devem partir destes arquivos, preservando geometria, paleta e proporções. Registro de marca e pesquisa jurídica de disponibilidade não fazem parte do pack.
