# Diagnóstico 360° (área /diagnostico360)

Área com login dentro do site da SAN Conecta, em `https://sanconecta.com/diagnostico360/`. A SAN preenche o diagnóstico de
cada empresa cliente (704 perguntas em 29 blocos, divididos em três rodadas: Maturidade de TI, Alinhamento entre TI e negócio e Maturidade de gestão empresarial) e cada cliente entra só para consultar os dados da própria empresa. Uma
empresa nunca enxerga os dados de outra. É uma pasta do mesmo site, não um subdomínio.

## Como funciona

- **Hospedagem:** continua no GitHub Pages. A página é uma segunda entrada do mesmo build do Vite
  (`diagnostico360/index.html` → `src/diagnostico/`). A landing não foi alterada.
- **Login e banco:** Firebase Authentication (e-mail e senha) e Firestore, chamados direto do navegador.
- **Segurança:** fica nas regras do Firestore (`firestore.rules`). A chave de API do Firebase é pública por desenho.
- **Rotas:** por hash (`#/e/<empresa>/painel`), porque o GitHub Pages não redireciona caminhos novos.

### Quem pode o quê

| Perfil | Onde fica | Pode |
| --- | --- | --- |
| Administrador SAN | coleção `staff` | Ver todas as empresas, criar empresas, liberar e remover usuários, gerir a equipe SAN, preencher os itens |
| Cliente | coleção `membros` (role `leitura`) | Consultar a própria empresa e gravar respostas e situação da evidência (v1.7) |

### Cadastro de usuários (fluxo)

1. A SAN cria a empresa e, na aba **Empresa e acessos**, informa o e-mail do cliente (cliente).
2. O sistema mostra uma mensagem pronta para enviar à pessoa. **Ele não envia e-mail de convite.**
3. A pessoa abre `/diagnostico360/`, escolhe **Criar conta** com o mesmo e-mail e confirma o e-mail pelo link do Firebase.
4. Ao entrar, ela vê só a empresa liberada. Criar conta sem convite não dá acesso a nenhum dado.

## Configuração (uma vez)

Use um projeto Firebase **novo**, só para o diagnóstico. Não reaproveite projetos de outros sistemas: regras e dados
ficariam misturados.

1. **Criar o projeto** no [Console do Firebase](https://console.firebase.google.com/), por exemplo `san-conecta-diagnostico`.
2. **Authentication → Método de login:** ativar **E-mail/senha**.
3. **Authentication → Configurações → Domínios autorizados:** adicionar `sanconecta.com`.
4. **Authentication → Modelos:** ajustar o idioma para português nos e-mails de verificação e de redefinição de senha.
   O link do e-mail é do Firebase (`<projeto>.firebaseapp.com`). Depois de confirmar, a tela dele mostra **Continuar** e leva a
   `https://sanconecta.com/diagnostico360/` (o app envia essa página como destino). Na mensagem do modelo de verificação,
   acrescente a linha: `Depois de confirmar, entre em https://sanconecta.com/diagnostico360/`.
5. **Firestore Database → Criar banco de dados:** modo de **produção**, região `southamerica-east1` (São Paulo).
6. **Firestore → Regras:** colar o conteúdo de `firestore.rules` e publicar.
7. **Configurações do projeto → Seus apps → Web:** registrar o app e copiar a configuração para
   `src/diagnostico/firebaseConfig.js` (`apiKey`, `authDomain`, `projectId`, `appId`).
8. **Google Cloud Console → APIs e serviços → Credenciais:** na chave de API do navegador, restringir por **referenciador
   HTTP** a `https://sanconecta.com/*`. Para testar no seu computador, inclua temporariamente `http://localhost:5173/*`.
9. **Primeiro administrador SAN** (feito à mão, porque as regras impedem criá-lo pelo app):
   1. Abra `https://sanconecta.com/diagnostico360/`, escolha **Criar conta** com o seu e-mail e confirme o e-mail.
   2. No Console, em Firestore, crie a coleção `staff` e um documento cujo **ID é o seu e-mail em minúsculas**, com os
      campos `email` (string, o mesmo e-mail), `criadoPor` (string, o mesmo e-mail) e `criadoEm` (timestamp, agora).
   3. Recarregue a página. O selo no topo passa a mostrar **Administrador SAN**.

## Publicação neste repositório

1. Rode `npm install` para o `package-lock.json` incluir o `firebase`. **Sem isso o `npm ci` do deploy falha** e o site
   não é atualizado.
2. Confirme localmente: `npm run lint` e `npm run build`. Depois abra `npm run dev` e teste `/diagnostico360/`.
3. Abra um pull request. O fluxo `.github/workflows/ci.yml` roda lint e build e confere que `dist/diagnostico360/index.html`
   existe. **Ele não publica nada.**
4. Só depois do merge na `main` o deploy automático publica o site.

## Testes das regras antes de usar com cliente

No Console (Firestore → Regras → Simulador de regras) ou no emulador, confira com e-mail verificado:

- Cliente da empresa A: lê os itens da A; **não** escreve na A; **não** lê nada da B; **não** cria empresa; **não** grava
  em `membros` nem em `staff` (nenhuma promoção por conta própria).
- Usuário com e-mail **não verificado**: negado em tudo.
- Cliente: **não** apaga nada. Só a equipe SAN exclui, e apenas empresa já arquivada.
- Administrador SAN: lê e escreve em todas as empresas e gere `membros` (só com `role` igual a `leitura`) e `staff`.

## Cuidados com os dados

- Os achados descrevem a infraestrutura de empresas clientes (firewalls, backups, pontos únicos de falha). Trate como
  informação sensível e cubra o tratamento no contrato com cada cliente (LGPD).
- Não registre senhas, chaves ou tokens nos campos. Descreva onde estão guardados.
- Ao encerrar um contrato: arquive a empresa e remova os usuários dela na aba **Empresa e acessos**.
- O Firestore não tem cópia de segurança automática no plano gratuito. Use **Exportar CSV** em cada empresa como cópia
  periódica, ou ative as cópias agendadas do Firestore (exige o plano pago).
- Contra criação de contas em massa, considere ativar o App Check com reCAPTCHA no Firebase.

## Versões

- **v1.0** — Empresas, um ou mais usuários de leitura por empresa, administradores SAN, 19 itens com perguntas-guia, painel, exportação CSV.
- **v1.1** — Novo item 1.5 (Estações de trabalho e endpoints), total de 20 itens. Maturidade de 0 a 5 por item (com a escala descrita na tela), situação da evidência (6 valores), 15 perguntas-guia novas vindas do Assessment de TI 2023, média de maturidade no painel e colunas novas no CSV. Os campos novos são opcionais nas regras: **publique as regras no console antes de publicar o código**.
- **v1.2** — Diagnóstico dividido em duas áreas: TI (pilares 1 a 5) e Gestão do Negócio (pilares 6 a 10, 11 itens com perguntas-chave: estratégia, finanças, comercial, operações, pessoas e conformidade). O produto passa a se chamar "Diagnóstico 360°". As regras aceitam ids 1.1 a 10.3: **publique as regras no console antes de publicar o código**.
- **v1.2.1** — A versão aparece no rodapé do login e do sistema ("Versão 1.2.1 · data · código do commit"). O número vem do campo `version` do `package.json` (e do `package-lock.json`): ao fechar uma versão nova, altere os dois. A data e o código do commit são gravados sozinhos no build.
- **v1.3.0** — Barra lateral na empresa: seletor de empresa (equipe SAN), Painel, Diagnóstico de TI, Gestão do Negócio, Empresa e acessos e Exportar CSV. No celular a barra vira uma faixa rolável no topo. Links antigos `#/e/<id>/itens` continuam funcionando.
- **v1.4.0** — Área da equipe SAN com barra lateral: **Empresas** (criar, editar, arquivar e excluir definitivamente só empresa arquivada, com o nome digitado e CSV opcional antes) e **Usuários** (liberar e-mail de cliente em uma empresa, alterar a empresa, retirar o acesso, e gerir a equipe SAN). Exclusão de empresa apaga também os itens e os acessos dela. A conta de login do usuário não é apagada pelo sistema (só no console do Firebase, Authentication). **Regras novas: publique `firestore.rules` no console antes de publicar o código.**
- **v1.4.1** — A ficha do item abre como janela no centro da tela (antes era um painel na lateral direita).
- **v1.5.0** — Cada pergunta-guia tem o próprio campo de resposta na ficha do item (campo `respostas` no banco, chaves `r0`, `r1`… pela posição da pergunta). "Achados" virou "Achados gerais". O CSV ganhou a coluna "Respostas por pergunta" e a lista de itens mostra quantas perguntas já foram respondidas. **Perguntas novas só entram no fim da lista de um item** (a posição identifica a resposta). **Regras novas: publique `firestore.rules` no console ANTES de publicar o código; senão o Salvar falha em todos os itens.**
- **v1.6.0** — Perguntas reestruturadas: 31 itens, 158 blocos temáticos e 704 perguntas (arquivo `src/diagnostico/perguntas.js`). Cada pergunta tem identificador fixo (`q01`…, nunca renumerar) e cada bloco também (`b1`…). A maturidade (escala 0 a 5 com os textos do anexo) é dada por bloco (campo `notas`); a do item é a média dos blocos. Blocos de levantamento de dados não têm nota. O CSV ganhou a maturidade por bloco. Respostas antigas (`r0`…) deixam de ser exibidas. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.7.0** — O usuário cliente vinculado à empresa passa a preencher as **respostas das perguntas e a situação da evidência** (nota de maturidade, risco, status, achados e recomendação seguem só da equipe SAN; empresa arquivada fica só leitura). Novo botão **Log de alterações** na barra lateral (só equipe SAN): cada gravação em item cria, no mesmo lote, um registro em `empresas/{id}/log` com e-mail, perfil, data/hora e o antes/depois de cada campo alterado; filtro por usuário e item e exportação em CSV. As regras exigem o registro junto de toda gravação e o tornam imutável; ele é apagado junto com a exclusão da empresa arquivada. Limite: o conteúdo do antes/depois é montado pelo navegador (sem servidor, plano Spark), então prova de autoria e horário é forte, mas o texto do registro não é verificado campo a campo. Não registra ainda ações administrativas (empresas e acessos). **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.8.0** — O diagnóstico passa a ter **três rodadas**: Maturidade de TI (14 blocos), Alinhamento entre TI e negócio (6 blocos) e Maturidade de gestão empresarial (9 blocos), cada uma com um botão no menu lateral. As 704 perguntas foram redistribuídas em 29 blocos (mapa em `src/diagnostico/destinos.js`, texto das perguntas em `perguntas.js`, que não muda). Status, risco, responsável, prazo, achados, nota 0 a 5, situação da evidência e recomendação passam a ser gravados **por bloco** (`empresas/{id}/blocos/{codigo}`); as respostas continuam em `empresas/{id}/itens/{item}` pelos mesmos ids de pergunta (`q01`…). A maturidade de cada rodada é a média das notas dos blocos, sem pesos. O bloco AL-07 (decisões e divergências) está reservado e só aparece quando houver perguntas novas. Dados antigos por item (status, risco, notas por bloco da v1.6) deixam de aparecer; o CSV passa a ser por bloco. O log registra o código do bloco. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.9.0** — Segundo tipo de diagnóstico por empresa (campo `modo`, escolhido ao criar e editável em Empresa e acessos): **Completo** (3 rodadas, 29 blocos, 704 perguntas) ou **Rápido (GEMI)**, baseado no documento GEMI: 11 perguntas objetivas com 5 opções (nota 0 a 4 x peso 1 a 3) e 4 dissertativas, em 3 fases. O score de cada fase é pontos/máximo (40, 32 e 40 pontos); o índice geral pondera as fases em 40%, 35% e 25%; faixas: 0-25 Inicial, 26-50 Básico, 51-75 Gerenciado, 76-100 Estratégico. Alerta vermelho se 1.1 (backup) ou 1.2 (segurança) tiver nota 0 ou 1. Descompasso gestão x TI quando a diferença entre as fases é de 25 pontos percentuais ou mais, com uma fase em 51% ou mais e a outra em 50% ou menos (limiares definidos pela SAN, o documento não os fixa). Só a equipe SAN grava (coleção `empresas/{id}/gemi/{codigo}`); o cliente vê o resultado. Dados e cálculo em `gemi.js` e `gemiCalc.js`. Gravações vão para o log (bloco `GEMI`). **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.9.1** — A lista de empresas mostra a fase de estudo e o botão Editar deixa claro onde trocá-la. Nomes na tela: "Fase Inicial de Estudo" (antes Rápido/GEMI, 15 perguntas) e "Fase Aprofundada de Estudo" (antes Completo, 704 perguntas); os valores gravados (`modo`: rapido/completo) não mudam.
- **v1.9.2** — Na Fase Inicial de Estudo as perguntas vêm recolhidas (código, título, tipo e situação da resposta). Cada uma abre ao clicar; o botão "Próxima pergunta" fecha a atual e abre a seguinte; há "Abrir todas" e "Fechar todas". Sem mudança de regras.
- **v1.9.3** — Botão "Próxima pergunta" em azul mais escuro.
- **v1.10.0** — Novo menu **Simulação Prejuízo** (só equipe SAN, nos dois tipos de diagnóstico): a planilha "Simulador de Prejuízo por Downtime de TI e ROI" dentro do sistema. Parâmetros do cliente (faturamento, dias e horas úteis, colaboradores, custo médio, % da operação afetada, custo emergencial, RTO e investimento mensal em TI), raio-x da hora parada, 4 cenários (4h, 8h, 24h, 48h), ROI com veredito, gráficos de barras e a tabela dos 5 pilares com argumentos para a diretoria. Fórmulas idênticas às da planilha (conferidas); dados gravados em `empresas/{id}/simulacao/atual`, com log (`SIMULACAO`). Fica oculto para o cliente porque guarda dados financeiros; liberar a leitura é uma mudança de regra. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.10.1** — Correção do card "Por fase" do painel da Fase Inicial, que cortava o texto e escondia a fase 2 (a lista usava a grade de duas colunas do painel completo). Mesma correção em "Faixas de classificação". Sem mudança de regras.
- **v1.10.2** — Layout responsivo para celular: corrige a rolagem horizontal da página nas telas da empresa (menu lateral empurrava a largura), cabeçalho compacto, janela de bloco em tela cheia, botões e filtros com alvo de toque maior, tabela de parâmetros da Simulação sem coluna de unidade no celular. Sem mudança de regras.
- Ideias para as próximas: histórico de alterações e comentários por item, anexos de evidências, plano de ação e
  matriz de risco (v1.3), relatório executivo (v2.0).
- **v1.11.0** — Em **Usuários** (e em Empresa e acessos): novo perfil por cliente, **Pode responder** (como antes) ou **Somente visualizar** (consulta, não grava nada; as regras bloqueiam também no servidor), e botão **Editar** na lista para trocar e-mail, empresa e perfil (trocar e-mail ou empresa recria o vínculo; o e-mail novo precisa criar a própria conta). Vínculos antigos continuam como "Pode responder". Campo `role` de `membros` aceita `leitura` ou `visualizar`. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.12.0** — Na **Fase Inicial de Estudo (GEMI)** o cliente com perfil "Pode responder" passa a marcar a nota das objetivas e escrever as dissertativas; a observação do consultor segue só da equipe SAN, que pode corrigir qualquer nota. Gravações do cliente vão para o log com perfil Cliente; "Somente visualizar" e empresa arquivada continuam só leitura. Gravação passa a usar merge, para o cliente não apagar a observação do consultor. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.13.0** — A **Simulação Prejuízo** pode ser liberada **por usuário cliente**, só para leitura: em Usuários (e em Empresa e acessos) há a caixa "Ver Simulação Prejuízo"; padrão desmarcado (oculta, como antes). O campo `simulacao` (booleano) fica no vínculo `membros`; as regras só liberam a leitura de `empresas/{id}/simulacao` a quem tiver `simulacao == true`. Gravar continua só da equipe SAN. Vínculos antigos ficam com a simulação oculta. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.13.1** — Layout em tela larga: o menu lateral encosta na esquerda e a área de conteúdo usa o resto da largura (antes tudo ficava centralizado em 1320px, deixando as tabelas de Usuários apertadas). Sem mudança de regras.
- **v1.14.0** — Na Fase Inicial, a pergunta dissertativa **1.5 (Gargalos e incidentes críticos)** ganha caixas de marcação além do texto: *Foi servidor*, *Foi nobreak*, *Foi link* e *Outros* (podem ser marcadas várias). Gravadas no campo `opcoes` de `empresas/{id}/gemi/1.5`, aparecem no Painel, no CSV e no Log ("opções marcadas"). Cliente com perfil "Pode responder" e equipe SAN podem marcar. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.14.1** — Texto da 5ª opção (4 pts) da pergunta 1.1 da Fase Inicial: "Backup automático em nuvem/híbrido, cópias imutáveis (anti-ransomware) e testes periódicos documentados de recuperação de desastres (DR)." As notas já gravadas não mudam. Sem mudança de regras.
- **v1.14.2** — Texto da 5ª opção (4 pts) da pergunta 2.2 da Fase Inicial: "Ecossistema totalmente integrado em tempo real, com dado único e zero retrabalho de digitação." As notas já gravadas não mudam. Sem mudança de regras.
- **v1.15.0** — Botão **Enviar e-mail de acesso** em Usuários (clientes e equipe SAN) e em Empresa e acessos. Se o e-mail ainda não tem conta de login, o sistema cria a conta com uma senha aleatória (num app secundário do Firebase, sem derrubar o login de quem envia) e dispara o e-mail do Firebase "redefinir senha", que serve de primeiro acesso; se já tem conta, só reenvia o link. O e-mail sai do remetente padrão do Firebase e pode cair no spam. A conta nasce sem e-mail verificado, então não dá acesso a dados sem vínculo liberado e verificação. O sistema continua sem enviar convite automático ao liberar. Sem mudança de regras.
- **v1.16.0** — Pergunta **2.4** da Fase Inicial reformulada e com caixas de marcação (várias): ERP lento, sistemas sem integração, servidor/computadores sem capacidade, internet/link sem folga, segurança e backup, dependência de poucas pessoas e Outros, mais o texto livre. Usa o mesmo campo `opcoes` da 1.5; as chaves aceitas pelas regras foram ampliadas. Respostas de texto já gravadas na 2.4 continuam. **Regras novas: publique `firestore.rules` no console ANTES de publicar o código.**
- **v1.16.1** — Removida da pergunta 2.4 a frase "Objetivo e gancho comercial". A frase só aparece nas perguntas que ainda têm esse campo. Sem mudança de regras.
