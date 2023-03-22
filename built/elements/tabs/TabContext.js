"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTabContext = exports.TabContext = void 0;
const react_1 = __importDefault(require("react"));
exports.TabContext = react_1.default.createContext({
    activeTab: null,
    addTab: (fields) => null,
});
const withTabContext = (Component) => (props) => {
    return (react_1.default.createElement(exports.TabContext.Consumer, null, ({ activeTab, addTab }) => react_1.default.createElement(Component, Object.assign({}, props, { activeTab: activeTab, addTab: addTab }))));
};
exports.withTabContext = withTabContext;
//# sourceMappingURL=TabContext.js.map