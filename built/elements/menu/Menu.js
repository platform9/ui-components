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
const react_1 = __importStar(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const defaults_1 = require("./defaults");
const helpers_1 = require("./helpers");
function Menu(_a) {
    var { open = false, anchor, align = defaults_1.bottomLeft.align, offset = defaults_1.bottomLeft.offset, origin = 'center center', unorderedList = false, onClose, className, children } = _a, props = __rest(_a, ["open", "anchor", "align", "offset", "origin", "unorderedList", "onClose", "className", "children"]);
    const stopClickRef = react_1.useRef(true);
    const classes = useStyles({
        vertAlign: align.vertical,
        horizAlign: align.horizontal,
        vertOffset: offset.vertical,
        horizOffset: offset.horizontal,
        origin,
    });
    const handleStopClick = react_1.useCallback((e) => {
        // e.stopPropagation isn't preventing the close cb
        // trying with a flag
        stopClickRef.current = true;
    }, [stopClickRef]);
    const handleDocumentClick = react_1.useCallback((e) => {
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
    react_1.useEffect(() => {
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
        className: clsx_1.default(classes.menu, 'menu-popover', { active: open }),
        onClick: handleStopClick,
    }, children);
    return (react_1.default.createElement("div", Object.assign({ className: clsx_1.default(classes.menuContainer, className) }, props),
        anchor,
        MenuComponent));
}
exports.default = Menu;
const useStyles = styles_1.makeStyles((theme) => ({
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
        zIndex: 100,
        transform: helpers_1.getMenuTransform(0),
        top: helpers_1.getMenuTop,
        right: helpers_1.getMenuRight,
        bottom: helpers_1.getMenuBottom,
        left: helpers_1.getMenuLeft,
        '&.active': {
            opacity: 1,
            transform: helpers_1.getMenuTransform(1),
        },
    },
}));
//# sourceMappingURL=Menu.js.map