import * as React from 'react';
import { CoordinateUnit } from '../units';
import { LengthUnit } from '../../geometry';
type Props = {
    /** Buffer */
    buffer: number;
    /** Buffer unit of measure */
    bufferUnit: LengthUnit;
    /** Array of coordinates in lon/lat */
    coordinateList: [number, number][];
    /** Coordinate unit */
    coordinateUnit: CoordinateUnit;
    /** Lattiude of current selected coordinate */
    lat: number;
    /** Longitude of current selected coordinate */
    lon: number;
    /** Sets buffer */
    setBuffer: (buffer: number) => void;
    /** Sets buffer unit of measure */
    setUnit: (unit: LengthUnit) => void;
    /** Sets coordinate at selected point */
    setCoordinate: (lat: number, lon: number) => void;
    /** Adds new coordinate at selected point */
    addCoordinate: () => void;
    /** Deletes coordiante from selected point */
    deleteCoordinate: () => void;
    /** Selects coordinate at index (should update selectedIndex) */
    selectCoordinate: (index: number) => void;
    /** Selected coordinate index */
    selectedIndex: number;
};
declare const FlatCoordinateListEditor: React.SFC<Props>;
export default FlatCoordinateListEditor;
