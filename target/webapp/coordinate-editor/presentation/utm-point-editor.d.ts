import * as React from 'react';
import { LatLonDD } from '../coordinate-converter';
import Props from '../point-editor-props';
declare class UTMPointEditor extends React.Component<Props> {
    unitConverter: {
        UTMtoLLwithNS: (northing: number, easting: number, zone: number, precision: null, hemisphere: 'N' | 'S') => LatLonDD;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export default UTMPointEditor;
