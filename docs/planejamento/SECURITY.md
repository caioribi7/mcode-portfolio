# Política de Segurança — MCode

## Status e aplicação

Este documento define os requisitos de segurança do projeto. A existência desta política não significa que os controles já estejam implementados. A verificação é registrada nos PRs e no [checklist de lançamento](DEFINITION-OF-DONE.md).

Escopo: site estático no Cloudflare Pages e formulário processado pelo Formspree.

### Estado atual verificado em 27/10/2026

- Cloudflare Pages e Formspree são a arquitetura planejada; não há configuração de deploy, headers ou endpoint de contato implementada no checkout atual.
- O formulário prepara um briefing local quando `app.mjs` funciona. Não envia mensagens à MCode. Campos e botões começam em um fieldset desativado; um aviso explica a dependência de JavaScript.
- O script registra a prevenção da submissão nativa antes de inicializar os demais controles e só habilita os campos ao terminar. Sem JavaScript ou em caso de falha nessa inicialização, os dados não podem ser preenchidos pelos controles desativados. Testes de Node cobrem falhas de inicialização; verificação em navegadores reais continua pendente.
- Ao integrar o Formspree, usar POST explícito para o endpoint aprovado e restaurar envio HTML básico sem JavaScript. A proteção atual é específica do briefing local, não uma integração de contato.
- `scripts/prepare-site.mjs` delimita a publicação em `dist/` por lista explícita, inclui licenças e recusa links simbólicos e conteúdo inesperado no destino. A exclusão de arquivos locais não detecta segredos escritos no conteúdo de um arquivo público.
- MFA, permissões e políticas das contas ainda precisam de verificação nos serviços; a documentação não comprova sua ativação.

## Princípios

- Manter a superfície de ataque pequena.
- Publicar somente arquivos necessários ao funcionamento do site.
- Evitar dependências e serviços sem necessidade demonstrada.
- Tratar validação do navegador como melhoria de uso, nunca como substituta dos controles do serviço receptor.
- Não inserir dados não confiáveis em `innerHTML`.
- Preferir `textContent` e `value` para apresentar conteúdo fornecido pelo usuário.
- Não adicionar autenticação, banco ou endpoint próprio à v1.0.
- Revisar esta política quando o tratamento de dados ou a arquitetura mudar.

## Cabeçalhos HTTP

Configurar os headers no ambiente de hospedagem e conferir as respostas HTTP reais. Não depender apenas de tags HTML.

### Content-Security-Policy

Política inicial para o fluxo HTML com POST direto ao Formspree:

```text
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; form-action https://formspree.io; object-src 'none'; base-uri 'none'; frame-ancestors 'none'
```

Regras:

- Confirmar a origem do endpoint efetivamente utilizado.
- Se o envio usar `fetch`, adicionar `https://formspree.io` a `connect-src`.
- Se um desafio antispam exigir scripts, frames ou conexões externas, adicionar somente as origens documentadas e necessárias.
- Não habilitar curingas amplos, `unsafe-inline` ou `unsafe-eval` para silenciar erros sem investigar sua causa.
- Testar em `Content-Security-Policy-Report-Only` na prévia e depois ativar `Content-Security-Policy`.
- Report-Only ajuda no diagnóstico, mas não bloqueia violações.
- Não criar um coletor externo de relatórios sem avaliar os dados enviados.
- Validar menu, animação, fontes, imagens e contato com a política final.

### Outros headers obrigatórios

| Header | Valor/política |
|---|---|
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |
| X-Frame-Options | `DENY`, coerente com `frame-ancestors 'none'` |
| Strict-Transport-Security | `max-age=31536000`, após validação de HTTPS |

HSTS:

- Habilitar após confirmar certificados e redirecionamento para HTTPS.
- Acrescentar `includeSubDomains` somente se todos os subdomínios estiverem preparados para HTTPS.
- Preload não é requisito da v1.0.

Entrega:

- Servir HTML, CSS, módulos `.mjs`, imagens e fontes com MIME correto.
- Eliminar conteúdo misto.
- Revalidar HTML e arquivos sem versão.
- Usar `immutable` somente em URLs versionadas.
- Não aplicar cache público a respostas que contenham dados pessoais.

No Cloudflare Pages, `_headers` cobre respostas estáticas. Respostas de Functions, se introduzidas no futuro, exigem configuração própria de headers.

## Formulário e dados pessoais

### Dados permitidos

Coletar somente:

- Nome: até 100 caracteres.
- E-mail: até 254 caracteres, com formato válido.
- Ideia do projeto: entre 10 e 3.000 caracteres.

Não solicitar senhas, documentos, dados financeiros, anexos ou dados pessoais sensíveis. Orientar o visitante a não incluir essas informações.

Limites HTML ajudam a experiência, mas podem ser contornados. Conferir e configurar as validações e limites disponíveis no receptor. Se o serviço não atender aos controles necessários, resolver a lacuna antes de aprovar o lançamento.

### Transporte e envio

- Usar HTTPS e `method="POST"`.
- Declarar `action` explicitamente.
- Nunca colocar nome, e-mail ou mensagem em query strings.
- Não redirecionar para URLs que contenham os campos enviados.
- Não usar GET como alternativa ao envio.
- Evitar dados pessoais em console, telemetria e logs de diagnóstico.
- Não persistir o conteúdo em `localStorage` ou `sessionStorage`.
- Fixar o destinatário nas configurações do serviço.
- Habilitar proteção contra spam e acompanhar limites de envio.
- Não tratar o identificador público do formulário como segredo.
- Nunca colocar chaves administrativas do serviço no front-end.

### Comportamento da interface

- Informar processamento, sucesso e erro de forma acessível.
- Exibir sucesso somente após confirmação do serviço.
- Não afirmar que uma mensagem foi lida ou respondida.
- Preservar campos em caso de falha e permitir nova tentativa.
- Oferecer endereço oficial de contato como alternativa.
- Manter envio básico funcional sem JavaScript.
- Se houver apenas preparação local do briefing, informar claramente que nenhuma mensagem foi enviada.

## Privacidade e LGPD

Antes de ativar a coleta, publicar aviso acessível junto ao formulário com:

- Identificação do responsável pelo tratamento e contato.
- Dados coletados e finalidade de responder à solicitação.
- Base legal definida e documentada para o tratamento.
- Prestadores envolvidos e eventual transferência internacional.
- Prazo ou critério objetivo de retenção.
- Canal para solicitar acesso, correção e exclusão, conforme aplicável.

Regras operacionais:

- Definir a retenção antes do lançamento; não aceitar retenção indefinida por simples conveniência.
- Documentar exclusão no Formspree e na caixa de e-mail.
- Restringir o acesso às mensagens aos responsáveis pelo atendimento.
- Verificar condições de tratamento e localização dos dados do fornecedor.
- Não adicionar checkbox de consentimento sem definir sua finalidade e a base legal correspondente.
- Não adicionar analytics, pixels ou cookies não essenciais à v1.0 sem revisão de privacidade.
- Não afirmar conformidade integral com a LGPD apenas por publicar um aviso.

## Contas, segredos e infraestrutura

- Usar contas individuais no GitHub, Cloudflare, Formspree, registrador de domínio e e-mail.
- Habilitar MFA onde disponível; escolher serviços que permitam proteger adequadamente acessos administrativos.
- Guardar códigos de recuperação em local seguro.
- Aplicar menor privilégio e remover acessos desnecessários.
- Guardar segredos somente nos cofres/configurações protegidas dos serviços.
- Nunca versionar `.env`, tokens, chaves privadas ou credenciais.
- Usar dados fictícios em exemplos e testes.
- Se um segredo vazar, revogá-lo e substituí-lo; apagar o arquivo não basta.

## CI/CD e publicação

- Exigir revisão do parceiro e checks antes de publicar.
- Usar permissões mínimas no GitHub Actions.
- Fixar actions de terceiros por SHA completo.
- Não executar código de PR não confiável com credenciais de produção.
- Não disponibilizar segredos de produção em prévias.
- Não confundir `noindex` com controle de acesso.
- Manter rollback documentado e testado.

## Resposta a incidentes

1. Conter o problema: reverter a publicação ou desativar o envio.
2. Revogar credenciais comprometidas, quando aplicável.
3. Registrar período, componentes e dados potencialmente afetados, sem duplicar dados pessoais desnecessariamente.
4. Corrigir a causa e verificar o fluxo antes de reativá-lo.
5. Avaliar obrigações de comunicação conforme o incidente.
6. Registrar medidas para evitar recorrência.

Relatos públicos não devem incluir dados pessoais, tokens ou provas que exponham visitantes. Usar o contato oficial publicado no site para solicitar um canal privado de relato.
