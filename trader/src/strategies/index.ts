import { scheduleJob, Job } from 'node-schedule'

import { activeStrategies } from './active'
import { IQuote } from '../interfaces'

export function initialize() {
  const scheduledJobs: Array<Job> = [
    scheduleJob('beforeMarketOpens', '50 8 * * 1-5', beforeMarketOpen),
    scheduleJob('afterMarketCloses', '40 17 * * 1-5', afterMarketClose)
  ]

  console.log('Strategies initialized')
  console.group()
  scheduledJobs.forEach(job => {
    console.log(`Scheduled next invocation of ${job.name} task to ${job.nextInvocation()}`)
  })
  console.groupEnd()
}

export function onQuote(quote: IQuote) {
  console.log('got quotes')
  activeStrategies.forEach(strategy => {
    strategy.onQuote(quote)
  })
}

function beforeMarketOpen() {
  console.log('Market is opening in 10 minutes')
}

function afterMarketClose() {
  console.log('Market closed 10 minutes ago')
}
