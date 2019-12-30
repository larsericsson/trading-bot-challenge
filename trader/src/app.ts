import { Config } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'

const config: Config = {
  username: 'user',
  password: 'pass',
  totpSecret: 'secret'
}

async function setup() {
  const firestoreClient = await FirestoreService.createClient()
  const avanzaClient = await AvanzaService.createClient(config)

  // Example firestore client usage
  const portfolios = await FirestoreService.getPortfolios(firestoreClient)
  portfolios.forEach(portfolio => {
    console.log(portfolio.id, portfolio.data().value)
  })
}

setup()
