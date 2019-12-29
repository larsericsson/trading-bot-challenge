import * as Avanza from 'avanza'
import { Config } from './interfaces'

const config: Config = {
  username: 'user',
  password: 'pass',
  totpSecret: 'secret'
}

const avanza = new Avanza()

async function setup() {
  try {
    await avanza.authenticate({
      username: config.username,
      password: config.password,
      totpSecret: config.totpSecret
    })
  } catch (e) {
    console.error(e)
  }
}

setup()
