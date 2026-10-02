import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig, firebaseConfigured } from './firebaseConfig'

let app = null
export let auth = null
export let db = null

if (firebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  auth.languageCode = 'pt-BR'
  db = getFirestore(app)
}

export { firebaseConfigured }
