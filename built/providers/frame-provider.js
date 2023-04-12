"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameContext = void 0;
const react_1 = require("react");
exports.FrameContext = (0, react_1.createContext)({
    setFrameContainerRef: (payload) => { },
    sidebarPaneContainer: null,
    headerTitleContainer: null,
    headerPrimaryActionContainer: null,
    headerSharedToolsContainer: null,
});
exports.default = exports.FrameContext;
//# sourceMappingURL=frame-provider.js.map