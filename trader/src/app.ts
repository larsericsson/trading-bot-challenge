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
  avanzaClient = await AvanzaService.createClient(config.avanza)

  Strategies.initialize()

  recordPortfolioTask = scheduleJob('recordPortfolio', '*/5 9-18 * * 1-5', async () => {
    if (avanzaClient.isAuthenticated) {
      const portfolio = await AvanzaService.getPortfolio(avanzaClient, config.avanza.accountId)
      FirestoreService.recordPortfolio(firestoreClient, config.portfolioId, portfolio)
    } else {
      console.error(`Avanza client not authed!`);
    }
  })

  console.log('Application started')
  console.group()
  console.log(`Portfolio: ${config.portfolioId}`)
  console.log(`Avanza: ${avanzaClient.isAuthenticated ? 'authed' : 'not authed'}`)
  if (avanzaClient.isAuthenticated) {
    console.group()
    let portfolio = await AvanzaService.getPortfolio(avanzaClient, config.avanza.accountId)
    console.log(`Balance: ${portfolio.totalBalance}`)
    console.log(`Profit:  ${portfolio.totalProfit}`)
    console.groupEnd()
  }
  console.log(
    `Scheduled next invocation of ${
      recordPortfolioTask.name
    } task to ${recordPortfolioTask.nextInvocation()}`
  )
  console.groupEnd()
}

async function tearDown() {
  console.log('Shutting down application…')
  recordPortfolioTask.cancel()
  await firestoreClient.terminate()
  process.exit()
}

process.on('SIGINT', tearDown)

setup()
