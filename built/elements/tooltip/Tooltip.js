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
const Tooltip_1 = __importDefault(require("@material-ui/core/Tooltip"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
// Map Align to MUI placement string
function mapAlignToPlacement(align) {
    if (!align)
        return 'right';
    const { vertical, horizontal } = align;
    if (vertical === 'top') {
        if (horizontal === 'left')
            return 'top-start';
        if (horizontal === 'middle')
            return 'top';
        if (horizontal === 'right')
            return 'top-end';
    }
    if (vertical === 'middle') {
        if (horizontal === 'left')
            return 'left';
        if (horizontal === 'middle')
            return 'bottom'; // fallback
        if (horizontal === 'right')
            return 'right';
    }
    if (vertical === 'bottom') {
        if (horizontal === 'left')
            return 'bottom-start';
        if (horizontal === 'middle')
            return 'bottom';
        if (horizontal === 'right')
            return 'bottom-end';
    }
    return 'right';
}
const Tooltip = (_a) => {
    var { message, customBody, align, offset, // Not directly supported by MUI Tooltip, can be handled via PopperProps if needed
    origin, // Not directly supported, but can be handled via placement
    children, className, customClassName } = _a, rest = __rest(_a, ["message", "customBody", "align", "offset", "origin", "children", "className", "customClassName"]);
    const placement = mapAlignToPlacement(align);
    const tooltipContent = customBody !== null && customBody !== void 0 ? customBody : message;
    const classes = useStyles({
        customBody: react_1.default.isValidElement(customBody),
    });
    const tooltipClass = (0, clsx_1.default)(classes.muiTooltip, customClassName);
    return (react_1.default.createElement(Tooltip_1.default, Object.assign({ title: tooltipContent || '', placement: placement, classes: { tooltip: tooltipClass }, PopperProps: offset
            ? {
                modifiers: {
                    offset: { enabled: true, offset: `${offset.horizontal},${offset.vertical}` },
                },
            }
            : undefined, interactive: true }, rest),
        react_1.default.createElement("div", { className: (0, clsx_1.default)(className, 'tooltip-container') }, children)));
};
exports.default = Tooltip;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    muiTooltip: Object.assign(Object.assign({}, theme.typography.body2), { backgroundColor: theme.components.tooltip.background, padding: ({ customBody }) => theme.spacing(customBody ? 0 : 1), width: 'max-content', maxWidth: '400px' }),
}));
//# sourceMappingURL=Tooltip.js.map