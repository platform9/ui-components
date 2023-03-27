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
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const Text_1 = __importDefault(require("../../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
const helpers_1 = require("../menu/helpers");
const defaults_1 = require("../../elements/menu/defaults");
const styles_1 = require("@material-ui/styles");
const async_1 = require("../../utils/async");
const fp_1 = require("../../utils/fp");
const helpers_2 = require("./helpers");
// Time to wait before unmounting the tooltip to make it interactive
const transitionDelayMs = 50;
// The Tooltip container
exports.default = (0, styles_1.styled)(({ message, align = defaults_1.middleRight.align, offset = defaults_1.middleRight.offset, origin = 'center center', children, className, customClassName, customBody = undefined, }) => {
    const tooltipContainerRef = (0, react_1.useRef)();
    const debounceRef = (0, react_1.useRef)();
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const handleMouseOver = (0, react_1.useCallback)(() => {
        var _a;
        (_a = debounceRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
        setIsHovering(true);
    }, []);
    const handleMouseOut = (0, react_1.useCallback)(() => {
        var _a;
        (_a = debounceRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
        debounceRef.current = (0, async_1.debounce)(() => {
            setIsHovering(false);
        }, transitionDelayMs);
        debounceRef.current();
    }, []);
    const handleMouseClick = (0, react_1.useCallback)(() => {
        var _a;
        // Make sure we are still hovering this element after clicking some element in the container
        // This fixes the issue with elements shown outside the tooltip container (e.g. dropdown menu)
        // not triggering an "onMouseLeave" event when selecting an item
        (_a = debounceRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
        debounceRef.current = (0, async_1.debounce)(() => {
            var _a;
            if (isHovering && ((_a = tooltipContainerRef.current) === null || _a === void 0 ? void 0 : _a.matches(':hover')) === false) {
                setIsHovering(false);
            }
        }, transitionDelayMs);
        debounceRef.current();
    }, [isHovering]);
    (0, react_1.useEffect)(() => {
        // Cancel debouncing when component gets unmounted
        return () => { var _a; return (_a = debounceRef.current) === null || _a === void 0 ? void 0 : _a.cancel(); };
    }, []);
    const hasCustomBody = !!customBody;
    const hasContent = !!message || hasCustomBody;
    return (react_1.default.createElement("div", { ref: tooltipContainerRef, className: (0, clsx_1.default)(className, 'tooltip-container'), onMouseEnter: handleMouseOver, onMouseLeave: handleMouseOut, onClick: handleMouseClick },
        hasContent && isHovering && (react_1.default.createElement(Tooltip, { customClass: customClassName, hasCustomBody: hasCustomBody, origin: origin, align: align, offset: offset, containerElem: tooltipContainerRef.current }, customBody !== null && customBody !== void 0 ? customBody : message)),
        children));
})({
// TODO: Add hint question mark tooltip to dropdowns like we do for text inputs
// then add this back and remove the custom styling on ValidatedForm.js
// position: 'relative', * prob will not be needed
// width: 'max-content',
});
const TooltipContainer = (0, styles_1.styled)('div')(({ rect, align: { vertical: vertAlign, horizontal: horizAlign }, offset: { vertical: vertOffset, horizontal: horizOffset }, }) => ({
    position: 'absolute',
    top: (0, helpers_2.getTooltipTop)(rect, vertAlign, vertOffset),
    left: (0, helpers_2.getTooltipLeft)(rect, horizAlign, horizOffset),
}));
const Tooltip = (0, styles_1.styled)(({ className, customClass, children, containerElem, align, offset, }) => {
    const portalElem = (0, react_1.useMemo)(() => document.getElementById('tooltip-portal-root'), []);
    const [transitionClass, setTransitionClass] = (0, react_1.useState)('transitionStart');
    (0, react_1.useEffect)(() => {
        setTransitionClass('transitionEnd');
    }, []);
    if (!containerElem)
        return null;
    const rect = containerElem.getBoundingClientRect();
    const content = (react_1.default.createElement(TooltipContainer, { rect: rect, align: align, offset: offset },
        react_1.default.createElement(Text_1.default, { variant: "body2", component: "div", className: (0, clsx_1.default)(className, customClass, transitionClass), onClick: fp_1.stopPropagation }, children)));
    return react_dom_1.default.createPortal(content, portalElem);
})(({ theme, align: { vertical: vertAlign, horizontal: horizAlign }, hasCustomBody, origin }) => ({
    '&.transitionStart ': {
        opacity: 0,
        transform: (0, helpers_1.getMenuTransform)(0)({ vertAlign, horizAlign }),
    },
    '&.transitionEnd ': {
        opacity: 1,
        transform: (0, helpers_1.getMenuTransform)(1)({ vertAlign, horizAlign }),
    },
    position: 'absolute',
    transformOrigin: origin,
    transition: 'opacity .2s ease, transform .2s ease',
    zIndex: 10000,
    top: (0, helpers_1.getMenuTop)({ vertAlign }),
    right: (0, helpers_1.getMenuRight)({ horizAlign }),
    bottom: (0, helpers_1.getMenuBottom)({ vertAlign }),
    left: (0, helpers_1.getMenuLeft)({ horizAlign }),
    backgroundColor: theme.components.tooltip.background,
    border: 'none',
    borderRadius: 4,
    color: theme.components.tooltip.text,
    width: 'max-content',
    padding: !hasCustomBody ? 8 : null,
    maxWidth: !hasCustomBody ? 300 : null,
}));
//# sourceMappingURL=Tooltip.js.map