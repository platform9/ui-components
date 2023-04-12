"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderDefaultToolsPortal = exports.HeaderPrimaryActionPortal = exports.HeaderTitlePortal = exports.SidebarCustomPanePortal = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const frame_provider_1 = __importDefault(require("../../providers/frame-provider"));
function SidebarCustomPanePortal({ children }) {
    const { sidebarPaneContainer } = react_1.default.useContext(frame_provider_1.default);
    if (!sidebarPaneContainer)
        return null;
    return react_dom_1.default.createPortal(children, sidebarPaneContainer);
}
exports.SidebarCustomPanePortal = SidebarCustomPanePortal;
function HeaderTitlePortal({ children }) {
    const { headerTitleContainer } = react_1.default.useContext(frame_provider_1.default);
    if (!headerTitleContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerTitleContainer);
}
exports.HeaderTitlePortal = HeaderTitlePortal;
function HeaderPrimaryActionPortal({ children }) {
    const { headerPrimaryActionContainer } = react_1.default.useContext(frame_provider_1.default);
    if (!headerPrimaryActionContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerPrimaryActionContainer);
}
exports.HeaderPrimaryActionPortal = HeaderPrimaryActionPortal;
function HeaderDefaultToolsPortal({ children }) {
    const { headerSharedToolsContainer } = react_1.default.useContext(frame_provider_1.default);
    if (!headerSharedToolsContainer)
        return null;
    return react_dom_1.default.createPortal(children, headerSharedToolsContainer);
}
exports.HeaderDefaultToolsPortal = HeaderDefaultToolsPortal;
//# sourceMappingURL=portals.js.map