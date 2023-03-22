"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCustomTheme = exports.useCustomTheme = exports.loadingStyles = exports.CustomThemeProvider = exports.CustomThemeConsumer = void 0;
const styles_1 = require("@material-ui/styles");
const styles_2 = require("@material-ui/core/styles");
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const selector_1 = require("./selector");
const CustomThemeContext = react_1.default.createContext({
    theme: null,
    setCustomTheme: (theme) => {
        throw new Error('CustomThemeProvider not found');
    },
});
exports.CustomThemeConsumer = CustomThemeContext.Consumer;
exports.CustomThemeProvider = CustomThemeContext.Provider;
exports.loadingStyles = {
    width: '100%',
    fontSize: '20px',
    textAlign: 'center',
    marginTop: '4rem',
};
function ThemeManager({ themeActions, children }) {
    const dispatch = react_redux_1.useDispatch();
    const jsonTheme = react_redux_1.useSelector(selector_1.themeSelector);
    const setCustomTheme = react_1.useCallback((customTheme, updateUserPrefs = true) => {
        dispatch(themeActions.updateTheme(customTheme));
    }, [jsonTheme]);
    // TODO: Our current theme (AppTheme) is not extending the MUI theme correctly
    // Until we fix it we have to trick the TS engine to swallow this
    const theme = react_1.useMemo(() => styles_2.createTheme(jsonTheme), [jsonTheme]);
    // // Rendering the app before the theme is loaded will have issues because `withStyles`
    // // requires the `theme` object to exist.
    if (!jsonTheme) {
        return react_1.default.createElement("h2", { style: exports.loadingStyles }, "Loading theme...");
    }
    return (react_1.default.createElement(styles_1.ThemeProvider, { theme: theme },
        react_1.default.createElement(exports.CustomThemeProvider, { value: { theme, setCustomTheme } }, children)));
}
exports.default = ThemeManager;
function useCustomTheme() {
    const { theme, setCustomTheme } = react_1.useContext(CustomThemeContext);
    return [theme, setCustomTheme];
}
exports.useCustomTheme = useCustomTheme;
exports.withCustomTheme = (Component) => (props) => (react_1.default.createElement(exports.CustomThemeConsumer, null, ({ theme, setCustomTheme }) => (react_1.default.createElement(Component, Object.assign({}, props, { theme: theme, setCustomTheme: setCustomTheme })))));
//# sourceMappingURL=ThemeManager.js.map