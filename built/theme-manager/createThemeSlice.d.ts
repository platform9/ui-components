import Theme, { Components } from './themes/model';
export interface ThemeReducer {
    theme: Theme;
    components: Components;
    global?: ThemeConfig;
}
export interface ThemeConfig {
    headerColor?: string;
    sidenavColor?: string;
    logoUrl?: string;
    logoSrc?: string;
    logoFileName?: string;
}
export interface UpdateComponentAction {
    components: ComponentPayload[];
}
export interface ComponentPayload {
    pathTo: string[];
    value: string;
}
export declare const defaultThemeState: ThemeReducer;
export declare const themeKey = "theme";
declare const createThemeSlice: (theme?: ThemeReducer) => {
    customThemeKey: "theme";
    themeReducer: import("redux").Reducer<ThemeReducer, import("redux").AnyAction>;
    themeActions: import("@reduxjs/toolkit").CaseReducerActions<import("@reduxjs/toolkit").SliceCaseReducers<ThemeReducer>, "theme">;
};
export default createThemeSlice;
