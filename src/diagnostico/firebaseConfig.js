// Cole aqui a configuração do app Web do Firebase:
// Console do Firebase > Configurações do projeto > Seus apps > App da Web > "Configuração do SDK".
//
// Estes valores são públicos por desenho: qualquer visitante do site consegue lê-los.
// A proteção dos dados está nas regras do Firestore (arquivo firestore.rules na raiz do repositório).
// Não coloque aqui nenhuma chave privada, conta de serviço ou senha.
export const firebaseConfig = {
  apiKey: 'COLE_AQUI',
  authDomain: 'COLE_AQUI',
  projectId: 'COLE_AQUI',
  appId: 'COLE_AQUI',
}

export const firebaseConfigured = !Object.values(firebaseConfig).some((v) => String(v).startsWith('COLE_AQUI'))
