import { IStrategy, IQuote, ISignal } from '../../interfaces'

const DummyStrategy: IStrategy = {
  onQuote: function(quote: IQuote) {
    console.log('dummy got quote', quote)
    const signal: ISignal = {
      signal: 'buy',
      id: 1234,
      confidence: 0.1
    }
    return signal
  }
}

export { DummyStrategy }
