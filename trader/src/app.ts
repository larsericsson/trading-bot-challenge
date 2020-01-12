import * as schedule from 'node-schedule'

import { IConfig } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'
import { onQuote } from './strategies'
import Avanza from 'avanza-api'

const config: IConfig = require('./../config.json')

let recordPortfolioTask: schedule.Job,
  firestoreClient: FirebaseFirestore.Firestore,
  avanzaClient: Avanza

async function setup() {
  console.log('Setting up application…')
  firestoreClient = await FirestoreService.createClient()
  avanzaClient = await AvanzaService.createClient(config.avanza, onQuote)

  recordPortfolioTask = schedule.scheduleJob('*/1 * * * *', async () => {
    const portfolio = await AvanzaService.getPortfolio(avanzaClient, config.avanza.accountId)
    FirestoreService.recordPortfolio(firestoreClient, portfolio)
  })

  console.log(`
    Application started
    Avanza: ${avanzaClient.isAuthenticated ? 'authed' : 'not authed'}
  `)
}

async function tearDown() {
  console.log('Shutting down application…')
  recordPortfolioTask.cancel()
  firestoreClient.terminate()
}

process.on('SIGINT', tearDown)

setup()
