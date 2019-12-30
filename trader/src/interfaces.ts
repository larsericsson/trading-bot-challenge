export interface Config {
  username: string
  password: string
  totpSecret: string
}

export interface IQuote {
  name: string
}

export interface IStrategy {
  onQuote(quote: IQuote): void
}
