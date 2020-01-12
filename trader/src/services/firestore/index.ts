import * as admin from 'firebase-admin'

export * from './getPortfolios'
export * from './recordPortfolio'

const serviceAccount = require('./../../../service-account-key.json')

export async function createClient(): Promise<FirebaseFirestore.Firestore> {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  })

  return admin.firestore()
}
