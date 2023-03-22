"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const PageContainer_1 = require("../../components/pageContainer/PageContainer");
const PageContainerHeader = ({ children }) => {
    const { extraHeaderContainer } = react_1.default.useContext(PageContainer_1.PageContext);
    if (!extraHeaderContainer) {
        return null;
    }
    return react_dom_1.default.createPortal(children, extraHeaderContainer);
};
exports.default = PageContainerHeader;
//# sourceMappingURL=PageContainerHeader.js.map