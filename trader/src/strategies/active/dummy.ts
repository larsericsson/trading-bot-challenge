const DummyStrategy = {
  onQuote: function(quote) {
    console.log('dummy got quote')
    const buy: boolean = true
    return buy
  }
}

export { DummyStrategy }
