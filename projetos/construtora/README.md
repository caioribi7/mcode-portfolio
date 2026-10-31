# Vértice Engenharia & Obra — Landing Page Demonstrativa (MCode)

> **Status do projeto:** Planejamento aprovado — Direção A ("Composição Arquitetônica Aberta"). Documentação atualizada antes do início da implementação.

## 1. Resumo do Projeto

Landing page demonstrativa criada pela **MCode** (**mwteus** e **caioribi7**) para apresentação comercial ao proprietário de uma construtora local.

O projeto adota a **Direção A ("Composição Arquitetônica Aberta")**: uma abordagem editorial inspirada em publicações de arquitetura contemporânea, com grid assimétrico, lista aberta de serviços, tipologia de exposição contínua e texto focado nas fricções reais de canteiro (aditivos surpresa, compatibilização prévia e controle orçamentário).

O projeto é mantido **100% isolado** do portfólio principal da MCode em `projetos/construtora/`.

## 2. Stack e Arquitetura

- **HTML5 semântico** (`index.html`): estrutura semântica acessível, com navegação por âncoras internas entre seções.
- **CSS3 nativo** (`styles.css`): paleta mineral e terracota, grid assimétrico com divisórias sutis, tipografia fluida (`clamp()`) e respeito a `prefers-reduced-motion`.
- **JavaScript modular nativo** (`app.mjs`): controle de menu móvel acessível (`aria-expanded` e tecla `Escape`).
- **Fontes locais sob licença OFL** (`Space Grotesk` e `Geist Mono` em `assets/fonts/`).
- **Zero dependências externas:** sem frameworks, sem bundlers, sem backend e sem requisições a CDNs.

## 3. Estrutura de Arquivos (`projetos/construtora/`)

```text
projetos/construtora/
├── README.md                 # Visão geral, execução e limitações
├── PRODUCT.md                # Objetivo, público, hipóteses e limites comerciais
├── DESIGN.md                 # Direção A: Composição Arquitetônica Aberta
├── CONTENT.md                # Textos completos, frentes em lista aberta e contato
├── ROADMAP.md                # 5 etapas sequenciais de entrega
├── DEFINITION-OF-DONE.md     # Checklist de conclusão da Direção A
├── ASSETS.md                 # Registro de fontes e ilustrações autorais
├── index.html                # (A ser atualizado) Página única da demonstração
├── styles.css                # (A ser atualizado) Sistema visual aberto e assimétrico
├── app.mjs                   # (A ser atualizado) Interatividade progressiva enxuta
├── assets/                   # Fontes locais e composições SVG autorais
└── tests/                    # Testes automatizados da demonstração
```

## 4. Como Executar e Verificar

Para rodar a prévia local com o servidor HTTP nativo do Python:

```sh
python -m http.server 4175 --bind 127.0.0.1 --directory projetos/construtora
```

Acesse `http://127.0.0.1:4175` no navegador.

Para executar a suíte de testes:

```sh
node --test projetos/construtora/tests/construtora.test.mjs
```

## 5. Limitações da Demonstração

- **Conteúdo 100% fictício e conceitual:** a marca *Vértice Engenharia & Obra* não existe juridicamente. Não há afirmação de clientes, obras executadas, certificações ou métricas comerciais.
- **Referências visuais ilustrativas:** as peças gráficas são estudos conceituais para demonstração de repertório e direção visual.
- **Contato demonstrativo simples:** orientações objetivas para agendamento de conversa técnica sem formulários ou envio de dados pela rede.
