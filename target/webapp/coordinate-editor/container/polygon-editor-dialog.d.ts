import * as React from 'react';
import { GeometryJSON } from '../../geometry';
import { CoordinateUnit } from '../units';
type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
};
declare const PolygonGeoEditor: React.SFC<Props>;
declare const PolygonEditorDialog: React.ComponentType<import("./geo-editor-to-dialog").GeoEditorDialogProps>;
export { PolygonGeoEditor, PolygonEditorDialog };
