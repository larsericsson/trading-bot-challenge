import { activeStrategies } from './active'

export function onQuote(quote) {
  console.log('got quotes')
  activeStrategies.forEach(strategy => {
    strategy.onQuote(quote)
  })
}
