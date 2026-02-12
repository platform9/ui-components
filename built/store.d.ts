declare const customThemeKey: "theme", themeReducer: import("redux").Reducer<import("./theme-manager/createThemeSlice").ThemeReducer, import("redux").AnyAction>, themeActions: import("@reduxjs/toolkit").CaseReducerActions<{
    updateGlobalTheme: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: import("./theme-manager/createThemeSlice").ThemeConfig;
        type: string;
    }) => import("./theme-manager/createThemeSlice").ThemeReducer;
    updateThemeComponent: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: import("./theme-manager/createThemeSlice").UpdateComponentAction;
        type: string;
    }) => import("./theme-manager/createThemeSlice").ThemeReducer;
    updateTheme: (state: import("immer/dist/internal").WritableDraft<import("./theme-manager/createThemeSlice").ThemeReducer>, { payload }: {
        payload: Partial<import("./theme-manager/createThemeSlice").ThemeReducer>;
        type: string;
    }) => import("./theme-manager/createThemeSlice").ThemeReducer;
    clearTheme: () => any;
}, "theme">;
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").CombinedState<{
    theme: import("./theme-manager/createThemeSlice").ThemeReducer;
}>, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("redux").CombinedState<{
    theme: import("./theme-manager/createThemeSlice").ThemeReducer;
}>, import("redux").AnyAction, undefined>]>>;
export { customThemeKey, themeReducer, themeActions };
export default store;
