import * as Avanza from 'avanza'
import { Config } from './../../interfaces'

const avanza = new Avanza()

export async function createClient(config: Config, onQuotes) {
  try {
    await avanza.authenticate({
      username: config.username,
      password: config.password,
      totpSecret: config.totpSecret
    })

    avanza.subscribe(Avanza.QUOTES, '5479', onQuotes)
  } catch (e) {
    console.error(e.statusMessage)
  }

  return avanza
}
