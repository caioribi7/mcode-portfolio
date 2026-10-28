# Melhorias possíveis — landing page MCode

Avaliação do código atual da landing, após a atualização de 28/10/2026. As sugestões estão organizadas por impacto; itens que dependem de decisões ou informações reais da MCode estão marcados como pendentes de validação.

## Prioridade 1 — Conversão e confiança

- [ ] **Oferecer um próximo passo de contato real.** Hoje o formulário apenas monta um briefing para copiar; não envia a ninguém, e a página informa que o canal oficial ainda será disponibilizado. Antes de promover a landing comercialmente, definir e implementar um destino funcional: e-mail, WhatsApp, agenda ou backend seguro. Até lá, deixar essa limitação visível junto ao CTA, sem sugerir que o briefing foi enviado.
- [ ] **Revisar as chamadas para ação.** “Preparar meu briefing” é coerente com o formulário atual, mas pode frustrar quem espera falar com o estúdio. Alinhar rótulo, microcopy e ação ao canal que realmente existir.
- [ ] **Validar alegações de disponibilidade e diferenciais.** Confirmar “Disponível p/ projetos”, “Feito sob medida”, “Sem templates genéricos” e “Foco em percepção e valor” antes de publicar. Remover ou ajustar qualquer afirmação que não seja sempre verdadeira.
- [ ] **Transformar a vitrine conceitual em prova de trabalho.** Os projetos estão identificados como conceitos, o que é transparente. Quando houver autorização, substituir ou complementar por cases reais com contexto, problema, papel da MCode, decisões e resultado verificável. Não atribuir métricas sem evidência.
- [ ] **Conferir informações institucionais.** Validar endereço/base “São Paulo, BR”, horário exibido, serviços oferecidos e identificação do estúdio.

## Prioridade 2 — Hierarquia e conteúdo

- [ ] **Enxugar o primeiro viewport.** O hero reúne barra de status, navegação, dock de competências, faixa de serviços, título, render 3D, texto, duas ações e lista de diferenciais. Testar uma versão mais curta, preservando título, uma frase de valor, CTA principal e um elemento visual distintivo.
- [ ] **Reduzir mensagens repetidas.** “Design”, “desenvolvimento”, “identidade”, “experiência” e “personalidade” aparecem em vários componentes próximos. Manter cada promessa uma vez onde ajuda a decisão; remover badges que apenas repetem a faixa ou o texto.
- [ ] **Reavaliar o widget flutuante.** Ele ocupa espaço fixo, repete o status/CTA e pode cobrir conteúdo, especialmente em telas pequenas. Preferir removê-lo ou exibi-lo só após interação/rolagem, sem obstruir formulário, navegação ou controles. Se permanecer, testar teclado, leitores de tela e persistência do fechamento.
- [ ] **Dar mais contexto aos cases.** Garantir que o caráter conceitual esteja claro antes de qualquer interação e manter esse aviso legível nos próprios cards, não só em detalhes expansíveis.
- [ ] **Simplificar o vocabulário de interface.** Revisar termos em inglês e rótulos técnicos decorativos (`HALFTONE-RENDER`, `45° GEOMETRY`, etc.) para confirmar que ajudam o público-alvo e não parecem status funcional fictício.
- [ ] **Validar a nova copy com o posicionamento da marca.** A promessa “Sua marca. Com presença.” é mais explícita que “Fora da caixa”; confirmar se representa a personalidade desejada e se o texto fala com o perfil de cliente que a MCode quer atrair.

## Prioridade 3 — Acessibilidade e comportamento

- [ ] **Fazer auditoria WCAG prática.** Conferir contraste de textos pequenos e estados, foco visível, ordem de tabulação, nomes acessíveis, links/controles, zoom a 200% e uso com leitor de tela.
- [ ] **Verificar o menu móvel com teclado e leitor de tela.** Testar abrir/fechar por Enter/Espaço/Escape, foco após abrir/fechar, fechamento ao navegar e comportamento ao redimensionar.
- [ ] **Garantir que movimento reduzido cubra todos os efeitos.** Há regra `prefers-reduced-motion` em `refinements.css` e tratamento no canvas; confirmar que ticker, widget de entrada, rotação e scroll funcionam sem movimento e que a configuração não deixa conteúdo inacessível.
- [ ] **Testar formulário em estados reais.** Campos inválidos, e-mail malformado, texto longo, falha de clipboard, JavaScript indisponível e retorno de foco/leitura das mensagens. Confirmar que o texto preparado preserva com segurança caracteres e que não há envio de rede não intencional.
- [ ] **Rever semântica de elementos interativos.** Itens clicáveis que apontam para detalhes expansíveis devem ter destino e comportamento previsíveis, abrir o detalhe correspondente e permitir navegação acessível.
- [ ] **Validar áreas de toque e sobreposição no mobile.** Em especial widget, CTA, botão de pausa e menu; verificar telas estreitas e orientação horizontal.

## Prioridade 4 — Responsividade e qualidade visual

- [ ] **Comparar screenshots em larguras representativas.** Desktop largo, laptop, tablet, celular estreito e celular largo. Conferir quebras de título, canvas, cards, faixa animada, formulário e widget; ajustar pontos de quebra conforme o conteúdo, não só por dispositivo.
- [ ] **Revisar o peso do hero em telas pequenas.** O título em escala grande e o canvas podem empurrar a mensagem/CTA para baixo. Medir quantas telas são necessárias até a primeira ação e priorizar o objetivo principal.
- [ ] **Revisar o grid dos projetos.** Confirmar consistência de altura, recorte, contraste e hierarquia dos cards em desktop e mobile; evitar que o card visual domine a informação sobre o projeto.
- [ ] **Consolidar CSS.** `styles.css` cresceu bastante e algumas regras/estilos parecem duplicados entre a folha principal e `refinements.css`. Identificar regras realmente ativas, remover duplicatas e agrupar media queries sem alterar visual por acidente.
- [ ] **Conferir alinhamento entre copy aprovada e HTML.** `copy.md` é uma proposta de copy; verificar que o texto publicado corresponde à versão aprovada e que não sobrou conteúdo experimental ou contraditório.

## Prioridade 5 — Desempenho, SEO e publicação

- [ ] **Reduzir dependência de fontes externas.** Instrument Serif e JetBrains Mono vêm do Google Fonts enquanto Anton/Barlow são locais. Avaliar hospedar localmente os arquivos licenciados, limitar pesos e famílias, manter fallback e testar com rede lenta/offline.
- [ ] **Revisar preloads.** Precarregar só fontes usadas acima da dobra e confirmar nomes, pesos e formatos efetivamente necessários para evitar downloads prioritários inúteis.
- [ ] **Otimizar mídia e animação.** Medir peso das imagens/SVGs e custo do canvas; reduzir custo em dispositivos móveis, respeitar economia de bateria e confirmar fallback se Canvas/JS falhar.
- [ ] **Medir Core Web Vitals e acessibilidade automatizada.** Rodar Lighthouse ou ferramenta equivalente em build de produção; tratar LCP, CLS, INP e problemas encontrados, sem perseguir pontuação às custas da experiência.
- [ ] **Completar SEO e compartilhamento.** Revisar title/description, canonical quando houver domínio definitivo, Open Graph/Twitter cards, ícone, sitemap e robots conforme o modo de publicação. Usar imagem social otimizada e coerente com a marca.
- [ ] **Adicionar análise de conversão com privacidade.** Só depois de definir o canal de contato, medir clique no CTA, início/conclusão do briefing e contato concluído. Configurar consentimento e política de privacidade conforme a ferramenta e a legislação aplicável.
- [ ] **Verificar configuração de produção.** Testar 404, MIME types, cache, HTTPS, caminhos de assets e publicação do diretório `dist`; garantir que arquivos locais, screenshots de referência e briefing não sejam publicados por engano.

## Plano curto recomendado

1. Definir canal de contato real e ajustar CTA/formulário para refletir exatamente o que acontece.
2. Confirmar as alegações de disponibilidade e serviços; remover as não verificadas.
3. Fazer uma variante de hero mais enxuta e comparar em desktop/mobile.
4. Rodar revisão manual de acessibilidade e visual em vários tamanhos.
5. Medir desempenho/SEO do build e corrigir o que impactar visitantes.
6. Trocar os conceitos por cases reais à medida que houver material autorizado.

## Limites desta avaliação

Esta lista é uma revisão do código, copy e estrutura disponíveis no repositório. Não inclui dados de analytics, testes com usuários, auditoria jurídica nem validação de claims com a equipe MCode. Priorizar itens depois de confirmar o público, o canal de contato e o posicionamento comercial.
