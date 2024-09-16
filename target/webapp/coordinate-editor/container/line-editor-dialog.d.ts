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
declare const LineGeoEditor: React.SFC<Props>;
declare const LineEditorDialog: React.ComponentType<import("./geo-editor-to-dialog").GeoEditorDialogProps>;
export { LineGeoEditor, LineEditorDialog };
