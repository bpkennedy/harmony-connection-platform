import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

let apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'ci') {
  apiKey = process.env.VUE_APP_FIREBASE_API_KEY
  authDomain = process.env.VUE_APP_FIREBASE_AUTH_DOMAIN
  databaseURL = process.env.VUE_APP_FIREBASE_DATABASE_URL
  projectId = process.env.VUE_APP_FIREBASE_PROJECT_ID
  storageBucket = process.env.VUE_APP_FIREBASE_STORAGE_BUCKET
  messagingSenderId = process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
} else {
  apiKey = process.env.VUE_APP_FIREBASE_API_KEY_PROD
  authDomain = process.env.VUE_APP_FIREBASE_AUTH_DOMAIN_PROD
  databaseURL = process.env.VUE_APP_FIREBASE_DATABASE_URL_PROD
  projectId = process.env.VUE_APP_FIREBASE_PROJECT_ID_PROD
  storageBucket = process.env.VUE_APP_FIREBASE_STORAGE_BUCKET_PROD
  messagingSenderId = process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID_PROD
}

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
}

firebase.initializeApp(config)
export { firebase }

export default firebase.firestore()
