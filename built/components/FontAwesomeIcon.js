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
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const misc_1 = require("../utils/misc");
const getStyleClass = misc_1.memoize((light, solid, brand, regular, thin, duotone) => {
    if (solid) {
        return 'fa-solid';
    }
    if (brand) {
        return 'fa-brands';
    }
    if (regular) {
        return 'fa-regular';
    }
    if (thin) {
        return 'fa-thin';
    }
    if (duotone) {
        return 'fa-duotone';
    }
    if (light) {
        return 'fa-light';
    }
    return 'fa-light';
});
const FontAwesomeIcon = react_1.forwardRef((props, ref) => {
    const classes = useStyles(props);
    const { children, disabled = false, name, className, size = 'lg', solid, brand, regular, light = true, duotone, thin, spin, onClick } = props, rest = __rest(props, ["children", "disabled", "name", "className", "size", "solid", "brand", "regular", "light", "duotone", "thin", "spin", "onClick"]);
    const styleClass = getStyleClass(light, solid, brand, regular, thin, duotone);
    return (react_1.default.createElement("i", Object.assign({ ref: ref, onClick: disabled ? undefined : onClick, className: clsx_1.default(classes.faIcon, `fa-${size}`, `fa-${name || children}`, styleClass, { 'fa-spin': spin }, className) }, rest)));
});
const useStyles = styles_1.makeStyles((theme) => ({
    faIcon: {
        cursor: ({ disabled, onClick }) => (!disabled && onClick ? 'pointer' : 'inherit'),
        width: 'max-content',
        height: 'max-content',
        color: ({ disabled }) => { var _a, _b, _c, _d; return disabled ? (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.components) === null || _a === void 0 ? void 0 : _a.typography) === null || _b === void 0 ? void 0 : _b.passive : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.components) === null || _c === void 0 ? void 0 : _c.typography) === null || _d === void 0 ? void 0 : _d.default; },
    },
}));
exports.default = FontAwesomeIcon;
//# sourceMappingURL=FontAwesomeIcon.js.map