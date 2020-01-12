import Avanza from 'avanza-api'
import { IAvanzaConfig /*, IQuote */ } from './../../interfaces'

export * from './getPortfolio'

const avanza = new Avanza()

export async function createClient(config: IAvanzaConfig, onQuotes) {
  try {
    await avanza.authenticate(config.credentials)
  } catch (e) {
    console.log('Error authenticating with Avanza:')
    console.error(e)
  }

  return avanza
}
