import { IStrategy, IQuote } from '../../interfaces'

const DummyStrategy: IStrategy = {
  onQuote: function(quote: IQuote) {
    console.log('dummy got quote')
    const buy: boolean = true
    return buy
  }
}

export { DummyStrategy }
