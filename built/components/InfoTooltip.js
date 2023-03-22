"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
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
exports.withInfoTooltip = void 0;
const tooltip_1 = __importDefault(require("../elements/tooltip"));
const react_1 = __importStar(require("react"));
const misc_1 = require("../utils/misc");
class InfoTooltip extends react_1.PureComponent {
    constructor() {
        super(...arguments);
        // for some reason the styles are not propagating to the info tooltip
        this.renderTitle = misc_1.memoize((info) => react_1.default.createElement("span", null, info));
    }
    render() {
        const { info, classes = {}, align, offset, children } = this.props;
        return info ? (react_1.default.createElement(tooltip_1.default, { align: align, offset: offset, message: this.renderTitle(info) }, children)) : (children);
    }
}
// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const withInfoTooltip = (Component) => react_1.default.forwardRef((_a, ref) => {
    var { info, infoPlacement } = _a, props = __rest(_a, ["info", "infoPlacement"]);
    return (react_1.default.createElement(InfoTooltip, { info: info, align: infoPlacement === null || infoPlacement === void 0 ? void 0 : infoPlacement.align, offset: infoPlacement === null || infoPlacement === void 0 ? void 0 : infoPlacement.offset },
        react_1.default.createElement(Component, Object.assign({}, props, { info: info, ref: ref }))));
});
exports.withInfoTooltip = withInfoTooltip;
exports.default = InfoTooltip;
//# sourceMappingURL=InfoTooltip.js.map