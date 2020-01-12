import { scheduleJob } from 'node-schedule'

import { activeStrategies } from './active'
import { IQuote } from '../interfaces'

export function initialize() {
  scheduleJob('50 8 * * 1-5', beforeMarketOpen)
  scheduleJob('40 17 * * 1-5', afterMarketClose)
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
