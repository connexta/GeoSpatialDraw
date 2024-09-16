import * as React from 'react';
import { HTMLAttributes } from '../../internal/html';
type Props = HTMLAttributes & {
    /** USNG string */
    value: string;
    /** Called on change */
    onChange: (value: string) => void;
};
type State = {
    value: string;
};
declare class USNGInput extends React.Component<Props, State> {
    unitConverter: {
        isUSNG: (usng: string) => 0 | string;
    };
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    render(): JSX.Element;
}
export default USNGInput;
