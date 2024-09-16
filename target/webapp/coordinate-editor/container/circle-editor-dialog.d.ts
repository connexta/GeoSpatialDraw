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
declare class CircleGeoEditor extends React.Component<Props> {
    render(): JSX.Element;
}
declare const CircleEditorDialog: React.ComponentType<import("./geo-editor-to-dialog").GeoEditorDialogProps>;
export { CircleEditorDialog, CircleGeoEditor };
