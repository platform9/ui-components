"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeKey = exports.defaultThemeState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const ramda_1 = require("ramda");
const helpers_1 = require("./themes/helpers");
const dark_1 = __importDefault(require("./themes/modes/dark"));
const default_1 = __importDefault(require("./themes/modes/default"));
const light_1 = __importDefault(require("./themes/modes/light"));
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
const defaultThemeToUse = prefersLightScheme.matches
    ? light_1.default
    : prefersDarkScheme.matches
        ? dark_1.default
        : default_1.default;
exports.defaultThemeState = {
    theme: defaultThemeToUse.theme,
    components: defaultThemeToUse.components,
    global: {},
};
exports.themeKey = 'theme';
const createThemeSlice = (theme = exports.defaultThemeState) => {
    const { name: customThemeKey, reducer: themeReducer, actions: themeActions, } = toolkit_1.createSlice({
        name: exports.themeKey,
        initialState: theme,
        reducers: {
            updateGlobalTheme: (state, { payload }) => {
                return Object.assign(Object.assign({}, state), { global: payload });
            },
            updateThemeComponent: (state, { payload }) => {
                return Object.assign(Object.assign({}, state), { components: helpers_1.generateComponentColors(payload, state.components) });
            },
            // @ts-ignore
            updateTheme: (state, { payload }) => {
                return ramda_1.mergeLeft(payload, state);
            },
            clearTheme: () => {
                return default_1.default;
            },
        },
    });
    return { customThemeKey, themeReducer, themeActions };
};
exports.default = createThemeSlice;
//# sourceMappingURL=createThemeSlice.js.map