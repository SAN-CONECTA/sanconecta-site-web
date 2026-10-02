// Cole aqui a configuração do app Web do Firebase:
// Console do Firebase > Configurações do projeto > Seus apps > App da Web > "Configuração do SDK".
//
// Estes valores são públicos por desenho: qualquer visitante do site consegue lê-los.
// A proteção dos dados está nas regras do Firestore (arquivo firestore.rules na raiz do repositório).
// Não coloque aqui nenhuma chave privada, conta de serviço ou senha.
export const firebaseConfig = {
  apiKey: 'AIzaSyBlBqF83JWmn5YtfQZy3QX-yvqptwbTsMs',
  authDomain: 'san-diagnostico-360.firebaseapp.com',
  projectId: 'san-diagnostico-360',
  appId: '1:278334929820:web:3f31c5f6b63890274fa659',
}

export const firebaseConfigured = !Object.values(firebaseConfig).some((v) => String(v).startsWith('COLE_AQUI'))
