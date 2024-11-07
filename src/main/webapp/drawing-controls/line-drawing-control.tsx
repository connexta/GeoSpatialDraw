import { Feature } from 'ol'
import { LineString } from 'ol/geom'
import { Type } from 'ol/geom/Geometry'

import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a line
 */
class LineDrawingControl extends ModifiableDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Line'
  }

  getGeoType(): Type {
    return 'LineString'
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(new LineString([[0, 0]]))
  }
}

export default LineDrawingControl
