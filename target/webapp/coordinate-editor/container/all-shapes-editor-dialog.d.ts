import * as React from 'react';
import { Shape } from '../../shape-utils';
import { GeometryJSON } from '../../geometry';
type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Okay button handler */
    onOk: (geo: GeometryJSON) => void;
    /** Geometry shape */
    shape: Shape;
};
declare const AllShapesEditorDialog: React.SFC<Props>;
export default AllShapesEditorDialog;
