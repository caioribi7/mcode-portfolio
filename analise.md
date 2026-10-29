# Análise da landing page MCode

> **Decisão posterior do usuário:** manter o layout de Presença. Com intenção., com a paleta escura padrão, textos claros e verde neon. A recomendação anterior de fundo off-white está superada e não deve ser reaplicada automaticamente.

> **Correções concluídas e verificadas em 28/10/2026.** A avaliação original está preservada abaixo como histórico. O registro ao final detalha as correções, os testes e as exceções mantidas por instrução explícita do usuário. A nota 24/32 pertence à avaliação original; não foi inventada uma nova nota heurística.

**Data:** 28 de outubro de 2026  
**Alvo:** `index.html`, `styles.css` e os scripts da landing  
**Método:** duas avaliações independentes; inspeção do código, detector Impeccable e renderização no navegador em desktop e celular.

## Resumo executivo

A landing tem uma identidade visual reconhecível e um hero forte, com CTA visível no celular. Os projetos conceituais são apresentados com transparência, e o contato explica claramente que o formulário não envia mensagens.

**Nota heurística: 24/32 (75%) — boa.** As heurísticas 7 (flexibilidade/eficiência) e 10 (ajuda/documentação) foram consideradas não aplicáveis a uma landing page. A principal inconsistência é entre a direção documentada — seção do estúdio em off-white — e a implementação, que mantém essa seção escura. Também merece decisão explícita a animação ASCII contínua, que ignora a preferência de movimento reduzido.

## Pontuação heurística

| # | Heurística | Nota | Observação |
|---|---|---:|---|
| 1 | Visibilidade do estado | 3/4 | Briefing, cópia e menu comunicam os estados principais. |
| 2 | Correspondência com o mundo real | 3/4 | A copy é clara; algumas tags em inglês e metáforas de terminal adicionam jargão. |
| 3 | Controle e liberdade | 3/4 | Menu fecha com Escape; detalhes dos projetos podem ser recolhidos. |
| 4 | Consistência e padrões | 3/4 | Linguagem visual coesa; parte da decoração técnica não orienta o visitante. |
| 5 | Prevenção de erros | 3/4 | Campos obrigatórios, limites e validação nativa de email ajudam. |
| 6 | Reconhecimento em vez de memorização | 3/4 | Navegação, CTAs e caráter conceitual dos projetos estão identificados. |
| 7 | Flexibilidade e eficiência | N/A | Pouco aplicável a esta landing. |
| 8 | Estética e minimalismo | 3/4 | Boa hierarquia; textura e movimento podem somar ruído visual. |
| 9 | Recuperação de erros | 3/4 | Em falha de cópia, o texto é selecionado e há instrução de recuperação. |
| 10 | Ajuda e documentação | N/A | Não é uma necessidade central desta superfície. |
| **Total** | | **24/32** | **Bom — 75%.** |

## O que está funcionando

- **Identidade própria:** verde ácido, Anton, símbolo MCode em ASCII, cursor delta e fundo halftone criam um conjunto memorável.
- **CTA acessível cedo:** o botão principal fica visível sem rolagem no celular testado.
- **Transparência do portfólio:** os projetos são identificados como conceituais, sem sugerir clientes ou resultados reais.
- **Contato honesto:** a página explica que o briefing é local e não é enviado; oferece cópia, instrução de fallback e email direto.
- **Fluxo e responsividade:** no viewport de 390 px não houve overflow horizontal; navegação e controles foram encontrados na varredura de acessibilidade.

## Melhorias prioritárias

### P1 — Restaurar o contraste editorial previsto para a seção do estúdio

`PRODUCT.md` e `DESIGN.md` descrevem uma seção editorial off-white para criar uma pausa na sequência escura. No código atual, `.studio` usa `background: var(--bg)`, portanto permanece escura como o restante da página.

**Recomendação:** definir se o fundo claro continua sendo a direção desejada. Se sim, aplicar o tratamento off-white e validar contraste de títulos, corpo, divisores, links e acentos verdes.

### P1 — Dar controle à animação ASCII

O logo ASCII roda continuamente mesmo quando o sistema solicita redução de movimento. Essa reprodução automática é uma decisão de marca registrada no briefing, mas remove o controle de quem prefere menos animação.

**Recomendação:** manter o autoplay, mas oferecer um controle de pausa acessível por teclado e leitor de tela; ou confirmar conscientemente a exceção à preferência de movimento reduzido.

### P2 — Reduzir a fricção do contato

O formulário prepara o texto localmente. Para concluir, a pessoa precisa copiar, abrir o aplicativo de email e colar. A limitação está explicada e há email direto, mas a conclusão não acontece na própria página.

**Recomendação:** destacar a alternativa de email direto e explicar os passos junto ao resultado do briefing. Um fluxo de envio integrado só deve ser adotado com destino verificado, privacidade e estados de sucesso/erro definidos.

### P2 — Simplificar as tags de serviço

Tags como “UI / UX ARCHITECTURE”, “ENGINEERING & SPEED” e “DIGITAL BRAND ASSETS” acrescentam leitura em inglês sem deixar claro o benefício para um visitante novo.

**Recomendação:** traduzir ou remover as tags que não acrescentem informação diferente dos títulos e descrições dos serviços.

## Carga cognitiva e jornada

A carga observada é baixa: o foco, o agrupamento, a hierarquia, a quantidade de opções, a memória necessária e a divulgação progressiva estão bem resolvidos. As ressalvas são os rótulos técnicos em inglês e a etapa manual do briefing.

A jornada começa com impacto visual e ação clara; os projetos conceituais dão contexto, mas oferecem menos prova real que um potencial cliente pode querer; a seção de serviços explica a oferta, porém falta a pausa visual off-white prevista; o contato é transparente, mas exige sair da landing para enviar o email.

## Personas consideradas

- **Jordan — visitante de primeira vez:** pode não saber o que “briefing” significa e pode esperar que o formulário envie a mensagem.
- **Riley — avaliando o portfólio:** entende que os projetos são conceitos, mas pode esperar demos navegáveis em vez de detalhes expansíveis.
- **Casey — visitante mobile ou com tecnologia assistiva:** não houve overflow em 390 px e os controles estavam nomeados; a animação contínua é o ponto mais importante a revisar com preferência de movimento reduzido.

## Detector e inspeção do navegador

- **Varredura estática:** 11 avisos: `cramped-padding` ×4, `undersized-ui-text` ×3, `overused-font` ×2, `marquee` ×1 e `dark-glow` ×1. Os matches repetidos de `.project-art` podem ser duplicados; os textos pequenos têm 10 px, embora sejam decorativos.
- **Varredura renderizada:** 4 avisos em desktop (1280×800) e 5 em mobile (390×844). Incluem textos pequenos, proporção de Geist Mono, um kicker e `nested cards` no aviso do formulário; os últimos precisam de contexto visual antes de serem tratados como defeitos.
- **Limitações:** não foram coletados logs do console nem status HTTP individual de cada recurso. Um overlay JavaScript de teste foi inserido, mas não foi confirmado que o overlay oficial do Impeccable estivesse exibindo os achados.
- **Título no browser:** apareceu uma vez com emoji de cavalo, mas isso não foi encontrado no HTML nem nos arquivos visíveis do repositório; não foi confirmado como problema da landing.

## Decisões em aberto

1. A seção do estúdio deve voltar ao off-white documentado ou o fundo escuro é intencional?
2. O logo ASCII deve ter pausa acessível, mantendo autoplay como padrão, ou continuar sem controle de pausa?
3. O briefing permanece local com cópia manual ou um fluxo de envio direto entra no escopo?

## Registro da avaliação

Relatório técnico detalhado: `.impeccable/critique/2026-10-28T23-04-52Z__index-html.md`  
Tendência registrada: **22/32 → 24/32** (mesmo conjunto de heurísticas; pontuações são estimativas de revisão, não métricas de teste com usuários).

## Correções aplicadas e verificação final — 28/10/2026

### Encaminhamento de todos os apontamentos

| Apontamento | Tratamento aplicado | Verificação |
|---|---|---|
| P1 — Estúdio sem a pausa editorial clara | Restabelecido o off-white `#F1F5EF`, com texto escuro, verde profundo `#254A17`, divisores e foco apropriados à superfície clara. Manifesto e serviços foram abertos, sem caixas e brilhos competindo entre si. | Fundo calculado confirmado no navegador, revisão visual em desktop/mobile e nenhuma violação nos critérios automatizados de acessibilidade avaliados. |
| P1 — ASCII sem pausa | Mantida a exceção já solicitada explicitamente pelo usuário nesta conversa: autoplay contínuo, sem botão de pausa. O relatório admite documentar conscientemente essa alternativa. Não foi apresentado como correção de acessibilidade ou conformidade integral. | Testes confirmam início automático e continuidade mesmo com movimento reduzido. A exceção está registrada em `PRODUCT.md` e `DESIGN.md`. |
| P2 — Fricção do contato | O CTA inicial virou “Contar minha ideia”; o formulário prepara um “resumo”, sem exigir entendimento de “briefing”. O resultado destaca “Abrir meu e-mail”, com destinatário, assunto e texto preenchidos via `mailto:`. O e-mail direto permanece visível e funciona sem JavaScript. | Testes do endereço, codificação de acentos, quebras de linha e caracteres especiais; comparação do corpo do e-mail com o resumo mostrado. |
| Textos longos e falha do aplicativo | O orçamento conservador interno de 1800 caracteres para o link de composição evita URLs excessivas. Quando ultrapassado, o endereço abre sem corpo e a página orienta a cópia manual. O texto completo permanece disponível, sem truncamento. Copiar continua funcionando como alternativa. | Testes de resumo longo, cópia bem-sucedida, recusa de clipboard e instrução de recuperação. |
| P2 — Tags de serviço em inglês | Removidos os três subtítulos técnicos, números decorativos, chips repetidos, selo de geometria e status/kicker redundantes. Permanecem os três títulos e suas descrições em português. | Inspeção do HTML e do resultado renderizado. O inglês dentro das artes conceituais pertence às marcas fictícias, não às instruções da interface. |
| Textos pequenos | Textos decorativos que usavam 10–11 px passaram a 12 px; rótulos e avisos funcionais usam 13–16 px conforme sua função. Informações de projeto e mensagens do formulário passaram à fonte de leitura. | Nenhum aviso de texto pequeno nas duas varreduras renderizadas. |
| Padding e recortes | Serviços agora têm respiro vertical e não dependem de caixas aninhadas. Legendas das artes têm espaço reservado; a tipografia de Pulse foi ajustada no celular. | Dez larguras, incluindo 320 px, sem overflow. Os avisos estáticos de padding no ticker/estúdio não se reproduziram no detector renderizado: a faixa recorta intencionalmente e o estúdio tem gutter calculado. |
| Glow e ruído visual | Removidas sombras verdes dos controles e dos módulos. Foram retirados badges redundantes da vitrine e da seção de serviços. | Nenhum aviso renderizado de `dark-glow`, kicker ou chips de serviços. |
| Aviso do formulário em caixa aninhada | O aviso virou um parágrafo direto, sem fundo, moldura ou ícone de terminal. Continua associado ao formulário por `aria-describedby`. | Nenhum aviso renderizado de `nested cards`. |
| Nomes e semântica | Grupos de detalhes e serviços receberam papel de grupo; removido o nome acessível redundante de um wrapper genérico do canvas. Links dos projetos dizem que abrem detalhes do conceito. | O aviso manual de atributos ARIA desapareceu do axe; apenas texto contornado exige revisão humana de contraste. |
| Console e recursos não verificados | Foram coletadas respostas HTTP, falhas de rede e mensagens do console em um navegador de testes isolado. | 29 respostas HTTP observadas, todas 200; nenhuma falha de rede, exceção ou mensagem de console. As duas fotos carregaram com dimensões naturais válidas. |
| Título com emoji | Comparado `document.title` ao título do HTML. Nenhum emoji foi encontrado no título servido ou no navegador isolado. | A discrepância antiga não foi reproduzida; não houve alteração especulativa no título. |
| Expectativa de demos navegáveis | Os links dizem “Ver detalhes do conceito” e abrem o `details` correspondente, com foco no `summary`. Não prometem um site de cliente ou uma demo externa inexistente. | Navegação por teclado, abertura do detalhe e foco verificados no navegador. |

### Escolhas preservadas e limites explícitos

- **Autoplay ASCII:** a preferência expressa anteriormente foi “nunca parar” e não mostrar botão de pausa. Isso foi preservado. Portanto, não se afirma conformidade integral com requisitos de controle de movimento.
- **Fontes e faixa:** Space Grotesk/Geist Mono e a faixa animada foram escolhas solicitadas com base nas referências do usuário. O detector ainda produz `overused-font` e `marquee` em desktop e celular. São decisões visuais registradas, não avisos escondidos ou falsamente declarados como eliminados. A faixa mantém sua alternativa estática sob movimento reduzido.
- **Contato:** o site prepara a mensagem, não a envia. O visitante precisa revisar e enviar pelo aplicativo; entrega e configuração do cliente de e-mail não foram simuladas como sucesso. Não foi adicionado backend, endpoint fictício, analytics ou serviço externo de formulário.
- **Prova real de trabalho:** os projetos continuam conceituais. Não foram fabricados clientes, métricas, especialidades ou depoimentos para preencher essa lacuna.

### Nova seção solicitada durante a correção

Adicionado o link **Nossos devs** à navegação e a seção **Conheça nossos devs**, entre estúdio e contato:

- **Mateus Dias:** `devs/dev-1.jpg` e GitHub `https://github.com/root-mwteus`.
- **Caio Ribi:** `devs/dev-2.jpg` e GitHub `https://github.com/caioribi7`.

Nomes, associação das fotos e logins foram confirmados pelo usuário. As fotos têm dimensões declaradas, `loading="lazy"`, enquadramento em retrato e textos alternativos. Os botões GitHub identificam o perfil e avisam a abertura em nova aba. Nenhuma biografia ou especialidade foi presumida.

### Evidência final

- **25 testes automatizados aprovados** com `node --test`.
- Build local por lista explícita: **26 arquivos**, incluindo as duas fotos; análise, documentos, credenciais e ferramentas temporárias permanecem fora do pacote público.
- Layouts: **1920, 1440, 1280, 1101, 1024, 844 em paisagem, 768, 720, 390 e 320 px**, sem overflow horizontal.
- Detector renderizado no alvo correto em **1280×800** e **390×844**: apenas os dois avisos de escolhas visuais descritos acima. Sem avisos renderizados de texto pequeno, padding, kicker, glow ou caixa aninhada.
- Axe em desktop e celular: **nenhuma violação nos critérios automatizados avaliados**. Contornos tipográficos continuam exigindo revisão manual de contraste; isto não substitui testes completos com leitor de tela ou dispositivo físico.
- Lighthouse mobile no build local final: **100 em desempenho, acessibilidade, boas práticas e SEO**; FCP/LCP **1,1 s**, CLS **0,005**, TBT **0 ms**. São medidas de laboratório, não Core Web Vitals de visitantes nem comprovação de infraestrutura de produção. O relatório ainda sugere otimizações de minificação/cache/compressão, próprias da preparação de hospedagem.
- Foram exercitados menu por Enter/Espaço/Escape, foco dos projetos, campos inválidos, resumo com caracteres especiais, texto longo, cópia bem-sucedida e recusada, movimento reduzido, toque e ausência de JavaScript. Nenhum POST ou envio automático foi realizado.
- Relatórios e capturas locais: `tmp/review/`, incluindo `network-console.json`, `detector-1280.json`, `detector-390.json`, `accessibility*.json`, `lighthouse.json`, `studio-desktop.png`, `devs-desktop.png` e `contact-result.png`.


Atualização posterior por solicitação do usuário: o formulário foi substituído por canais de contato. E-mail ativo; WhatsApp e Instagram aguardam dados oficiais, sem links fictícios. Os registros de testes do formulário acima são históricos. O pacote atual tem 26 arquivos.
