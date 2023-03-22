import defaultTheme from './default';
export { default } from './default';
export declare enum ThemeLabels {
    default = "Default",
    light = "Light",
    dark = "Dark",
    'ultra-dark' = "Ultra Dark"
}
export declare const themesByKey: Record<keyof typeof ThemeLabels, typeof defaultTheme>;
