"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = exports.Column = exports.ThemedContainer = exports.Container = void 0;
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const card_1 = __importDefault(require("../elements/card"));
// import { useCustomTheme } from '../themes/ThemeManager'
const dropdown_1 = __importDefault(require("../elements/dropdown"));
const modes_1 = require("../theme-manager/themes/modes");
const ThemeManager_1 = require("../theme-manager/ThemeManager");
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    columnLayout: {
        display: 'grid',
        gridAutoFlow: 'row',
        justifyItems: 'center',
        alignItems: 'center',
        gap: 16,
        padding: ({ padding }) => padding,
        backgroundColor: ({ variant }) => { var _a; return (_a = theme.components[variant]) === null || _a === void 0 ? void 0 : _a.background; },
    },
    rowLayout: {
        display: 'grid',
        gridAutoFlow: 'column',
        gap: 16,
        padding: ({ padding }) => padding,
    },
    container: {
        position: 'relative',
        minHeight: 200,
        display: 'grid',
        padding: ({ padding }) => padding,
    },
    themeSelector: {
        position: 'absolute',
        inset: '0 0 auto auto',
    },
}));
function Container({ children, title = undefined, padding = 0, }) {
    const classes = useStyles({ padding });
    return (react_1.default.createElement(card_1.default, { className: classes.container, title: title, withCustomBody: true }, children));
}
exports.Container = Container;
function ThemedContainer({ children, padding = '40px 0', }) {
    const [theme, setCurrentTheme] = (0, ThemeManager_1.useCustomTheme)();
    const handleChange = (0, react_1.useCallback)((value) => {
        setCurrentTheme(value, false);
    }, []);
    const items = (0, react_1.useMemo)(() => Object.entries(modes_1.themesByKey).map(([key, theme]) => ({
        key,
        label: modes_1.ThemeLabels[key],
        value: theme,
    })), []);
    const classes = useStyles({ padding });
    return (react_1.default.createElement(card_1.default, { className: classes.container, title: react_1.default.createElement(dropdown_1.default, { compact: true, width: 100, className: classes.themeSelector, items: items, value: theme, onChange: handleChange }), withCustomBody: true }, children));
}
exports.ThemedContainer = ThemedContainer;
function Column({ children, variant = 'card', padding = '8px 16px', }) {
    const classes = useStyles({ variant, padding });
    return react_1.default.createElement("div", { className: classes.columnLayout }, children);
}
exports.Column = Column;
function Row({ children, padding = '0' }) {
    const classes = useStyles({ padding });
    return react_1.default.createElement("div", { className: classes.rowLayout }, children);
}
exports.Row = Row;
//# sourceMappingURL=containers.js.map