# Roadmap — MCode v1.0

## Objetivo

Publicar um portfólio comercial seguro, acessível e operacional, preservando HTML, CSS e JavaScript modular nativos, sem framework, gerenciador de pacotes no front-end ou compilação obrigatória.

Arquitetura escolhida:

- Cloudflare Pages para hospedagem estática.
- Formspree para processamento do formulário.
- GitHub Actions para integração contínua.
- Node.js nativo para os testes existentes.

Este documento descreve trabalho planejado. Não comprova implantação nem segurança da aplicação publicada.

## Como acompanhar

- Marcar uma tarefa somente após sua execução e verificação.
- Registrar evidências no PR correspondente: URL, resultado de teste, captura ou descrição reproduzível da revisão.
- Considerar um passo concluído somente quando seu critério de saída estiver atendido.
- Preparar tarefas locais independentes de passos seguintes enquanto decisões comerciais estiverem pendentes, conforme o adiamento solicitado pelos responsáveis. Isso não conclui passos anteriores nem libera publicação comercial.
- Registrar bloqueios externos sem tratá-los como tarefas concluídas.
- Usar [DEFINITION-OF-DONE.md](DEFINITION-OF-DONE.md) como autoridade para o lançamento.
- Submeter alterações de escopo à aprovação dos dois responsáveis.

## Visão geral da revisão — 27/10/2026

| Passo | Estado verificado | Próxima ação |
|---|---|---|
| 1. Escopo Comercial | Parcial: pseudônimos registrados, conceitos identificados, imagem substituída e prévia documentada. | Manter decisões comerciais pendentes até os responsáveis defini-las. |
| 2. Publicação Estática no Cloudflare Pages | Pacote local em `dist/` por lista explícita, testes de publicação e `404.html` preparados. Nenhum deploy configurado. | Configurar e verificar a hospedagem quando as contas e o domínio forem definidos. |
| 3. Headers de Segurança/CSP | Política documentada; nenhum arquivo de configuração de headers implementado. | Preparar configuração local e validar respostas na hospedagem quando disponível. |
| 4. Contato Funcional via Formspree | Briefing local protegido por fieldset desativado até inicialização; destinatário e endpoint ainda não definidos. | Integrar o serviço quando houver destino real, preservando tratamento de erro e privacidade. |
| 5. CI/CD com GitHub Actions | Testes nativos existentes; nenhum workflow implementado. | Criar workflow após definir o pacote público; proteção de branch e deploy exigem verificação no GitHub/provedor. |
| 6. Otimizações Finais | Arte Frame em SVG de 1.141 bytes; fontes ainda em TTF. | Preservar SVG, otimizar fontes e realizar revisão visual e medições. |

Entrega técnica local concluída: `node scripts/prepare-site.mjs` prepara `dist/` com 16 arquivos, sem documentação ou originais completos da identidade. Inclui página 404 e licenças das fontes. Os testes verificam a lista de publicação e suas dependências. Próxima entrega técnica: preparar headers e CI. Conectar contas, contratar serviços e lançar permanecem etapas distintas.

Proteção implementada no modo de briefing local: campos e botões ficam em um fieldset desativado no HTML. O JavaScript registra a prevenção de envio nativo antes dos demais controles e só habilita os campos ao final da inicialização. Testes cobrem falhas no menu e na cópia, além do fluxo local. A revisão em navegadores reais, inclusive sem JavaScript, permanece pendente.

## 1. Escopo Comercial

### Situação em 27/10/2026

Em andamento. Os itens abaixo registram verificações locais; a imagem de flores foi substituída, mas o passo ainda depende das decisões comerciais e da confirmação dos direitos da identidade. Não há aprovação comercial ou autorização de lançamento registrada.

| Decisão | Registro atual | Condição para concluir |
|---|---|---|
| Responsáveis e funções | Pseudônimos públicos informados: **mwteus** e **caioribi7**. Funções pendentes. | Definir a função de cada profissional e aprovar a apresentação. |
| Apresentação e público | Pendente | Aprovar texto real da MCode e público que pretende atender. |
| Serviços | A página contém design de interfaces, desenvolvimento web e identidade digital como exemplos ilustrativos. | Confirmar quais serviços a equipe consegue oferecer e aprovar os textos. |
| Projetos | Órbita, Frame e Pulse são conceitos explicitamente identificados. | Preservar essa identificação enquanto forem demonstrações. |
| Contato | Nenhum endereço oficial ou responsável pela caixa confirmado. | Definir e-mail público e responsável pelo atendimento. Não registrar senhas ou tokens. |
| Orçamento | Pendente | Definir teto mensal e responsável pelos pagamentos; registrar separadamente o custo anual do domínio. |
| Imagem de Frame | Substituída por `assets/frame-composition.svg`, composição geométrica escrita em SVG com assistência do Codex. | Origem registrada em assets/README.md; reconferir a referência e a apresentação no commit de lançamento. |
| Aprovação do MVP | Checklist preparado, sem aprovação dos dois responsáveis registrada. | Registrar nomes e referência da aprovação de ambos. |

Decisões informadas em 27/10/2026: usar os pseudônimos **mwteus** e **caioribi7** e substituir a imagem de flores. Funções, apresentação, público, serviços, contato e orçamento serão definidos posteriormente. O adiamento não conclui esses itens nem altera os requisitos de lançamento.

### Evidências locais

- [Página atual](../../index.html): rótulo de projetos conceituais, descrições de Órbita, Frame e Pulse e aviso de apresentação/serviços ilustrativos.
- [README](../../README.md): prévia executada a partir da raiz com `python -m http.server 4173 --bind 127.0.0.1`, sem caminho absoluto de outro computador.
- Identidade: `git diff --name-only 0e9718b -- MCode-Identidade-Visual/` não apresentou alterações em relação ao commit inicial na revisão de 27/10/2026. Essa comparação demonstra preservação dos arquivos, não comprova titularidade ou autorização de uso.

### Inventário inicial de assets

| Asset | Evidência disponível | Pendência |
|---|---|---|
| Identidade MCode | [Documentação fornecida](../../MCode-Identidade-Visual/IDENTIDADE-VISUAL.md) e arquivos originais preservados. | Confirmar titularidade/autorização de uso comercial com os responsáveis. |
| Anton | [Licença local](../../assets/fonts/OFL-Anton.txt), SIL OFL 1.1, com identificação dos autores e repositório de origem. | Preservar licença na futura publicação e nas versões convertidas. |
| Barlow | [Licença local](../../assets/fonts/OFL-Barlow.txt), SIL OFL 1.1, com identificação dos autores e repositório de origem. | Preservar licença na futura publicação e nas versões convertidas. |
| Composição de Frame | [SVG local](../../assets/frame-composition.svg), criado em código nesta alteração, sem recursos externos; [registro de origem](../../assets/README.md). | Fotografia anterior removida da árvore atual. Conferir a apresentação visual antes do lançamento. |

O inventário é inicial: não marca como concluída a tarefa de registrar origem e condições de uso de todos os assets. As referências das licenças foram lidas nos arquivos locais; não houve validação externa de proveniência nesta revisão.

### Tarefas

- [ ] Aprovar a apresentação real da MCode e dos responsáveis.
- [ ] Aprovar somente serviços que a equipe consegue oferecer.
- [x] Manter Órbita, Frame e Pulse identificados como conceitos.
- [ ] Remover alegações, resultados e depoimentos sem comprovação.
- [x] Substituir `assets/artwork.jpg` por asset com origem e condições de uso registradas, atualizando referências, texto alternativo e atribuição na página e na documentação.
- [ ] Registrar a origem e as condições de uso dos assets publicados.
- [x] Preservar os arquivos originais da identidade visual.
- [ ] Definir endereço oficial de contato e responsável pela caixa.
- [ ] Definir orçamento mensal máximo para domínio e serviços.
- [ ] Aprovar DEFINITION-OF-DONE.md entre os dois responsáveis.
- [x] Corrigir a prévia no README para execução a partir da raiz: `python -m http.server 4173 --bind 127.0.0.1`.

### Critério de saída

Conteúdo comercial aprovado pelos dois, contato definido, direitos dos assets resolvidos e escopo da v1.0 congelado.

## 2. Publicação Estática no Cloudflare Pages

### Tarefas

- [x] Delimitar o diretório público `dist/`, contendo somente arquivos necessários ao site e licenças aplicáveis.
- [x] Adaptar testes e documentar a prévia do pacote, preservando caminhos relativos e fontes na raiz.
- [x] Preservar os originais da identidade fora do diretório público; copiar apenas os assets utilizados.
- [x] Excluir do pacote público testes, documentação interna, arquivos locais e histórico Git por lista explícita; a revisão de segredos no conteúdo continua necessária antes do lançamento.
- [ ] Configurar Cloudflare Pages para servir o diretório público.
- [x] Preparar o pacote sem compilação do front-end.
- [ ] Criar ambiente de prévia para revisão.
- [ ] Configurar domínio próprio e HTTPS.
- [ ] Escolher endereço canônico e redirecionar as variantes para ele.
- [x] Criar página 404 e incluir seus assets no pacote.
- [ ] Verificar resposta HTTP 404 e apresentação da página personalizada no provedor.
- [ ] Evitar indexação das prévias; usar controle de acesso quando houver conteúdo que precise permanecer privado.
- [ ] Documentar e testar o procedimento de rollback.

Uma cópia de arquivos por lista explícita no deploy é permitida. Isso não exige bundler ou transformação do código.

`.gitignore` não substitui a definição do pacote público.

### Critério de saída

Prévia acessível por HTTPS, pacote público conferido, domínio configurado, 404 funcionando e retorno à versão anterior demonstrado.

Até o passo 5, qualquer publicação de produção exige execução manual dos checks e revisão do parceiro.

## 3. Headers de Segurança/CSP

### Tarefas

- [ ] Criar configuração versionada de headers, conforme [SECURITY.md](SECURITY.md).
- [ ] Testar CSP em modo Report-Only durante a revisão da prévia.
- [ ] Corrigir violações sem ampliar permissões indiscriminadamente.
- [ ] Liberar somente as origens necessárias ao Formspree.
- [ ] Ativar CSP em modo de bloqueio.
- [ ] Configurar X-Content-Type-Options e tipos MIME corretos.
- [ ] Configurar Referrer-Policy e Permissions-Policy.
- [ ] Configurar proteção contra enquadramento.
- [ ] Ativar HSTS após verificar HTTPS.
- [ ] Conferir headers nas respostas HTTP, incluindo erros e redirects conforme aplicável.
- [ ] Confirmar ausência de conteúdo misto.
- [ ] Habilitar MFA e acessos individuais nas contas de infraestrutura.

No Cloudflare Pages, usar `_headers` para respostas estáticas. Se futuramente houver Functions, seus headers devem ser definidos também nas respostas geradas pelo código.

### Critério de saída

Headers confirmados no ambiente publicado, CSP aplicada sem violações inesperadas nos fluxos principais e MFA habilitado.

## 4. Contato Funcional via Formspree

### Tarefas

- [x] Antes da integração, desativar campos no HTML e prevenir submissão nativa antes de habilitá-los; incluir aviso de dependência de JavaScript e testes de falha de inicialização.
- [ ] Conferir a proteção e o aviso do briefing em navegadores reais, com JavaScript desativado ou módulo indisponível.
- [ ] Criar formulário no Formspree e verificar o destinatário oficial.
- [ ] Configurar `method="POST"` e `action` com o endpoint HTTPS aprovado.
- [ ] Garantir envio HTML básico sem dependência de JavaScript.
- [ ] Manter JavaScript como melhoria da experiência.
- [ ] Configurar validação, limites e antispam no serviço.
- [ ] Conferir limites, retenção e condições do plano contratado.
- [ ] Implementar estados acessíveis de processamento, sucesso e erro.
- [ ] Impedir envios simultâneos acidentais pela interface.
- [ ] Preservar os campos quando o envio falhar.
- [ ] Exibir sucesso somente após confirmação positiva do serviço.
- [ ] Publicar endereço oficial como alternativa.
- [ ] Publicar aviso de privacidade conforme SECURITY.md.
- [ ] Testar sem JavaScript, erro de rede, rejeição e envio válido.
- [ ] Confirmar recebimento de uma mensagem na caixa oficial.
- [ ] Atualizar README e textos da interface para o comportamento real.
- [ ] Conferir que nenhum campo aparece na URL.

Até o envio real estar verificado, preservar o aviso de que o briefing não envia mensagens. Se esse modo continuar disponível, mantê-lo claramente separado do envio.

### Critério de saída

Mensagem recebida na caixa oficial, erros tratados sem falso sucesso, antispam habilitado e privacidade documentada.

## 5. CI/CD com GitHub Actions

### Tarefas

- [ ] Criar workflow para pull requests e alterações na `main`.
- [ ] Definir explicitamente uma versão LTS suportada do Node.js.
- [ ] Executar `node --test`.
- [ ] Verificar links locais e arquivos do pacote público.
- [ ] Adaptar testes ao contato real, preservando a identificação honesta dos projetos conceituais.
- [ ] Adicionar testes relevantes para os novos comportamentos.
- [ ] Usar permissões mínimas no workflow.
- [ ] Fixar actions de terceiros por SHA completo.
- [ ] Impedir acesso de PRs não confiáveis a segredos de publicação.
- [ ] Exigir checks aprovados e revisão do parceiro antes do merge.
- [ ] Condicionar a publicação de produção aos checks obrigatórios.
- [ ] Impedir deploy direto que contorne o fluxo aprovado.
- [ ] Verificar HTTPS, página principal, assets e headers após o deploy.
- [ ] Ensaiar rollback e registrar o procedimento no README.

Executar testes em paralelo com um deploy automático não é um bloqueio. A configuração deve impedir que uma revisão reprovada seja publicada.

### Critério de saída

Um PR com teste falhando não pode ser integrado pelo fluxo normal nem publicado em produção. Um commit aprovado pode ser publicado e revertido por procedimento documentado.

## 6. Otimizações Finais

### Tarefas

- [ ] Converter fontes utilizadas para WOFF2, preservando caracteres portugueses e licenças.
- [x] Manter a composição de Frame em SVG leve, sem recursos externos; não converter a arte vetorial para WebP/AVIF.
- [ ] Atualizar dimensões e textos alternativos quando necessário.
- [ ] Confirmar compressão HTTP.
- [ ] Usar revalidação para HTML e arquivos sem versão.
- [ ] Reservar cache longo com `immutable` para URLs versionadas.
- [ ] Testar a animação em celular físico.
- [ ] Validar pausa, movimento reduzido e suspensão fora de tela.
- [ ] Revisar teclado, foco, contraste, zoom e mensagens de erro.
- [ ] Testar Chrome, Firefox e Safari, incluindo Android e iPhone.
- [ ] Revisar título, descrição, canonical e prévia de compartilhamento.
- [ ] Executar três medições Lighthouse Mobile e registrar a mediana.
- [ ] Ativar monitor de disponibilidade e alertas de consumo/custo disponíveis nos serviços.
- [ ] Executar integralmente DEFINITION-OF-DONE.md.

### Critério de saída

Todos os itens da definição de pronto aprovados pelos dois responsáveis. Criar a tag `v1.0.0`, publicar e cumprir a Regra de Parada.

Minificação, automação de navegador e novas ferramentas só entram antes do lançamento se forem necessárias para satisfazer um requisito aprovado.

Se novas fotografias ou outras imagens raster forem introduzidas, avaliar WebP/AVIF e fallback adequado. Não há fotografia em uso na página atual que exija essa conversão.
