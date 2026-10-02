# Diagnóstico 360° de TI (área /diagnostico360)

Área com login dentro do site da SAN Conecta, em `https://sanconecta.com/diagnostico360/`. A SAN preenche o diagnóstico de
cada empresa cliente (19 itens em 5 pilares) e cada cliente entra só para consultar os dados da própria empresa. Uma
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
- Qualquer usuário: **não** apaga empresa nem item.
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
- Ideias para as próximas: histórico de alterações e comentários por item (v1.1), anexos de evidências (v1.2), plano de ação e
  matriz de risco (v1.3), relatório executivo (v2.0).
