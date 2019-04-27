import * as admin from 'firebase-admin'
let firebaseAppInstance

export let database

export const initializeDb = (callback) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'ci') {
    const serviceAccount = require('../dev-firebase-security.json')
    firebaseAppInstance = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://harmony-platform-dev.firebaseio.com/'
    })
  } else {
    firebaseAppInstance = admin.initializeApp({
      credential: admin.credential.cert({
        'project_id': process.env.FB_UAT_PROJECT_ID,
        'client_email': process.env.FB_UAT_CLIENT_EMAIL,
        'private_key': process.env.FB_UAT_PRIVATE_KEY,
      }),
      databaseURL: 'https://harmony-platform.firebaseio.com/'
    })
  }
  database = admin.firestore()
  callback(database)
}

export const deleteFirestore = async () => {
  await firebaseAppInstance.delete()
}
