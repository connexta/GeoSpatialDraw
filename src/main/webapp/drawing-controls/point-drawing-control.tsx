import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Type } from 'ol/geom/Geometry'

import DrawingContext from './drawing-context'
import UpdatedGeoReceiver from './geo-receiver'
import ModifiableDrawingControl from './modifiable-drawing-control'
import { Shape } from '../shape-utils'

/**
 * Drawing Control for drawing a point
 */
class PointDrawingControl extends ModifiableDrawingControl {
  /**
   * Creates drawing control
   * @param context - Drawing context
   * @param receiver - callback for returning updates to GeometryJSON
   */
  constructor(context: DrawingContext, receiver: UpdatedGeoReceiver) {
    super(context, receiver)
  }

  getShape(): Shape {
    return 'Point'
  }

  getGeoType(): Type {
    return 'Point'
  }

  cancelDrawing() {
    // the snap interaction breaks after using point drawing
    this.context.remakeInteractions()
    super.cancelDrawing()
  }

  protected makeEmptyFeature(): Feature {
    return new Feature(new Point([0, 0]))
  }
}

export default PointDrawingControl
