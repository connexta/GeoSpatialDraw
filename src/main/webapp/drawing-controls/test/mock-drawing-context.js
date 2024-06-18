import * as ol from 'openlayers'

class MockDrawingContext {
  methodCalls = {}
  source = null

  constructor() {
    this.source = new ol.source.Vector()
    this.methodCalls = {}
    const methodList = [
      'addInteractions',
      'addInteractionsWithoutModify',
      'getStyle',
      'remakeInteractions',
      'removeFeature',
      'removeInteractions',
      'removeListeners',
      'setDrawInteraction',
      'setEvent',
      'setModifyInteraction',
      'updateBufferFeature',
      'updateFeature',
    ]
    methodList.forEach((functionName) => {
      this.methodCalls[functionName] = []
      this[functionName] = function () {
        this.methodCalls[functionName].push(arguments)
      }
    })
    const callCounter = this.getStyle.bind(this)
    this.getStyle = () => {
      callCounter()
      return []
    }
  }

  getSource() {
    return this.source
  }

  getMethodCalls() {
    return this.methodCalls
  }

  circleRadiusToMeters(radius: number): number {
    return radius
  }
}

export default MockDrawingContext
