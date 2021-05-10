import * as React from 'react';
import { CoordinateUnit } from '../units';
import { GeometryJSON } from '../../geometry';
import { Shape } from '../../shape-utils';
declare type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Okay button handler */
    onOk: (geo: GeometryJSON) => void;
};
declare type GeoEditorProps = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
};
declare type GeoEditorComponent = React.ComponentType<GeoEditorProps>;
declare type FinalizeGeo = (geo: GeometryJSON) => GeometryJSON;
declare const geoEditorToDialog: (GeoEditor: React.ComponentType<GeoEditorProps>, defaultShape: Shape, finalizeGeo: FinalizeGeo) => React.ComponentType<Props>;
export { FinalizeGeo, GeoEditorComponent, geoEditorToDialog, GeoEditorProps, Props as GeoEditorDialogProps, };