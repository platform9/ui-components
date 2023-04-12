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
const styles_1 = require("@material-ui/styles");
const frame_provider_1 = __importDefault(require("../../providers/frame-provider"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    header: {
        backgroundColor: theme.components.header.background,
        height: 64,
        gap: 16,
        padding: '0px 32px',
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 1fr) max-content max-content',
        alignItems: 'center',
        zIndex: 1000,
    },
    content: {
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 16,
    },
    leftMargin: {
        marginLeft: 28,
    },
}));
const headerTitleRef = react_1.default.createRef();
const headerActionRef = react_1.default.createRef();
const headerDefaultToolsRef = react_1.default.createRef();
function Header() {
    const classes = useStyles({});
    const { setFrameContainerRef } = react_1.default.useContext(frame_provider_1.default);
    (0, react_1.useEffect)(() => {
        setFrameContainerRef({
            headerTitleContainer: headerTitleRef.current,
            headerPrimaryActionContainer: headerActionRef.current,
            headerSharedToolsContainer: headerDefaultToolsRef.current,
        });
    }, []);
    return (react_1.default.createElement("header", { className: classes.header },
        react_1.default.createElement("div", { className: classes.content, ref: headerTitleRef }),
        react_1.default.createElement("div", { className: classes.content, ref: headerActionRef }),
        react_1.default.createElement("div", { className: classes.content, ref: headerDefaultToolsRef })));
}
exports.default = Header;
//# sourceMappingURL=Header.js.map