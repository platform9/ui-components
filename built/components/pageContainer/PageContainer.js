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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContext = void 0;
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const extraHeaderRef = react_1.default.createRef();
exports.PageContext = react_1.default.createContext({
    extraHeaderContainer: null,
});
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        position: 'relative',
    },
    header: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        zIndex: 1,
        position: 'relative',
        color: theme.palette.text.primary,
    },
    headerContents: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    extraHeader: {
        position: ({ floatingHeader }) => (floatingHeader ? 'absolute' : 'static'),
        top: ({ floatingHeader }) => (floatingHeader ? '100%' : 'none'),
        right: 0,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end',
    },
    content: {
        zIndex: 0,
        minHeight: 400,
    },
}));
/**
 * Component to be used as a container for the sections contents which allows to use
 * PageContainerHeader to render extra header contents dynamically within any children and also
 * exposes a "header" prop to render any arbitrary fixed header content
 */
const PageContainer = (_a) => {
    var { children, header = undefined, className = '', floatingHeader } = _a, rest = __rest(_a, ["children", "header", "className", "floatingHeader"]);
    const classes = useStyles({ floatingHeader });
    const [extraHeaderContainer, setExtraHeaderContainer] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // We must set the extraHeader element ref in the state when the component is mounted
        // so that it is correctly updated and reflected in the PageContext consumers
        setExtraHeaderContainer(extraHeaderRef.current);
    }, []);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.root, className) },
        react_1.default.createElement("div", { className: classes.header },
            header && react_1.default.createElement("div", { className: classes.headerContents }, header),
            react_1.default.createElement("div", { className: classes.extraHeader, ref: extraHeaderRef })),
        react_1.default.createElement("div", { className: classes.content },
            react_1.default.createElement(exports.PageContext.Provider, { value: { extraHeaderContainer } }, children))));
};
PageContainer.propTypes = {
    header: prop_types_1.default.node,
    // eslint-disable-next-line react/no-unused-prop-types
    floatingHeader: prop_types_1.default.bool,
};
PageContainer.defaultProps = {
    floatingHeader: true,
};
exports.default = PageContainer;
//# sourceMappingURL=PageContainer.js.map