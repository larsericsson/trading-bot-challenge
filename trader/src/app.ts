import admin from 'firebase-admin'
import * as Avanza from 'avanza'
import { Config } from './interfaces'

const config: Config = {
  username: 'user',
  password: 'pass',
  totpSecret: 'secret'
}
const serviceAccount = require('../service-account-key.json')

const avanza = new Avanza()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

let db = admin.firestore()

async function setup() {
  const portfolios = await db.collection('portfolios').get()
  portfolios.forEach(portfolio => {
    console.log(portfolio.data())
  })

  try {
    await avanza.authenticate({
      username: config.username,
      password: config.password,
      totpSecret: config.totpSecret
    })
  } catch (e) {
    console.error(e.statusMessage)
  }
}

setup()
