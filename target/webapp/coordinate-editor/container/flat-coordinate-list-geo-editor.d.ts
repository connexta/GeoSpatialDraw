import * as React from 'react';
import { GeometryJSON } from '../../geometry';
import { CoordinateUnit } from '../units';
type State = {
    editIndex: number;
};
type Coordinates = [number, number][];
type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
    /** Gets coordinates from Geometry JSON */
    getCoordinatesFromGeo: (geo: GeometryJSON) => Coordinates;
    /** Returns Geometry JSON updated with new coordinates */
    updateGeoCoordinates: (geo: GeometryJSON, coordinates: Coordinates) => GeometryJSON;
};
declare class FlatCoordinateListGeoEditor extends React.Component<Props, State> {
    constructor(props: Props);
    updateGeoProperties(geo: GeometryJSON, coordinates: Coordinates): GeometryJSON;
    render(): JSX.Element;
}
export { FlatCoordinateListGeoEditor, Coordinates };
