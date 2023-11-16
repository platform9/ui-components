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
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const defaults_1 = require("./defaults");
const helpers_1 = require("./helpers");
// @TODO Implement align and offset for PortalMenu
function PortalMenu(_a) {
    var _b;
    var { open = false, anchor, align = defaults_1.bottomLeft.align, offset = defaults_1.bottomLeft.offset, origin = 'center center', unorderedList = false, onClose, className, children } = _a, props = __rest(_a, ["open", "anchor", "align", "offset", "origin", "unorderedList", "onClose", "className", "children"]);
    const stopClickRef = (0, react_1.useRef)(true);
    const menuContainerRef = (0, react_1.useRef)();
    const rect = (_b = menuContainerRef === null || menuContainerRef === void 0 ? void 0 : menuContainerRef.current) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
    const classes = useStyles({
        vertAlign: align.vertical,
        horizAlign: align.horizontal,
        vertOffset: offset.vertical,
        horizOffset: offset.horizontal,
        origin,
        rect: rect,
    });
    const handleStopClick = (0, react_1.useCallback)((e) => {
        // e.stopPropagation isn't preventing the close cb
        // trying with a flag
        stopClickRef.current = true;
    }, [stopClickRef]);
    const handleDocumentClick = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!stopClickRef.current) {
            // on close of the menu reset the ref to its default state
            stopClickRef.current = true;
            onClose();
        }
        else {
            stopClickRef.current = false;
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (open) {
            document.addEventListener('click', handleDocumentClick);
        }
        else {
            // on remove of event listener reset the ref to its default state
            stopClickRef.current = true;
            document.removeEventListener('click', handleDocumentClick);
        }
        return () => {
            // if the menu is the user menu, and we click logout then
            // this component is unmounted before the click listener
            // can be removed on the next state update cycle
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [open]);
    const menuElement = unorderedList ? 'ul' : 'nav';
    const MenuComponent = react_1.default.createElement(menuElement, {
        className: (0, clsx_1.default)(classes.menu, 'menu-popover', { active: open }),
        onClick: handleStopClick,
    }, children);
    return (react_1.default.createElement("div", Object.assign({ ref: menuContainerRef, className: (0, clsx_1.default)(classes.menuContainer, className) }, props),
        anchor,
        open && react_1.default.createElement(PortalMenuComponent, { MenuComponent: MenuComponent })));
}
exports.default = PortalMenu;
const PortalMenuComponent = ({ MenuComponent }) => {
    const portalElem = (0, react_1.useMemo)(() => document.getElementById('row-menu-portal-root'), []);
    if (!MenuComponent)
        return null;
    return react_dom_1.default.createPortal(MenuComponent, portalElem);
};
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    menuContainer: {
        position: 'relative',
    },
    menu: {
        minWidth: 296,
        position: 'absolute',
        opacity: 0,
        backgroundColor: theme.components.card.background,
        border: `1px solid ${theme.components.card.border}`,
        borderRadius: 4,
        transformOrigin: ({ origin }) => origin,
        transition: 'opacity .2s ease, transform .2s ease',
        zIndex: 1000,
        transform: (0, helpers_1.getMenuTransform)(0),
        top: ({ rect, vertAlign, vertOffset }) => (0, helpers_1.getPortalMenuTop)({ rect, vertAlign, vertOffset }),
        left: ({ rect, horizAlign, horizOffset }) => (0, helpers_1.getPortalMenuLeft)({ rect, horizAlign, horizOffset }),
        '&.active': {
            opacity: 1,
            transform: `scale(1) translate(0%, -20%)`,
        },
    },
}));
//# sourceMappingURL=PortalMenu.js.map