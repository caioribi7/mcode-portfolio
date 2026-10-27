# Definition of Done — MCode v1.0

## Objetivo

Lançar um portfólio comercial estático, acessível, seguro e com contato funcional, mantendo HTML, CSS e JavaScript modular nativos.

A versão 1.0 está pronta somente quando todos os itens abaixo estiverem concluídos e aprovados pelos dois responsáveis.

Documentos relacionados: [Roadmap](ROADMAP.md) e [Política de Segurança](SECURITY.md).

## Registro de lançamento

- Responsável pela publicação:
- Revisor:
- Domínio:
- Commit aprovado:
- PR ou registro de evidências:
- Data da aprovação:
- Tag: `v1.0.0`

Campos vazios ou pendências não equivalem a aprovação.

## Conteúdo e direitos

- [ ] Apresentação da MCode aprovada pelos dois responsáveis.
- [ ] Serviços correspondem ao que a equipe efetivamente oferece.
- [ ] Órbita, Frame e Pulse continuam identificados como conceitos.
- [ ] Não existem clientes, resultados, métricas ou depoimentos fictícios.
- [ ] Origem e condições de uso dos assets publicados estão registradas.
- [ ] Pendência de `assets/artwork.jpg` resolvida ou imagem substituída.
- [ ] Licenças das fontes acompanham os arquivos publicados.
- [ ] Originais da identidade visual preservados.

## Infraestrutura

- [ ] Site publicado no Cloudflare Pages.
- [ ] Domínio próprio funcionando com certificado HTTPS válido.
- [ ] HTTP redireciona para HTTPS.
- [ ] Variantes do domínio redirecionam para um endereço canônico.
- [ ] Página inexistente retorna HTTP 404.
- [ ] Pacote público contém somente arquivos necessários e licenças.
- [ ] Testes, documentos internos e credenciais não são publicados.
- [ ] Prévia não está habilitada para indexação.
- [ ] Procedimento de rollback documentado e ensaiado.

## Segurança

- [ ] CSP aplicada em modo de bloqueio.
- [ ] Fluxos principais não produzem violações inesperadas de CSP.
- [ ] X-Content-Type-Options, Referrer-Policy, Permissions-Policy, proteção contra enquadramento e HSTS conferidos.
- [ ] Módulos `.mjs`, fontes e demais assets têm MIME correto.
- [ ] Não existe conteúdo misto.
- [ ] Nenhum segredo está no front-end ou no pacote público.
- [ ] Contas administrativas têm MFA e acessos individuais.
- [ ] Permissões dos serviços e do CI seguem menor privilégio.
- [ ] Não há falha grave de segurança conhecida sem resolução.

## Contato e privacidade

- [ ] Formulário usa POST para endpoint HTTPS explícito do Formspree.
- [ ] Destinatário oficial verificado.
- [ ] Mensagem de teste recebida na caixa oficial.
- [ ] Envio HTML básico funciona sem JavaScript.
- [ ] Validação e limites do receptor foram conferidos.
- [ ] Antispam habilitado e limites do plano conhecidos.
- [ ] Estados de processamento, sucesso e erro são acessíveis.
- [ ] Erro de rede e rejeição não exibem falso sucesso.
- [ ] Campos são preservados em caso de falha.
- [ ] Nome, e-mail e mensagem não aparecem em URLs.
- [ ] Dados pessoais não são enviados à telemetria de diagnóstico.
- [ ] Endereço oficial está visível como alternativa.
- [ ] Aviso de privacidade está publicado junto ao formulário.
- [ ] Finalidade, base legal, prestadores e retenção estão documentados.
- [ ] Existe procedimento de exclusão no serviço e na caixa de e-mail.
- [ ] README e interface descrevem o comportamento real do contato.

## CI/CD

- [ ] GitHub Actions executa em PRs e alterações da `main`.
- [ ] Versão LTS suportada do Node.js definida explicitamente.
- [ ] Testes existentes e novos testes relevantes passam.
- [ ] Links locais e pacote público são verificados.
- [ ] Checks obrigatórios e revisão do parceiro bloqueiam integração pelo fluxo normal quando houver falha.
- [ ] Produção só recebe commits aprovados.
- [ ] PRs não confiáveis não acessam credenciais de publicação.
- [ ] Verificação HTTP após deploy está operacional.

## Funcionalidade e acessibilidade

- [ ] Navegação, menu móvel e detalhes dos projetos funcionam.
- [ ] Formulário e links funcionam em Chrome, Firefox e Safari.
- [ ] Revisão realizada em Android e iPhone.
- [ ] Não há erros inesperados no console nos fluxos principais.
- [ ] Conteúdo utilizável a partir de 320 CSS px, sem rolagem horizontal indevida.
- [ ] Zoom de 200% não impede acesso ao conteúdo e às ações.
- [ ] Navegação por teclado possui ordem e foco visível.
- [ ] Campos têm labels e erros compreensíveis.
- [ ] Contraste atende WCAG AA nos textos e controles aplicáveis.
- [ ] Animação respeita movimento reduzido e permite pausa.
- [ ] Sem JavaScript, conteúdo e envio básico continuam acessíveis.
- [ ] Não há falha grave de acessibilidade conhecida sem resolução.

## Desempenho e apresentação

- [ ] Fontes em WOFF2 e imagem otimizada.
- [ ] Compressão HTTP confirmada.
- [ ] HTML e arquivos sem versão usam revalidação.
- [ ] Cache `immutable` é usado somente para URLs versionadas.
- [ ] Título, descrição, canonical e prévia de compartilhamento revisados.
- [ ] Animação revisada em celular físico, sem travamentos que impeçam interação.

### Protocolo de medição

Executar três medições Lighthouse Mobile na mesma URL de produção, com cache frio e configurações equivalentes.

Registrar versão da ferramenta, perfil, data e resultados no registro de evidências do lançamento.

Critérios:

- [ ] Mediana de LCP menor ou igual a 2,5 segundos.
- [ ] Mediana de CLS menor ou igual a 0,1.
- [ ] Transferência inicial comprimida menor ou igual a 1 MB.

Para o orçamento de transferência, medir uma carga nova, sem rolagem ou interação, incluindo recursos de terceiros carregados inicialmente.

Esses critérios são medições de laboratório. Dados reais de usuários serão avaliados quando houver tráfego suficiente.

## Operação

- [ ] Monitor externo de disponibilidade ativo.
- [ ] Alertas de consumo/custo configurados quando disponíveis.
- [ ] Orçamento mensal e limites contratados registrados.
- [ ] Responsável por disponibilidade e contato definido.
- [ ] Responsável pela renovação do domínio definido.
- [ ] README contém prévia, testes, publicação e rollback atualizados.

## Fora do escopo da v1.0

- Framework ou reescrita da interface.
- Gerenciador de pacotes para o front-end.
- Bundler ou compilação obrigatória.
- CMS ou editor administrativo.
- Blog.
- Autenticação e área de clientes.
- Banco de dados.
- Painel administrativo.
- CRM ou automações comerciais.
- Backend próprio ou Functions para o contato.
- Uploads e anexos.
- Internacionalização.
- Novos efeitos, animações ou reformulação visual.
- Analytics, pixels e experimentos A/B.
- PWA e suporte offline.
- Novos cases como condição para lançar.
- Automação completa de testes de navegador.
- Metas de nota 100 em ferramentas.
- Minificação sem benefício medido.

Uma atividade fora desta lista de requisitos só pode entrar na v1.0 se corrigir um bloqueio do checklist ou receber aprovação explícita dos dois responsáveis, com revisão do impacto no lançamento.

## Regra de Parada

Quando todos os itens estiverem concluídos:

1. Os dois responsáveis aprovam o mesmo commit.
2. Criar a tag `v1.0.0` nesse commit.
3. Publicar o commit aprovado.
4. Conferir HTTPS, navegação e recebimento de contato em produção.
5. Encerrar o desenvolvimento da v1.0 e iniciar a divulgação.

Se a conferência final falhar, corrigir ou reverter e repetir a validação afetada antes de considerar o lançamento concluído.

Depois do lançamento, priorizar:

- Correções de defeitos.
- Segurança e continuidade operacional.
- Atualização de conteúdo verdadeiro.
- Melhorias justificadas por necessidade comercial ou problema observado.

Ideias novas vão para o backlog de uma versão posterior e não reabrem automaticamente o escopo da v1.0.
