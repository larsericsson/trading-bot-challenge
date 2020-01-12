export async function getPortfolio(avanzaClient, accountId: String) {
  // TODO: getPositionsByInstrumentType currently doesn't take accountId arg, this will return all positions
  const positionsByType = await avanzaClient.getPositionsByInstrumentType(accountId)
  return positionsByType
}
