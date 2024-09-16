import * as React from 'react';
import { DMS } from '../dms-formatting';
type BaseProps = {
    /** DMS value */
    value: DMS;
    /** Called on change */
    setValue: (value: DMS) => void;
};
type Props = BaseProps & {
    maxDegrees: number;
    negativeHeadingTooltip: string;
    positiveHeadingTooltip: string;
    negativeHeadingName: string;
    positiveHeadingName: string;
};
declare const DMSValueEditor: React.SFC<Props>;
declare const DMSLatitudeEditor: React.SFC<BaseProps>;
declare const DMSLongitudeEditor: React.SFC<BaseProps>;
export { DMSLatitudeEditor, DMSLongitudeEditor, DMSValueEditor };
