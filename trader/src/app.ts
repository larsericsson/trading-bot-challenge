import { IConfig } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'
import { onQuote } from './strategies'

const config: IConfig = require('./../config.json')

async function setup() {
  const firestoreClient = await FirestoreService.createClient()
  const avanzaClient = await AvanzaService.createClient(config.avanza, onQuote)

  // Example firestore client usage
  const portfolios = await FirestoreService.getPortfolios(firestoreClient)
  portfolios.forEach(portfolio => {
    console.log(portfolio.id, portfolio.data().value)
  })
}

setup()
