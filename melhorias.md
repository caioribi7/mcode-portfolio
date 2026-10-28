# Melhorias — landing page MCode

Atualizado em 28/10/2026 após a implementação e revisão local. Os itens abertos exigem informações reais, decisões de negócio ou acesso à hospedagem; o restante foi aplicado e verificado no escopo indicado abaixo.

## Prioridade 1 — Conversão e confiança

- [x] **Oferecer contato real.** E-mail confirmado pelo usuário: mcode.contato@gmail.com. Há link direto independente de JavaScript e opção de abrir o e-mail após copiar o briefing. O site não envia mensagens nem confirma entrega; o visitante envia pelo próprio aplicativo.
- [x] **Revisar as chamadas para ação.** Navegação: “Falar com a MCode”; hero: “Falar sobre meu projeto”; formulário: “Preparar meu briefing”. Os rótulos distinguem contato, preparação, cópia e abertura do aplicativo de e-mail.
- [x] **Retirar alegações não verificadas.** Removidos disponibilidade para projetos, badges de diferenciais e a contagem fictícia do projeto Órbita.
- [ ] **Substituir conceitos por cases reais.** Faltam trabalhos autorizados, contexto do cliente, papel da MCode e resultados verificáveis. Os três projetos continuam explicitamente conceituais.
- [ ] **Validar informações institucionais e serviços.** A localização e o relógio foram removidos. O e-mail foi confirmado; público, escopo comercial dos serviços e identificação institucional completa continuam sem validação. A indicação de serviços ilustrativos permanece.

## Prioridade 2 — Hierarquia e conteúdo

- [x] **Enxugar o primeiro viewport.** Removidos barra de status, dock de competências, faixa de serviços repetida e lista de diferenciais. No desktop, mensagem e ações ficam ao lado do terminal; no celular, aparecem antes dele.
- [x] **Reduzir mensagens repetidas.** Hero com uma frase de valor; badges e parágrafo introdutório redundantes removidos. A estrutura principal da copy foi preservada.
- [x] **Remover o widget flutuante.** Excluídos markup, script e estilos, sem sobreposição fixa no canto inferior direito.
- [x] **Identificar os conceitos antes da interação.** Cada card mostra “PROJETO CONCEITUAL”. Os detalhes mantêm o aviso de ausência de vínculo com clientes reais.
- [x] **Simplificar o vocabulário.** Moldura do logo convertida em terminal; retirados códigos decorativos de renderização, seções numeradas e alegação de “privacidade total”. O rodapé não apresenta a arquitetura técnica.
- [ ] **Validar posicionamento comercial com a marca.** A mensagem existente “Sua marca. Com presença.” foi mantida. Sua adequação ao perfil de cliente exige uma decisão dos responsáveis, sem ser presumida pelo código.
- [x] **Conferir copy e HTML.** Mantida a proposta de `copy.md` com os ajustes desta solicitação: hero mais curto, títulos mais leves e contato por e-mail confirmado nesta conversa. `copy.md` permanece como proposta original; o HTML representa a versão atual.

## Prioridade 3 — Acessibilidade e comportamento

- [ ] **Concluir auditoria WCAG prática.** Axe em desktop e celular: nenhuma violação nos critérios automatizados WCAG 2 A/AA e 2.1 A/AA avaliados. Teclado, reflow, foco e estados foram verificados. Ainda faltam leitor de tela real, zoom nativo a 200% e conferência humana completa. Axe pede revisão manual de texto contornado/contraste e alguns atributos. O modo de movimento reduzido foi validado; a ausência de botão de pausa é uma escolha explícita do usuário, não uma declaração de conformidade integral.
- [x] **Verificar menu móvel com teclado.** Enter e Espaço abrem; Escape fecha e restaura o foco; links e mudança de largura fecham o menu. O botão nativo mantém `aria-expanded` sincronizado.
- [x] **Cobrir movimento reduzido.** Logo estático, faixa parada com um único grupo legível e cursor nativo. As mudanças da preferência em tempo real são atendidas. Não há botão de pausa no logo, conforme solicitado.
- [x] **Testar formulário.** Validação nativa de obrigatoriedade e e-mail, limites dos campos, conteúdo com caracteres especiais como texto, briefing local, fallback de clipboard e estado sem JavaScript. Nenhum POST foi emitido. O e-mail direto continua disponível sem JavaScript.
- [x] **Rever semântica e foco.** Projetos abrem o `details` correspondente, atualizam o fragmento e focam o `summary`. Corrigida a divergência entre nomes acessíveis e texto dos cards. Campos têm rótulos persistentes; resultado e falha de cópia são anunciados.
- [x] **Verificar toque e sobreposições.** Menu e ações permanecem acessíveis em 320 e 390px; cursor decorativo não captura eventos e não é habilitado por toque. Não há widget ou controle de pausa cobrindo conteúdo.

## Prioridade 4 — Responsividade e qualidade visual

- [x] **Revisar larguras representativas.** Layout exercitado em 1920, 1440, 1280, 1024, 844 em paisagem, 768, 720, 390 e 320px, sem overflow horizontal. Capturas completas de desktop e celulares, incluindo movimento reduzido, foram inspecionadas.
- [x] **Priorizar o CTA no celular.** A primeira ação termina aproximadamente a 492px do topo em 390px de largura e a 506px em 320px, antes da animação.
- [x] **Revisar projetos.** Metadados quebram linha; as legendas e imagens mantêm áreas separadas. Altura de Pulse alinhada aos demais cards e tipografia de sua arte reduzida para não colidir com a legenda.
- [x] **Consolidar CSS.** Regras ativas em `styles.css`; eliminados estilos dos elementos removidos e unificados os blocos mobile. `refinements.css` permanece apenas como compatibilidade da página 404 e do manifesto de publicação.
- [x] **Aliviar a tipografia.** Barlow 400 nos títulos, corpo e botões, sem negrito sintético. Georgia em itálico no destaque; Anton limitada às artes conceituais.

## Prioridade 5 — Desempenho, SEO e publicação

- [x] **Eliminar fontes externas.** Google Fonts removido. Barlow/Anton locais; Georgia e Consolas usam fontes instaladas. Nenhuma requisição externa no carregamento da landing durante o teste.
- [x] **Revisar preloads.** Somente Barlow, usada acima da dobra, é pré-carregada.
- [x] **Verificar mídia e animação.** Canvas limitado a 600px internos e 30fps, suspenso fora da tela e em aba oculta. Cursor usa interpolação fluida e encerra seu loop ao estabilizar. SVG aparece quando JavaScript ou Canvas 2D não renderizam. O teste local não equivale a medição de bateria em celular físico.
- [x] **Medir desempenho e acessibilidade.** Lighthouse mobile no `dist` local: desempenho 100, acessibilidade 100, boas práticas 100 e SEO 100. FCP/LCP de 1,1s, CLS 0 e TBT 0ms. São resultados de laboratório; INP e Core Web Vitals de visitantes reais dependem da publicação. Oportunidades residuais: minificação, compressão e cache na hospedagem; não foi criada uma etapa de build ou dependência de produção só para pontuação.
- [ ] **Concluir SEO e compartilhamento.** Title/description revisados; Open Graph, Twitter card, imagem JPG 1200 × 630, ícone e `robots.txt` preparados. Canonical, `og:url`, URLs absolutas das imagens e sitemap aguardam o domínio definitivo, ainda não definido pelo usuário.
- [ ] **Adicionar análise de conversão com privacidade.** Nenhum serviço de analytics foi escolhido. Definir ferramenta, finalidade, política e consentimento antes da integração. Um clique em `mailto:` não comprova entrega e não deve ser contado como contato concluído.
- [ ] **Validar produção hospedada.** Build por lista explícita contém 19 arquivos; testes garantem que documentos, screenshots, credenciais locais e auditorias ficam fora. Prévia Node com `--production` serve somente `dist`, usa MIME correto, retorna a 404 com status real, rejeita URLs inválidas/traversal e escuta apenas no loopback. HTTPS, cache, compressão e headers precisam ser configurados e verificados no provedor real. Não houve deploy.

## Verificação e reprodução

- `node --test`: 16 testes aprovados, incluindo formulário, cursor, geometria, faixa, pacote público e servidor de prévia.
- `node scripts/prepare-site.mjs`: gera `dist/` por lista explícita, sem compilar ou publicar o repositório.
- `npm run preview`: serve o pacote em `http://localhost:3000` depois do build, com página 404 e tipos MIME corretos.
- Relatórios locais, screenshots e ferramentas transitórias: `tmp/review/` e `tmp/audit/`, ignorados pelo Git. Nenhuma dependência foi adicionada ao `package.json` da landing.

## Pendências que exigem dados ou decisões externas

Domínio e hospedagem definitivos; cases reais autorizados; validação dos serviços e do público; ferramenta e política de analytics; auditoria manual com leitor de tela e zoom nativo. O contato por e-mail está configurado, mas a entrega depende do aplicativo do visitante e não foi simulada como sucesso.
