const DummyStrategy = {
  onQuote: function(quote) {
    const buy: boolean = true
    return buy
  }
}

export { DummyStrategy }
