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
exports.Empty = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Header_1 = __importDefault(require("../../elements/header/Header"));
const frame_provider_1 = __importDefault(require("../../providers/frame-provider"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const Text_1 = __importDefault(require("../../elements/Text"));
// Mock Frame Provider
const MockFrameProvider = ({ children }) => {
    const [refs, setRefs] = (0, react_1.useState)({
        sidebarPaneContainer: null,
        headerTitleContainer: null,
        headerPrimaryActionContainer: null,
        headerSharedToolsContainer: null,
        contentMainContainer: null,
    });
    const setFrameContainerRef = (payload) => {
        setRefs(prev => (Object.assign(Object.assign({}, prev), payload)));
    };
    return (react_1.default.createElement(frame_provider_1.default.Provider, { value: Object.assign(Object.assign({}, refs), { setFrameContainerRef }) }, children));
};
const meta = {
    title: 'Elements/Header',
    component: Header_1.default,
    decorators: [
        (Story) => (react_1.default.createElement(MockFrameProvider, null,
            react_1.default.createElement("div", { style: { border: '1px solid #ccc' } },
                react_1.default.createElement(Story, null))))
    ]
};
exports.default = meta;
const HeaderTitlePortal = ({ children }) => {
    const { headerTitleContainer } = (0, react_1.useContext)(frame_provider_1.default);
    if (!headerTitleContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerTitleContainer);
};
const HeaderPrimaryActionPortal = ({ children }) => {
    const { headerPrimaryActionContainer } = (0, react_1.useContext)(frame_provider_1.default);
    if (!headerPrimaryActionContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerPrimaryActionContainer);
};
const HeaderDefaultToolsPortal = ({ children }) => {
    const { headerSharedToolsContainer } = (0, react_1.useContext)(frame_provider_1.default);
    if (!headerSharedToolsContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerSharedToolsContainer);
};
const HeaderContent = () => (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(HeaderTitlePortal, null,
        react_1.default.createElement(Text_1.default, { variant: "h3" }, "Page Title")),
    react_1.default.createElement(HeaderPrimaryActionPortal, null,
        react_1.default.createElement(Button_1.default, { variant: "primary" }, "Primary Action")),
    react_1.default.createElement(HeaderDefaultToolsPortal, null,
        react_1.default.createElement(Button_1.default, { variant: "secondary", icon: "cog" }, "Settings"))));
exports.Default = {
    render: function DefaultStory() {
        const { headerTitleContainer, headerPrimaryActionContainer, headerSharedToolsContainer } = (0, react_1.useContext)(frame_provider_1.default);
        const [isReady, setIsReady] = (0, react_1.useState)(false);
        (0, react_1.useEffect)(() => {
            if (headerTitleContainer && headerPrimaryActionContainer && headerSharedToolsContainer) {
                setIsReady(true);
            }
        }, [headerTitleContainer, headerPrimaryActionContainer, headerSharedToolsContainer]);
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(Header_1.default, null),
            react_1.default.createElement(HeaderContent, null)));
    },
};
exports.Empty = {
    render: () => react_1.default.createElement(Header_1.default, null)
};
//# sourceMappingURL=Header.stories.js.map