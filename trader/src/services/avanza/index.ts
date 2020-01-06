import * as Avanza from 'avanza'
import { IAvanzaConfig /*, IQuote */ } from './../../interfaces'

const avanza = new Avanza()

export async function createClient(config: IAvanzaConfig, onQuotes) {
  try {
    await avanza.authenticate(config.credentials)

    const positions = await avanza.getAccountOverview(config.accountId)
    console.dir(positions)

    avanza.subscribe(Avanza.QUOTES, '5479', onQuotes)
  } catch (e) {
    console.error(e)
  }

  return avanza
}
