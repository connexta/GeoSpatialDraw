import * as React from 'react';
import { BBox, BBoxEditorProps as Props } from '../bbox-editor-props';
declare class USNGBBoxEditor extends React.Component<Props> {
    unitConverter: {
        isUSNG: (usng: string) => 0 | string;
        USNGtoLL: (usng: 0 | string, getCenter: boolean) => BBox;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export default USNGBBoxEditor;
