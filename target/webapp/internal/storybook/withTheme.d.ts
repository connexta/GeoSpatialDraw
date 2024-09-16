/// <reference types="react" />
import './fonts.css';
type Story = () => any;
declare const withTheme: (story: Story) => JSX.Element;
export default withTheme;
