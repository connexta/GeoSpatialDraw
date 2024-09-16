import * as React from 'react';
import Props from '../point-editor-props';
import { LatLonDD } from '../coordinate-converter';
declare class USNGPointEditor extends React.Component<Props> {
    unitConverter: {
        isUSNG: (usng: string) => 0 | string;
        USNGtoLL: (usng: 0 | string, getCenter: boolean) => LatLonDD;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export default USNGPointEditor;
