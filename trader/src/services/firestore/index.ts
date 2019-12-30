import * as admin from 'firebase-admin'

export * from './getPortfolios'

const serviceAccount = require('./../../../service-account-key.json')

export async function createClient() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })
  const db = admin.firestore()

  return db
}
