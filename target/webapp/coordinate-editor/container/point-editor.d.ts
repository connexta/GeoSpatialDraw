import * as React from 'react';
import * as Units from '../units';
type Props = {
    /** Latitude degrees */
    lat: number;
    /** Longitude degrees */
    lon: number;
    /** Called when the coordinates change (should update lat & lon) */
    setCoordinate: (lat: number, lon: number) => void;
    /** Coordinate Unit to display */
    unit: Units.CoordinateUnit;
};
declare const PointEditor: React.SFC<Props>;
export default PointEditor;
