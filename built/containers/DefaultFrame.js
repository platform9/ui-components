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
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const ramda_1 = require("ramda");
const styles_1 = require("@material-ui/styles");
const pluginManager_1 = __importDefault(require("../plugins/pluginManager"));
const helpers_1 = require("../plugins/helpers");
const Header_1 = __importDefault(require("../elements/header/Header"));
const frame_provider_1 = __importDefault(require("../providers/frame-provider"));
const sidebarPane = 'default';
const sidebarPaneRef = react_1.default.createRef();
function DefaultFrame({ role }) {
    const [frameRefs, setFrameRefs] = (0, react_1.useState)({});
    const setFrameContainerRef = (0, react_1.useCallback)((payload) => setFrameRefs((frames) => (0, ramda_1.mergeLeft)(frames, payload)), [setFrameRefs]);
    const plugins = pluginManager_1.default.getPlugins();
    const classes = useStyles({ sidebarPane });
    (0, react_1.useEffect)(() => {
        setFrameContainerRef({
            sidebarPaneContainer: sidebarPaneRef.current,
        });
    }, []);
    const frameValue = (0, react_1.useMemo)(() => (Object.assign(Object.assign({}, frameRefs), { setFrameContainerRef })), [frameRefs, setFrameContainerRef]);
    return (react_1.default.createElement(frame_provider_1.default.Provider, { value: frameValue },
        react_1.default.createElement("main", { className: classes.appFrame },
            react_1.default.createElement(Header_1.default, null),
            react_1.default.createElement("aside", { className: "sidebar custom-nav", ref: sidebarPaneRef }),
            react_1.default.createElement("section", { className: (0, clsx_1.default)('content-main', classes.contentMain) }, (0, helpers_1.renderMainContent)(plugins, role)))));
}
const useStyles = (0, styles_1.makeStyles)((theme) => {
    var _a, _b, _c, _d;
    return ({
        appFrame: {
            position: 'relative',
            display: 'grid',
            backgroundColor: theme.components.frame.background,
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            gridTemplateRows: 'minmax(65px, max-content) 1fr',
            gridTemplateColumns: 'max-content 1fr',
            gridTemplateAreas: ({ sidebarPane }) => sidebarPane === 'custom'
                ? '"frame-nav frame-content"'
                : '"frame-nav frame-header" "frame-nav frame-content"',
            '& > header': {
                gridArea: 'frame-header',
                visibility: ({ sidebarPane }) => (sidebarPane === 'custom' ? 'hidden' : 'visible'),
                position: ({ sidebarPane }) => (sidebarPane === 'custom' ? 'absolute' : 'inherit'),
            },
            '& > aside': {
                gridArea: 'frame-nav',
            },
            '& > section': {
                gridArea: 'frame-content',
            },
            '&:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '100%',
                height: 1,
                backgroundColor: theme.components.sidebar.border,
            },
        },
        contentMain: {
            display: 'grid',
            padding: '16px 32px',
            overflow: 'auto',
            gridAutoRows: 'max-content',
            // FF supports these fields but not webkit
            scrollbarColor: `${(_b = (_a = theme === null || theme === void 0 ? void 0 : theme.components) === null || _a === void 0 ? void 0 : _a.scrollbar) === null || _b === void 0 ? void 0 : _b.thumb} ${(_d = (_c = theme === null || theme === void 0 ? void 0 : theme.components) === null || _c === void 0 ? void 0 : _c.frame) === null || _d === void 0 ? void 0 : _d.background}`,
            scrollbarWidth: 'thin',
            '@media screen and (max-width: 768px)': {
                // iOS fix for momentum scrolling
                '-webkit-overflow-scrolling': 'touch',
            },
        },
        secondaryHeader: {
            zIndex: 1100,
        },
    });
});
exports.default = DefaultFrame;
//# sourceMappingURL=DefaultFrame.js.map