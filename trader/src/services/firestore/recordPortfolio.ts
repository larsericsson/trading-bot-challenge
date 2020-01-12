export async function recordPortfolio(
  firestoreClient,
  portfolioId: String,
  portfolio
): Promise<void> {
  try {
    await firestoreClient
      .collection('portfolios')
      .doc(portfolioId)
      .collection('instances')
      .doc(`${Date.now()}`)
      .set(portfolio)

    console.log(`New instance of portfolio ${portfolioId} stored`)
  } catch (e) {
    console.log(`Error storing instance of portfolio ${portfolioId}`)
    console.error(e)
  }
}
