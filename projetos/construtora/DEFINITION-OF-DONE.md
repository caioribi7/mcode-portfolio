# DEFINITION OF DONE — Landing Page Demonstrativa (Direção A: Composição Aberta)

> **Status do documento:** Planejamento aprovado — Checklist de validação da Direção A.

## 1. Escopo Incluído

- Uma única landing page responsiva (`index.html`, `styles.css`, `app.mjs`) em `projetos/construtora/`.
- Marca fictícia (**Vértice Engenharia & Obra**) claramente identificada como demonstração conceitual da **MCode**.
- Composição assimétrica aberta no Hero (`#inicio`), lista de frentes sem cartões fechados (`#atuacao`), tipologias contínuas (`#tipologias`), método em 4 etapas lineares (`#metodo`), comparativo de rigor (`#rigor`) e contato demonstrativo simples (`#contato`).
- Interações acessíveis (menu móvel com `aria-expanded` e tecla `Escape`; navegação por âncoras com indicador de foco visível).
- Documentação alinhada e coerente com o código entregue (`PRODUCT.md`, `DESIGN.md`, `CONTENT.md`, `ROADMAP.md`, `DEFINITION-OF-DONE.md`, `ASSETS.md`, `README.md`).

## 2. Escopo Excluído

- Login, cadastro, dashboard ou área de clientes.
- Sistema de gestão de obras ou acompanhamento online.
- Simuladores complexos de cálculo ou "Mapeadores de Riscos".
- Banco de dados, backend, CMS ou formulários com envio externo de dados.
- Páginas secundárias de empreendimentos ou catálogo multipágina.
- Alteração em qualquer arquivo do portfólio principal da MCode na raiz.

## 3. Checklist de Conclusão

### Honestidade e Conteúdo
- [x] A página exibe no topo identificação clara de que se trata de uma demonstração conceitual da MCode.
- [x] Não há depoimentos, clientes, prêmios, anos de atuação, número de obras ou dados financeiros inventados.
- [x] As peças visuais arquitetônicas estão rotuladas explicitamente como referências ilustrativas.
- [x] Não há números de telefone, e-mails ou formulários falsos simulando envio.
- [x] Todos os assets (fontes locais e ilustrações) têm origem e licença documentadas em `ASSETS.md`.

### Qualidade Visual e Arquitetura de Informação
- [x] Hero com composição assimétrica equilibrada e escala tipográfica nítida, sem parecer um template genérico.
- [x] Seção de frentes de atuação estruturada em lista aberta com divisórias sutis, sem cartões simétricos repetitivos.
- [x] Tipologias apresentadas com imagens de escala ampla e leitura contínua, sem abas artificiais que ocultam conteúdo.
- [x] Método executivo organizado em 4 etapas sequenciais de leitura linear.
- [x] Seção de contato demonstrativo simples, clara e sem barreiras desnecessárias.
- [x] Eliminação de 60%+ do ruído de micro-etiquetas em monoespaçada (`PRANCHA XX`, `PILAR X`, etc.).

### Acessibilidade e Engenharia Front-end
- [x] Layout perfeitamente utilizável a partir de `320px`, sem rolagem horizontal indevida.
- [x] Navegação por teclado funcional em todos os links e controles, com foco visível nítido.
- [x] Contraste em conformidade com WCAG AA em todas as seções.
- [x] Respeito a `prefers-reduced-motion: reduce`.
- [x] Conteúdo integralmente legível e funcional mesmo com JavaScript desabilitado.
- [x] Testes automatizados (`node --test`) cobrindo âncoras internas, assets locais e ausência de links falsos.
- [x] Zero arquivos da MCode modificados fora de `projetos/construtora/`.

## 4. Regra de Parada

Assim que todos os itens do checklist forem atendidos e validados pelos testes, a implementação estará concluída e pronta para apresentação, sem adições de última hora.
