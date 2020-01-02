import { activeStrategies } from './active'
import { IQuote } from '../interfaces'

export function onQuote(quote: IQuote) {
  console.log('got quotes')
  activeStrategies.forEach(strategy => {
    strategy.onQuote(quote)
  })
}
