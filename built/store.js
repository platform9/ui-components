"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeActions = exports.themeReducer = exports.customThemeKey = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createThemeSlice_1 = __importDefault(require("./theme-manager/createThemeSlice"));
const CustomThemeHelper_1 = __importDefault(require("./theme-manager/CustomThemeHelper"));
// For testing purposes only. This is just to simulate what the
// app consuming this plugin would need to do to get the theme
// reducer
const customColorPalette = {
    purple: {
        '200': '#FCF2FB',
        '300': '#F6D7F4',
        '400': '#C670BF',
        '500': '#95098A',
        '600': '#7D0572',
        '700': '#64005A',
        '800': '#4B003F',
    },
    blue: {
        '200': '#F2F8FD',
        '300': '#D8EBF9',
        '400': '#6CA3E1',
        '500': '#005AC8',
        '600': '#0047A5',
        '700': '#003482',
        '800': '#001851',
    },
    teal: {
        '200': '#ECFBFA',
        '300': '#CDFBF7',
        '400': '#69DFDC',
        '500': '#00BEBC',
        '600': '#0096A5',
        '700': '#006E8D',
        '800': '#00445E',
    },
    orange: {
        '200': '#FFF5EC',
        '300': '#FEEBDA',
        '400': '#FED7B4',
        '500': '#FDC38F',
        '600': '#FCB069',
        '700': '#FB9C44',
        '800': '#E36D00',
    },
};
// Create an instance of CustomThemeHelper to help generate a custom theme
// It accepts a custom color definition and a typography definition as optional params
const themeHelper = new CustomThemeHelper_1.default(customColorPalette);
themeHelper.setColorPaletteOptions({
    primary: 'blue',
    secondary: 'grey',
});
// Call this setComponentsTheme method to customize the components styling. Colors is taken from
// the colors definition that you passed in earlier. If you did not supply a custom color definition, the default
// PF9 one is used
themeHelper.setComponentsTheme((colors) => ({
    card: {
        background: colors.purple[300],
    },
    badge: {
        primary: {
            color: colors.purple[300],
            background: colors.blue[500],
        },
    },
}));
const customTheme = themeHelper.generateCustomTheme();
const { customThemeKey, themeReducer, themeActions } = createThemeSlice_1.default(customTheme);
exports.customThemeKey = customThemeKey;
exports.themeReducer = themeReducer;
exports.themeActions = themeActions;
const rootReducer = toolkit_1.combineReducers({
    [customThemeKey]: themeReducer,
});
const store = toolkit_1.configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true,
});
exports.default = store;
//# sourceMappingURL=store.js.map