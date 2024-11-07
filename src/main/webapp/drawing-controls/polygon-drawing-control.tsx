import { Feature } from 'ol'
import { Polygon } from 'ol/geom'
import { Type } from 'ol/geom/Geometry'

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

  getGeoType(): Type {
    return 'Polygon'
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(
      new Polygon([
        [
          [0, 0],
          [0, 0],
        ],
      ])
    )
  }
}

export default PolygonDrawingControl
