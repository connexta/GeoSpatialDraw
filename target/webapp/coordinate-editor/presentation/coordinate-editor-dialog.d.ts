import * as React from 'react';
import { CoordinateUnit } from '../units';
import { HTMLAttributes } from '../../internal/html';
type Props = HTMLAttributes & {
    /** Called when ok button is clicked */
    onOk: () => void;
    /** Called when unit changes (should set unit) */
    setUnit: (unit: CoordinateUnit) => void;
    /** Children nodes to display in dialog */
    children: React.ReactNode;
    /** Coordinate unit to display */
    unit: CoordinateUnit;
};
declare const CoordinateEditorDialog: React.SFC<Props>;
export default CoordinateEditorDialog;
