import * as React from 'react';
import { GeometryJSON, Extent } from '../../geometry';
import { CoordinateUnit } from '../units';
import { FinalizeGeo } from './geo-editor-to-dialog';
type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
};
declare const updateGeoWithExtentBBox: (geo: GeometryJSON, extent: Extent) => GeometryJSON;
declare const finalizeGeo: FinalizeGeo;
/**
 * Some comment that should show up
 */
declare class BBoxGeoEditor extends React.Component<Props> {
    render(): JSX.Element;
}
declare const BBoxEditorDialog: React.ComponentType<import("./geo-editor-to-dialog").GeoEditorDialogProps>;
export { BBoxGeoEditor, BBoxEditorDialog, updateGeoWithExtentBBox, finalizeGeo };
