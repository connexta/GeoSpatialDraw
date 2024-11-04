class MockMap {
  testData: any = null // Change to 'any' type or define a proper interface
  constructor() {
    this.testData = {
      layerCount: 0,
      interactions: {},
      interactionsCount: 0,
      layers: [],
      eventListeners: {
        pointerdrag: new Set(),
        mousemove: new Set(),
      },
    }
  }
  addInteraction(i: any) {
    this.testData.interactions[i] = i
    this.testData.interactionsCount++
  }
  removeInteraction(i: any) {
    this.testData.interactions[i]
    this.testData.interactionsCount--
  }
  addLayer(layer: any) {
    this.testData.layerCount++
    this.testData.layers.push(layer)
  }
  getTestData() {
    return this.testData
  }
  on(event: string, listener: any) {
    this.testData.eventListeners[event].add(listener)
  }
  un(event: string, listener: any) {
    this.testData.eventListeners[event].delete(listener)
  }
}

export default MockMap
