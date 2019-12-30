export async function getPortfolios(firestoreClient) {
  return await firestoreClient.collection('portfolios').get()
}
