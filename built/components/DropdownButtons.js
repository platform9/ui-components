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
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const Text_1 = __importDefault(require("../elements/Text"));
const Tooltip_1 = __importDefault(require("../elements/tooltip/Tooltip"));
const ExternalLink_1 = __importDefault(require("./ExternalLink"));
const FontAwesomeIcon_1 = __importDefault(require("./FontAwesomeIcon"));
const DropdownButton = ({ label, icon, onClick, externalLink, disabled = false, tooltipMsg, }) => {
    const classes = useStyles({ disabled });
    // Prevent default onClick if the button is disabled
    const handleClick = (e) => {
        if (disabled) {
            e.preventDefault();
            return;
        }
        onClick && onClick();
    };
    return externalLink ? (react_1.default.createElement(ExternalLink_1.default, { className: classes.dropdownButton, url: externalLink },
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: (0, clsx_1.default)(classes.text, classes.icon), size: "md" }, icon),
        react_1.default.createElement(Text_1.default, { variant: "caption1", className: classes.text }, label))) : (react_1.default.createElement(Tooltip_1.default, { message: tooltipMsg, align: { vertical: 'top', horizontal: 'middle' } },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dropdownButton, 'dropdown-button'), onClick: handleClick },
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: (0, clsx_1.default)(classes.text, classes.icon), size: "md" }, icon),
            react_1.default.createElement(Text_1.default, { variant: "caption1", className: classes.text }, label))));
};
// May be possible to combine this component with the ActionsDropdown component
// in the future, though that one is fairly more complicated
function DropdownButtons({ label = 'More Actions', buttons = [], className, }) {
    const classes = useStyles({});
    const [isOpen, setOpen] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dropdownContainer, className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dropdownLabel, 'dropdown-label'), onClick: () => setOpen(!isOpen) },
            react_1.default.createElement(Text_1.default, { variant: "caption1", className: classes.text }, label),
            react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.text, solid: true, size: "sm" }, isOpen ? 'caret-up' : 'caret-down')),
        isOpen && (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dropdownButtons, 'dropdown-buttons'), onMouseLeave: () => setOpen(false) }, buttons.map((_a) => {
            var { label } = _a, buttonProps = __rest(_a, ["label"]);
            return react_1.default.createElement(DropdownButton, Object.assign({}, buttonProps, { key: label, label: label }));
        })))));
}
exports.default = DropdownButtons;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dropdownContainer: {
        position: 'relative',
        display: 'inline-block',
    },
    dropdownLabel: {
        display: 'inline-grid',
        gridTemplateColumns: 'auto max-content',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        background: theme.components.button.secondary.background,
        border: `1px solid ${theme.components.button.secondary.border}`,
        cursor: 'pointer',
        borderRadius: 4,
    },
    text: {
        color: theme.components.dropdown.color,
    },
    dropdownButtons: {
        position: 'absolute',
        top: 40,
        background: theme.components.button.secondary.background,
        border: `1px solid ${theme.components.button.secondary.border}`,
        borderRadius: 4,
        display: 'grid',
        minWidth: '100%',
        width: 'fit-content',
        zIndex: 100,
        right: 0,
    },
    dropdownButton: {
        display: 'grid',
        gridTemplateColumns: '18px auto',
        alignItems: 'center',
        padding: '8px 16px',
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
        '&:hover': {
            textDecoration: 'none',
            background: theme.components.dropdown.selectedBackground,
            cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
            opacity: ({ disabled }) => (disabled ? 0.5 : 1),
        },
        '& > span': {
            display: 'grid',
            gridTemplateColumns: '18px auto',
            padding: '8px 16px',
            alignItems: 'center',
            gap: 8,
            cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
            '& > span': {
                whiteSpace: 'nowrap',
            },
        },
    },
    icon: {
        marginTop: 2,
        fontWeight: 400,
    },
}));
//# sourceMappingURL=DropdownButtons.js.map