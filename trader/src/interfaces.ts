export interface Config {
  username: string
  password: string
  totpSecret: string
}

export interface IQuote {
  name: string
}

export interface ISignal {
  signal: 'buy' | 'sell'
  id: number
  confidence: number
}

export interface IStrategy {
  onQuote(quote: IQuote): void
}
