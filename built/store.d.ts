declare const customThemeKey: "theme", themeReducer: import("redux").Reducer<import("./theme-manager/createThemeSlice").ThemeReducer>, themeActions: import("@reduxjs/toolkit").CaseReducerActions<{
    updateGlobalTheme: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: any;
        type: string;
    }) => {
        global: any;
        theme: import("immer/dist/internal").WritableDraft<import("./theme-manager/themes/model").default>;
        components: import("immer/dist/internal").WritableDraft<import("./theme-manager/themes/model").Components>;
    };
    updateThemeComponent: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: import("./theme-manager/createThemeSlice").UpdateComponentAction;
        type: string;
    }) => {
        components: import("./theme-manager/themes/model").Components;
        theme: import("immer/dist/internal").WritableDraft<import("./theme-manager/themes/model").default>;
        global?: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeConfig>;
    };
    updateTheme: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: Partial<import("./theme-manager/createThemeSlice").ThemeReducer>;
        type: string;
    }) => {
        theme: import("./theme-manager/themes/model").default | import("immer/dist/internal").WritableDraft<import("./theme-manager/themes/model").default>;
        components: import("./theme-manager/themes/model").Components | import("immer/dist/internal").WritableDraft<import("./theme-manager/themes/model").Components>;
        global?: import("./theme-manager/createThemeSlice").ThemeConfig | import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeConfig>;
    };
    clearTheme: () => any;
}, "theme">;
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").CombinedState<{
    theme: import("./theme-manager/createThemeSlice").ThemeReducer;
}>, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    theme: import("./theme-manager/createThemeSlice").ThemeReducer;
}>, import("redux").AnyAction>]>>;
export { customThemeKey, themeReducer, themeActions };
export default store;
