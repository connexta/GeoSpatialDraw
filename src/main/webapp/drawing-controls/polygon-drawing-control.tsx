import * as ol from 'openlayers'
import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a polygon
 */
class PolygonDrawingControl extends ModifiableDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Polygon'
  }

  getGeoType(): ol.geom.GeometryType {
    return 'Polygon'
  }

  protected makeEmptyFeature(): ol.Feature {
    return new ol.Feature(
      new ol.geom.Polygon([
        [
          [0, 0],
          [0, 0],
        ],
      ])
    )
  }
}

export default PolygonDrawingControl
