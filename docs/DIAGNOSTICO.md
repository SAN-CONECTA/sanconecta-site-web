# Diagnóstico 360° (área /diagnostico360)

Área com login dentro do site da SAN Conecta, em `https://sanconecta.com/diagnostico360/`. A SAN preenche o diagnóstico de
cada empresa cliente (31 itens em 10 pilares, divididos em duas áreas: TI e Gestão do Negócio) e cada cliente entra só para consultar os dados da própria empresa. Uma
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
| Cliente (leitura) | coleção `membros` (role `leitura`) | Só consultar a própria empresa |

### Cadastro de usuários (fluxo)

1. A SAN cria a empresa e, na aba **Empresa e acessos**, informa o e-mail do cliente (acesso de leitura).
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
- Ideias para as próximas: histórico de alterações e comentários por item, anexos de evidências, plano de ação e
  matriz de risco (v1.3), relatório executivo (v2.0).
