"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGridLinkCell = void 0;
const react_1 = __importDefault(require("react"));
const SimpleLink_1 = __importDefault(require("../../../components/SimpleLink"));
const GridDefaultCell_1 = __importDefault(require("./GridDefaultCell"));
function GridLinkCell({ children, item, routeToFn }) {
    const route = routeToFn(item);
    if (!route) {
        return react_1.default.createElement(GridDefaultCell_1.default, null, children);
    }
    return (react_1.default.createElement(SimpleLink_1.default, { lineClamp: 3, src: route }, children));
}
exports.default = GridLinkCell;
function createGridLinkCell({ routeToFn }) {
    return (props) => {
        return react_1.default.createElement(GridLinkCell, Object.assign({}, props, { routeToFn: routeToFn }));
    };
}
exports.createGridLinkCell = createGridLinkCell;
//# sourceMappingURL=GridLinkCell.js.map