import * as Avanza from 'avanza'
import { Config } from './../../interfaces'

const avanza = new Avanza()

export async function createClient(config: Config) {
  try {
    await avanza.authenticate({
      username: config.username,
      password: config.password,
      totpSecret: config.totpSecret
    })
  } catch (e) {
    console.error(e.statusMessage)
  }
}
