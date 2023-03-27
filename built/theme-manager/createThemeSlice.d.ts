import { PayloadAction } from '@reduxjs/toolkit';
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
    themeActions: import("@reduxjs/toolkit").CaseReducerActions<{
        updateGlobalTheme: (state: import("immer/dist/internal").WritableDraft<ThemeReducer>, { payload }: {
            payload: any;
            type: string;
        }) => {
            global: any;
            theme: import("immer/dist/internal").WritableDraft<Theme>;
            components: import("immer/dist/internal").WritableDraft<Components>;
        };
        updateThemeComponent: (state: import("immer/dist/internal").WritableDraft<ThemeReducer>, { payload }: PayloadAction<UpdateComponentAction>) => {
            components: Components;
            theme: import("immer/dist/internal").WritableDraft<Theme>;
            global?: import("immer/dist/internal").WritableDraft<ThemeConfig>;
        };
        updateTheme: (state: import("immer/dist/internal").WritableDraft<ThemeReducer>, { payload }: PayloadAction<Partial<ThemeReducer>>) => {
            theme: Theme | import("immer/dist/internal").WritableDraft<Theme>;
            components: Components | import("immer/dist/internal").WritableDraft<Components>;
            global?: ThemeConfig | import("immer/dist/internal").WritableDraft<ThemeConfig>;
        };
        clearTheme: () => any;
    }, "theme">;
};
export default createThemeSlice;
