import * as ol from 'openlayers'

class MockDrawingContext {
  methodCalls: any = {}
  source: any = null

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
      // @ts-ignore
      this[functionName] = function () {
        this.methodCalls[functionName].push(arguments)
      }
    })
    // @ts-ignore
    const callCounter = this.getStyle.bind(this)
    // @ts-ignore
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
