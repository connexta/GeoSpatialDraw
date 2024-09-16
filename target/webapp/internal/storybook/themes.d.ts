import { ThemeInterface } from './theme-interface';
export type ColorMode = 'dark' | 'light' | 'sea';
export type SpacingMode = 'comfortable' | 'cozy' | 'compact';
type ThemeOptions = {
    colors: ColorMode;
    spacing: SpacingMode;
};
declare const _default: (options?: ThemeOptions) => ThemeInterface;
export default _default;
