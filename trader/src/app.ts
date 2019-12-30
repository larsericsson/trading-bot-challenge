import { Config } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'
import { onQuote } from './strategies'

const config: Config = {
  username: 'user',
  password: 'pass',
  totpSecret: 'secret'
}

async function setup() {
  console.log(onQuote('quote'))
  const firestoreClient = await FirestoreService.createClient()
  const avanzaClient = await AvanzaService.createClient(config, onQuote)

  // Example firestore client usage
  const portfolios = await FirestoreService.getPortfolios(firestoreClient)
  portfolios.forEach(portfolio => {
    console.log(portfolio.id, portfolio.data().value)
  })
}

setup()
