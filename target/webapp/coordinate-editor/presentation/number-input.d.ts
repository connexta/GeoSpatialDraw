import * as React from 'react';
import { HTMLAttributes } from '../../internal/html';
type Props = HTMLAttributes & {
    /** Numeric value */
    value: number | null;
    /** Maximum allowed value */
    maxValue?: number;
    /** Minimum allowed value */
    minValue?: number;
    /** Number of displayed decimal places */
    decimalPlaces?: number;
    /** Called on change */
    onChange: (value: number) => void;
};
type State = {
    stringValue: string;
};
declare class NumberInput extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    constrainedNumber(value: number | null): number | null;
    constrainedString(value: number | null): string;
    render(): JSX.Element;
}
export default NumberInput;
