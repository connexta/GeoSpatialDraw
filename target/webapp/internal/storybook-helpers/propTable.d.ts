import * as React from 'react';
type PropDefinition = {
    required?: boolean;
    propType?: string;
    defaultValue?: string;
    description?: string;
};
interface PropTypes {
    [key: string]: PropDefinition;
}
declare const tableComponentFactory: (propTypes: PropTypes) => React.SFC;
export default tableComponentFactory;
