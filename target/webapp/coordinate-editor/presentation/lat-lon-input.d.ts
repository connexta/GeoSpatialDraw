import * as React from 'react';
import { HTMLAttributes } from '../../internal/html';
type Props = HTMLAttributes & {
    /** Decimal value */
    value: number;
    /** Called on change */
    onChange: (value: number) => void;
};
declare const LatitudeInput: React.SFC<Props>;
declare const LongitudeInput: React.SFC<Props>;
export { LatitudeInput, LongitudeInput };
