# ROADMAP — Landing Page Demonstrativa (Direção A: Composição Arquitetônica Aberta)

> **Status do documento:** Planejamento aprovado — Etapa 1 concluída. Pronto para a Etapa 2.

## Visão Geral

Implementação refinada da landing page demonstrativa em 5 etapas sequenciais, mantendo o isolamento completo dentro de `projetos/construtora/` e sem alterar nenhum arquivo da raiz da MCode.

| Etapa | Entrega Principal | Status |
|---|---|---|
| **1. Documentação e Direção Visual (A)** | Atualização completa dos 7 arquivos Markdown com a Direção A aprovada pelo usuário. | **Concluído** |
| **2. Refinamento de Assets e Tipografia** | Revisão das ilustrações arquitetônicas e organização das fontes locais (`Space Grotesk` e `Geist Mono`). | **Concluído** |
| **3. Reestruturação Semântica HTML (`index.html`)** | Implementação do novo HTML sem cartões repetitivos, com hero assimétrico, lista de frentes aberta e contato direto. | **Concluído** |
| **4. Sistema Visual CSS (`styles.css`)** | Estilização da Composição Aberta com grid assimétrico, escala tipográfica calibrada e eliminação do ruído de bordas. | **Concluído** |
| **5. Interatividade Enxuta e Verificação Técnica** | JavaScript progressivo (menu acessível), testes automatizados (`node --test`) e conferência do servidor local. | **Concluído** |

---

## Detalhamento das Etapas e Critérios de Conclusão

### Etapa 1 — Documentação e Direção Visual
- **Entregas:** `PRODUCT.md`, `DESIGN.md`, `CONTENT.md`, `ROADMAP.md`, `DEFINITION-OF-DONE.md`, `ASSETS.md` e `README.md` alinhados com a Direção A ("Composição Arquitetônica Aberta").
- **Critério de conclusão:** Arquivos Markdown consistentes e aprovados.

### Etapa 2 — Refinamento de Assets e Tipografia
- **Entregas:**
  - Fontes locais em `assets/fonts/` (`Space Grotesk` e `Geist Mono`) com licenças OFL mantidas.
  - Ajuste e limpeza das peças visuais em SVG para eliminar o aspecto de clipart colorido e conferir rigor geométrico, proporções amplas e clareza de escala técnica.
  - Registro atualizado em `ASSETS.md`.
- **Critério de conclusão:** Todos os arquivos de imagem e fonte presentes localmente e validados.

### Etapa 3 — Reestruturação Semântica HTML (`index.html`)
- **Entregas:**
  - Marcação HTML5 semântica e acessível mesmo com JavaScript desabilitado.
  - Hero assimétrico (`#inicio`), lista aberta de frentes (`#atuacao`), exposição contínua de tipologias (`#tipologias`), timeline linear em 4 atos (`#metodo`), comparativo de rigor (`#rigor`) e contato demonstrativo simples (`#contato`).
  - Textos alinhados a `CONTENT.md`, sem clichês e com rotulagem clara de demonstração conceitual.
- **Critério de conclusão:** Todas as âncoras internas funcionando e hierarquia de títulos semântica (`h1`–`h3`).

### Etapa 4 — Sistema Visual CSS (`styles.css`)
- **Entregas:**
  - CSS nativo estruturado por variáveis (tokens de cor mineral, terracota e tipografia).
  - Eliminação da repetição de caixas cinzas; uso de divisórias sutis e ritmo editorial assimétrico.
  - Responsividade a partir de `320px` e conformidade com `prefers-reduced-motion`.
- **Critério de conclusão:** Layout limpo e arejado em desktop e mobile, com alto contraste e legibilidade.

### Etapa 5 — Interatividade Enxuta e Verificação Técnica
- **Entregas:**
  - `app.mjs` enxuto: controle do menu móvel acessível (`aria-expanded`, tecla `Escape`).
  - Atualização dos testes automatizados em `tests/construtora.test.mjs` cobrindo a nova estrutura.
  - Verificação de isolamento do repositório (`git status` limpo fora de `projetos/construtora/`).
- **Critério de conclusão:** 100% dos testes passando e servidor local pronto para inspeção.
