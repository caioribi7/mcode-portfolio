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
- Avançar quando o critério de saída do passo estiver atendido.
- Registrar bloqueios externos sem tratá-los como tarefas concluídas.
- Usar [DEFINITION-OF-DONE.md](DEFINITION-OF-DONE.md) como autoridade para o lançamento.
- Submeter alterações de escopo à aprovação dos dois responsáveis.

## 1. Escopo Comercial

### Tarefas

- [ ] Aprovar a apresentação real da MCode e dos responsáveis.
- [ ] Aprovar somente serviços que a equipe consegue oferecer.
- [ ] Manter Órbita, Frame e Pulse identificados como conceitos.
- [ ] Remover alegações, resultados e depoimentos sem comprovação.
- [ ] Verificar origem, licença e adequação de `assets/artwork.jpg`, ou substituir a imagem.
- [ ] Registrar a origem e as condições de uso dos assets publicados.
- [ ] Preservar os arquivos originais da identidade visual.
- [ ] Definir endereço oficial de contato e responsável pela caixa.
- [ ] Definir orçamento mensal máximo para domínio e serviços.
- [ ] Aprovar DEFINITION-OF-DONE.md entre os dois responsáveis.
- [ ] Corrigir a prévia no README para execução a partir da raiz: `python -m http.server 4173 --bind 127.0.0.1`.

### Critério de saída

Conteúdo comercial aprovado pelos dois, contato definido, direitos dos assets resolvidos e escopo da v1.0 congelado.

## 2. Publicação Estática no Cloudflare Pages

### Tarefas

- [ ] Delimitar um diretório público, como `public/`, contendo somente arquivos necessários ao site e licenças aplicáveis.
- [ ] Ajustar caminhos e testes caso arquivos sejam reorganizados.
- [ ] Preservar os originais da identidade fora do diretório público; publicar apenas cópias dos assets utilizados.
- [ ] Excluir do pacote público testes, documentação interna, arquivos locais, credenciais e histórico Git.
- [ ] Configurar Cloudflare Pages para servir o diretório público.
- [ ] Manter a publicação sem compilação do front-end.
- [ ] Criar ambiente de prévia para revisão.
- [ ] Configurar domínio próprio e HTTPS.
- [ ] Escolher endereço canônico e redirecionar as variantes para ele.
- [ ] Criar página 404 e verificar resposta HTTP 404.
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
- [ ] Otimizar a imagem com WebP/AVIF e alternativa adequada.
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
