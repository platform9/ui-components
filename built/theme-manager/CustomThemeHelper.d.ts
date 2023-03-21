import { ThemeColors } from './themes/helpers';
import { Components, Typography } from './themes/model';
type ComponentsStyleGenerator = (colors: ThemeColors) => CustomComponentStyles;
interface CustomComponentStyles {
    [componentName: string]: any;
}
export default class CustomThemeHelper {
    private colorPaletteOptions;
    private typographyOptions;
    private colorsDefinition;
    private typographyDefinition;
    private components;
    constructor(colorsDefinition?: ThemeColors, typographyDefinition?: Typography);
    setColorPaletteOptions({ primary, secondary, type, themeKey, }: {
        primary?: string;
        secondary?: string;
        type?: "light";
        themeKey?: "default";
    }): void;
    setTypography({ fontFamily, fontSize, fontWeightLight, fontWeightRegular, fontWeightMedium, }: {
        fontFamily?: string;
        fontSize?: number;
        fontWeightLight?: number;
        fontWeightRegular?: number;
        fontWeightMedium?: number;
    }): void;
    setComponentsTheme(componentsStyleGenerator: ComponentsStyleGenerator): void;
    generateCustomTheme(): {
        theme: import("./themes/model").default;
        components: Components;
    };
}
export {};
