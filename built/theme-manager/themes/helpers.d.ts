import Theme, { Components } from './model';
interface IColor {
    '000'?: string;
    '100'?: string;
    '200'?: string;
    '300'?: string;
    '400'?: string;
    '500': string;
    '600'?: string;
    '700'?: string;
    '800'?: string;
    '900'?: string;
}
interface IMuiBaseColors {
    light?: string;
    main: string;
    dark?: string;
}
declare type IMuiColor = IColor & IMuiBaseColors;
export interface ThemeColors<T = IColor> {
    [key: string]: T;
}
export interface IPalette<T> {
    primary: keyof T;
    secondary: keyof T;
    type: IColorPalette['type'];
    themeKey: 'default' | 'light' | 'dark' | 'ultra-dark' | 'custom';
    colors: T;
}
interface IColorPalette {
    primary: IMuiColor;
    secondary: IMuiColor;
    type: 'light' | 'dark';
}
export declare function generateComponentColors({ components }: {
    components?: any[];
}, defaultComponentStyles: Components): Components;
export declare function generateColorPalette<T extends ThemeColors>({ primary, secondary, type, themeKey, colors, }: {
    primary: keyof T;
    secondary: keyof T;
    type: IColorPalette['type'];
    themeKey: IPalette<T>['themeKey'];
    colors: T;
}): {
    primary: {
        light?: string;
        main: string;
        dark?: string;
        '000'?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
    };
    secondary: {
        light?: string;
        main: string;
        dark?: string;
        '000'?: string;
        100?: string;
        200?: string;
        300?: string;
        400?: string;
        500: string;
        600?: string;
        700?: string;
        800?: string;
        900?: string;
    };
    type: "light" | "dark";
    themeKey: "light" | "dark" | "default" | "ultra-dark" | "custom";
    contrastThreshold: number;
    tonalOffset: number;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint: string;
    };
    divider: string;
    common: {
        black: string;
        white: string;
    };
};
export interface ITypography<T> {
    fontFamily?: string;
    fontSize?: number;
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightMedium?: number;
    typography: T;
}
export declare function generateTypography<T>({ fontFamily, fontSize, fontWeightLight, fontWeightRegular, fontWeightMedium, typography, }: {
    fontFamily?: string;
    fontSize?: number;
    fontWeightLight?: number;
    fontWeightRegular?: number;
    fontWeightMedium?: number;
    typography: any;
}): ITypography<T>;
export declare function generateTheme<P extends ThemeColors, T>({ palette, typography, }: {
    palette: IPalette<P>;
    typography: ITypography<T>;
}): Theme;
export interface Typography {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    display3: TextBase;
    display2: TextBase;
    display1: TextBase;
    headline: TextBase;
    title: TextBase;
    subheading: TextBase;
    body2: TextBase;
    body1: TextBase;
    caption: TextBase;
    button: TextBase;
    h1: TextBase;
    h2: TextBase;
    h3: TextBase;
    h4: TextBase;
    h5: TextBase;
    h6: TextBase;
    subtitle1: TextBase;
    subtitle2: TextBase;
    body1Next: TextBase;
    body2Next: TextBase;
    buttonNext: TextBase;
    captionNext: TextBase;
    overline: TextBase;
}
export interface TextBase {
    fontFamily: string;
    fontWeight: number;
    fontSize: string;
    lineHeight: number;
    letterSpacing: string;
    fontStretch?: string;
    fontStyle?: string;
}
export {};
