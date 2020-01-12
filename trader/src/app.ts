import * as schedule from 'node-schedule'

import { IConfig } from './interfaces'
import * as AvanzaService from './services/avanza'
import * as FirestoreService from './services/firestore'
import { onQuote } from './strategies'

const config: IConfig = require('./../config.json')

let recordPortfolioTask: schedule.Job

async function setup() {
  console.log('Setting up application…')
  const firestoreClient = await FirestoreService.createClient()
  const avanzaClient = await AvanzaService.createClient(config.avanza, onQuote)

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
}

process.on('SIGINT', tearDown)

setup()
