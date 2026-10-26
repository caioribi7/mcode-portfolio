# MCode — portfólio conceitual

Portfólio estático em português, implementado em HTML, CSS e módulos JavaScript nativos. Sem framework, gerenciador de pacotes ou etapa de build.

## Prévia local

Requer Python disponível como `python`. Execute:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory C:/Users/caior/workspace/portfolio
```

Abra `http://127.0.0.1:4173` no navegador. O comando serve os arquivos somente na interface local; encerre com Ctrl+C. Use HTTP local para carregar os módulos, não abra apenas o HTML com `file://`. Se a porta já estiver ocupada pela prévia, use o servidor existente ou encerre-o antes de iniciar outro.

## Testes

Com Node.js instalado, na raiz do projeto:

```sh
node --test tests/*.test.mjs
```

Os testes existentes estão em `tests/site.test.mjs`, `tests/brief.test.mjs` e `tests/logo.test.mjs`. Verificam a página, o briefing, os contornos/extrusão e a periodicidade da rotação. Essa execução não substitui revisão visual e testes de navegador.

## Arquivos principais

- `index.html`: conteúdo, navegação, projetos conceituais, serviços e formulário.
- `styles.css`: fontes locais, tokens CSS, composição, estados, responsividade e redução de movimento.
- `refinements.css`: refinamento da composição, separação do logo/textos e correção dos conflitos nos projetos.
- `logo-geometry.mjs`: contornos fiéis ao símbolo SVG original, extrusão com faces e rotação 3D.
- `logo-animation.mjs`: projeção em perspectiva e iluminação de faces, seguida de halftone em Canvas 2D; não é uma imagem plana girando em CSS. Loop de 12 segundos, botão de pausa, respeito a movimento reduzido e suspensão fora de tela.
- `app.mjs`: menu móvel, abertura dos detalhes de projetos, preparação e cópia do briefing.
- `brief.mjs`: formatação do texto do briefing.
- `assets/fonts/`: Anton e Barlow em TTF, acompanhadas de `OFL-Anton.txt` e `OFL-Barlow.txt`.
- `MCode-Identidade-Visual/`: identidade fornecida e preservada; não alterar os originais.
- `PRODUCT.md`: contexto e limitações do produto.
- `DESIGN.md`: tokens e descrição do sistema visual realmente implementado.
- `.impeccable/design.json`: extensões e exemplos de componentes do sistema visual.
- `.impeccable/surface-briefs/landing.md`: contrato da composição desta página.

## Substituir conteúdo

Os trabalhos Órbita, Frame e Pulse são demonstrações conceituais, não cases de clientes. A apresentação do estúdio e os serviços também são ilustrativos. Substitua textos e imagens em `index.html` apenas com informações verificadas; mantenha as indicações de conceito enquanto não houver trabalhos reais. Não acrescente clientes, resultados, métricas ou depoimentos fictícios.

Ao trocar um trabalho, atualize o título, categoria, descrição acessível do link, texto alternativo das imagens e conteúdo de seu `details`. Preserve a correspondência entre o `href="#projeto-…"` e o `id` do detalhe: `app.mjs` usa essa relação. Atualize as dimensões declaradas de novas imagens e mantenha carregamento tardio nas imagens fora da primeira tela quando apropriado.

Para mudar serviços, edite os elementos `details` da seção do estúdio. Para mudar a mensagem principal, revise também a quebra de palavras do h1 em telas estreitas. Preserve o idioma da página, os rótulos dos campos, a ordem de títulos, a navegação por teclado e os estados de foco.

Mudanças visuais devem partir dos valores de `styles.css`. Atualize `DESIGN.md` e o sidecar quando o sistema implementado mudar; os documentos descrevem o código, não o substituem. Os recortes e sobreposições particulares dos trabalhos não são tokens globais.

## Contato: não envia mensagens

O formulário não tem backend, serviço de e-mail nem destino de contato configurado. Com JavaScript ativo, o envio é interceptado: nome, e-mail e ideia são formatados localmente em um briefing somente-leitura. O visitante pode copiar o texto. Nada é enviado à MCode por essa implementação, e não existe confirmação de recebimento.

A cópia automática depende da Clipboard API e das permissões/contexto do navegador. Em caso de falha, o texto é selecionado e a interface orienta a cópia manual. Não remova o aviso de não envio nem altere a mensagem para “enviado” sem implementar e verificar um destino real. Sem JavaScript, não há preparação/cópia do briefing; não trate o formulário como um canal de contato funcional.

## Imagens e direitos: pendência antes de lançamento público comercial

O personagem foi removido, inclusive de `assets/`. O destaque atual é uma animação procedural do próprio símbolo da MCode, cujos contornos reproduzem as coordenadas do SVG aprovado. Os arquivos originais da identidade não foram modificados. A extrusão e a rotação são uma aplicação derivada solicitada pelo usuário, não uma alteração do desenho mestre.

A imagem de natureza-morta em `assets/artwork.jpg` é identificada na página como imagem de acervo via Unsplash. Confira sua proveniência, licença e adequação ao uso pretendido antes de publicar ou substituir. Metadados de proveniência não equivalem a autorização ou liberação de direitos. Ao substituir imagens, registre a origem e preserve os avisos de licença aplicáveis.

As licenças OFL das fontes acompanham os arquivos locais. A identidade visual original continua preservada. Este README não afirma implantação, publicação ou prontidão comercial; descreve apenas a implementação e o uso local.
