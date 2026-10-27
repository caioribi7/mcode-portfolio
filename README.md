# MCode — portfólio conceitual

Portfólio estático em português, implementado em HTML, CSS e módulos JavaScript nativos. Sem framework, gerenciador de pacotes ou etapa de build.

## Planejamento da versão 1.0

- [Roadmap](docs/planejamento/ROADMAP.md): seis passos de evolução e critérios de progresso.
- [Política de segurança](docs/planejamento/SECURITY.md): requisitos de infraestrutura, formulário e privacidade.
- [Definição de pronto](docs/planejamento/DEFINITION-OF-DONE.md): checklist de lançamento, limites de escopo e regra de parada.

Esses documentos descrevem requisitos planejados. Não comprovam implantação nem controles já verificados.

## Prévia local

Requer Python disponível como `python`. Na raiz do projeto, execute:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173` no navegador. O comando serve os arquivos somente na interface local; encerre com Ctrl+C. Use HTTP local para carregar os módulos, não abra apenas o HTML com `file://`. Se a porta já estiver ocupada pela prévia, use o servidor existente ou encerre-o antes de iniciar outro.

## Pacote público local

Com Node.js instalado, prepare uma cópia dos arquivos públicos:

```sh
node scripts/prepare-site.mjs
python -m http.server 4174 --bind 127.0.0.1 --directory dist
```

Abra `http://127.0.0.1:4174`. O diretório `dist/` é gerado e ignorado pelo Git. O script copia 16 arquivos por lista explícita, incluindo as licenças das fontes e somente três SVGs da identidade. Não compila, transforma nem minifica o front-end. Execute novamente após alterar arquivos públicos; a prévia da raiz na porta 4173 continua disponível para desenvolvimento.

Documentação, testes, histórico Git e arquivos locais ficam fora do pacote. O script recusa links simbólicos e arquivos/diretórios inesperados em `dist/`, sem removê-los automaticamente. Em caso de recusa, revise os caminhos informados antes de limpar qualquer arquivo manualmente. Novos assets públicos exigem atualização da lista `PUBLIC_FILES` em `scripts/prepare-site.mjs`.

`404.html` é a página de erro preparada para hospedagem. A prévia Python permite visualizá-la em `/404.html`, mas usa sua própria página de erro para URLs inexistentes e não aplica `_headers`. A apresentação da 404 e os headers reais precisam ser verificados no provedor. Não há deploy configurado nesta etapa; não publique a raiz do repositório.

## Testes

Com Node.js instalado, na raiz do projeto:

```sh
node --test
```

Os testes estão em `tests/`: verificam a página, o briefing, a geometria/rotação do logo, a faixa de texto, a inicialização segura do formulário e o pacote público. Os testes do pacote verificam exclusão de arquivos locais, referências a assets, atualização das cópias e recusa de conteúdo inesperado. Os testes do formulário simulam controles e eventos em Node; não substituem revisão visual e testes em navegadores reais.

## Arquivos principais

- `index.html`: conteúdo, navegação, projetos conceituais, serviços e formulário.
- `styles.css`: fontes locais, tokens CSS, composição, estados, responsividade e redução de movimento.
- `refinements.css`: refinamento da composição, separação do logo/textos e correção dos conflitos nos projetos.
- `logo-geometry.mjs`: contornos fiéis ao símbolo SVG original, extrusão com faces e rotação 3D.
- `logo-animation.mjs`: projeção em perspectiva e iluminação de faces, seguida de halftone em Canvas 2D; não é uma imagem plana girando em CSS. Loop de 12 segundos, botão de pausa, respeito a movimento reduzido e suspensão fora de tela.
- `app.mjs`: menu móvel, abertura dos detalhes de projetos, preparação e cópia do briefing.
- `brief.mjs`: formatação do texto do briefing.
- `404.html`: página de erro sem dependência de JavaScript.
- `scripts/prepare-site.mjs`: cópia por lista explícita para `dist/`, sem transformação do front-end.
- `assets/frame-composition.svg`: composição geométrica usada no projeto conceitual Frame.
- `assets/README.md`: registro de origem dos assets e licenças.
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

Os campos e botões do briefing ficam dentro de um `fieldset` desativado no HTML. O JavaScript registra primeiro a prevenção do envio nativo e habilita o grupo somente ao terminar a inicialização dos controles. Sem JavaScript ou em caso de falha na inicialização, os campos continuam desativados e um aviso explica a dependência. Isso evita coletar e enviar campos pela submissão HTML padrão nesse modo local. O formulário ainda não tem destino real; POST e envio sem JavaScript fazem parte da futura integração do Formspree.

## Imagens e direitos: pendência antes de lançamento público comercial

O personagem foi removido, inclusive de `assets/`. O destaque atual é uma animação procedural do próprio símbolo da MCode, cujos contornos reproduzem as coordenadas do SVG aprovado. Os arquivos originais da identidade não foram modificados. A extrusão e a rotação são uma aplicação derivada solicitada pelo usuário, não uma alteração do desenho mestre.

A fotografia de flores anteriormente atribuída ao Unsplash foi substituída por `assets/frame-composition.svg`, uma composição geométrica escrita em SVG nesta alteração, com assistência do Codex, sem recursos externos. A origem está registrada em [assets/README.md](assets/README.md). O arquivo antigo foi removido da árvore atual e pode continuar no histórico Git. Ao substituir imagens, registre a origem e preserve os avisos de licença aplicáveis. A confirmação de titularidade/autorização comercial da identidade MCode pelos responsáveis continua pendente no planejamento.

As licenças OFL das fontes acompanham os arquivos locais. A identidade visual original continua preservada. Este README não afirma implantação, publicação ou prontidão comercial; descreve apenas a implementação e o uso local.
