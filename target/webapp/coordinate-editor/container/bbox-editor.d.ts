import * as React from 'react';
import * as Units from '../units';
import { Extent } from '../../geometry';
type Props = {
    /** Set extent array of bounding box in lat lon */
    setExtent: (extent: Extent) => void;
    /** Get extent array of bounding box in lat lon */
    extent: Extent;
    /** Coordinate Unit to display */
    unit: Units.CoordinateUnit;
};
declare const BBoxEditor: React.SFC<Props>;
export default BBoxEditor;
