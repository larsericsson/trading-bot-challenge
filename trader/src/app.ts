import admin from 'firebase-admin'
import { Config } from './interfaces'
import * as AvanzaService from './services/avanza'

const config: Config = {
  username: 'user',
  password: 'pass',
  totpSecret: 'secret'
}
const serviceAccount = require('../service-account-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

async function setup() {
  const portfolios = await db.collection('portfolios').get()
  portfolios.forEach(portfolio => {
    console.log(portfolio.data())
  })

  AvanzaService.createClient(config)
}

setup()
