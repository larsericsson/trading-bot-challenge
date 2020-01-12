export interface IAvanzaCredentials {
  username: string
  password: string
  totpSecret: string
}

export interface IAvanzaConfig {
  credentials: IAvanzaCredentials
  accountId: string
}

export interface IConfig {
  portfolioId: string
  avanza: IAvanzaConfig
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
