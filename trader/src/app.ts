import { scheduleJob, Job } from 'node-schedule'

import { IConfig } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'
import * as Strategies from './strategies'
import Avanza from 'avanza-api'

const config: IConfig = require('./../config.json')

let recordPortfolioTask: Job, firestoreClient: FirebaseFirestore.Firestore, avanzaClient: Avanza

async function setup() {
  console.log('Setting up application…')
  firestoreClient = await FirestoreService.createClient()
  avanzaClient = await AvanzaService.createClient(config.avanza, Strategies.onQuote)

  Strategies.initialize()

  recordPortfolioTask = scheduleJob('*/1 * * * *', async () => {
    const portfolio = await AvanzaService.getPortfolio(avanzaClient, config.avanza.accountId)
    FirestoreService.recordPortfolio(firestoreClient, portfolio)
  })

  console.log('Application started')
  console.group()
  console.log(`Avanza: ${avanzaClient.isAuthenticated ? 'authed' : 'not authed'}`)
  console.groupEnd()
}

async function tearDown() {
  console.log('Shutting down application…')
  recordPortfolioTask.cancel()
  firestoreClient.terminate()
  process.exit()
}

process.on('SIGINT', tearDown)

setup()
