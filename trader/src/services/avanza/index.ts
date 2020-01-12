import Avanza from 'avanza-api'
import { IAvanzaConfig /*, IQuote */ } from './../../interfaces'

export * from './getPortfolio'

const avanza = new Avanza()

export async function createClient(config: IAvanzaConfig, onQuotes) {
  try {
    await avanza.authenticate(config.credentials)

    // if (avanza.isAuthenticated) {
    //   const accounts = await avanza.getAccounts()
    //   console.log(accounts)
    // }
  } catch (e) {
    console.log('Error authenticating with Avanza:')
    console.error(e)
  }

  return avanza
}
