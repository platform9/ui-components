declare const customThemeKey: "theme", themeReducer: import("redux").Reducer<import("./theme-manager/createThemeSlice").ThemeReducer, import("redux").AnyAction>, themeActions: import("@reduxjs/toolkit").CaseReducerActions<import("@reduxjs/toolkit").SliceCaseReducers<import("./theme-manager/createThemeSlice").ThemeReducer>, "theme">;
declare const store: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("redux").CombinedState<{
    theme: import("./theme-manager/createThemeSlice").ThemeReducer;
}>, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<any>>;
export { customThemeKey, themeReducer, themeActions };
export default store;
