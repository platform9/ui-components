"use strict";
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
const react_1 = __importDefault(require("react"));
const Tooltip_1 = __importDefault(require("./Tooltip"));
function withTooltip(Component, defaultTooltipProps = {}) {
    return (props) => {
        const { tooltip, tooltipProps = defaultTooltipProps } = props, rest = __rest(props, ["tooltip", "tooltipProps"]);
        return (react_1.default.createElement(Tooltip_1.default, Object.assign({ message: tooltip }, tooltipProps),
            react_1.default.createElement(Component, Object.assign({}, rest))));
    };
}
exports.default = withTooltip;
//# sourceMappingURL=withTooltip.js.map