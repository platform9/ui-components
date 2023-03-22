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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const Tooltip_1 = __importDefault(require("../../elements/tooltip/Tooltip"));
const defaults_1 = require("../../elements/menu/defaults");
const Text_1 = __importDefault(require("../../elements/Text"));
const misc_1 = require("../../utils/misc");
const test_helpers_1 = __importDefault(require("../../utils/test-helpers"));
const clsx_1 = __importDefault(require("clsx"));
const defaultTooltipProps = Object.assign(Object.assign({}, defaults_1.topMiddle), { origin: 'right bottom' });
const defaultVariant = 'default';
const getTooltipProps = misc_1.memoize((tooltipBody, text) => {
    if (tooltipBody && typeof tooltipBody !== 'string')
        return { customBody: tooltipBody };
    return { message: tooltipBody !== null && tooltipBody !== void 0 ? tooltipBody : text };
});
function Badge({ text, additionalText, variant = defaultVariant, ellipsisAt = 15, canDismissEllipsis = false, bold = true, tooltipBody = undefined, tooltipProps = defaultTooltipProps, className, }) {
    const classes = useStyles({ variant });
    const [showAll, setShowAll] = react_1.useState(false);
    const shouldTruncateText = !showAll && text.length > ellipsisAt && ellipsisAt !== null;
    const textToShow = shouldTruncateText ? text.substring(0, ellipsisAt) : text;
    return (react_1.default.createElement(Tooltip_1.default, Object.assign({}, tooltipProps, getTooltipProps(tooltipBody, text)),
        react_1.default.createElement("div", { className: clsx_1.default(classes.badge, className) },
            react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default(textToShow), variant: bold ? 'caption1' : 'body2', component: "span", className: clsx_1.default('badgeText', classes.badgeText) },
                textToShow,
                shouldTruncateText && '...'),
            additionalText && (react_1.default.createElement(Text_1.default, { "data-testid": test_helpers_1.default(additionalText), variant: bold ? 'caption1' : 'body2', className: clsx_1.default('additionalText', classes.additionalText) }, additionalText)),
            canDismissEllipsis && (react_1.default.createElement("div", { className: classes.showMore, onClick: () => setShowAll(!showAll) },
                react_1.default.createElement(Text_1.default, { className: classes.showMoreText, variant: "caption1" }, showAll ? 'Show Less' : 'Show More'))))));
}
exports.default = Badge;
const useStyles = styles_1.makeStyles((theme) => ({
    badge: {
        width: 'max-content',
        borderRadius: 4,
        padding: '2px 8px 4px 8px',
        color: ({ variant }) => { var _a, _b; return (_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.color; },
        backgroundColor: ({ variant }) => { var _a, _b; return (_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.background; },
        whiteSpace: 'nowrap',
        border: ({ variant }) => { var _a, _b; return `1px solid ${(_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.background}`; },
    },
    badgeText: {
        color: ({ variant }) => { var _a, _b; return (_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.color; },
    },
    additionalText: {
        display: 'inline-table',
        margin: '-2px -8px -4px 8px',
        color: ({ variant }) => { var _a, _b; return (_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.color; },
        backgroundColor: ({ variant }) => { var _a, _b; return misc_1.lightenDarkenColor((_b = (_a = theme.components.badge) === null || _a === void 0 ? void 0 : _a[variant]) === null || _b === void 0 ? void 0 : _b.background, 15); },
    },
}));
//# sourceMappingURL=Badge.js.map