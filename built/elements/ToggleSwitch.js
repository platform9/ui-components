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
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
function ToggleSwitch({ onClick, active = false, disabled = false, label = '', className = '', }) {
    const classes = useStyles({ active, disabled });
    const handleClick = (0, react_1.useCallback)(() => {
        onClick(!active);
    }, [onClick]);
    return (react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)(label, 'toggle'), className: (0, clsx_1.default)(classes.toggleSwitch, className), onClick: !disabled ? handleClick : undefined, role: "toggle-switch-control" },
        react_1.default.createElement("div", { "data-testid": (0, test_helpers_1.default)('toggle', 'switch'), className: classes.switchContainer, role: "switch", "aria-checked": active },
            react_1.default.createElement("div", { className: classes.switchHandle }),
            react_1.default.createElement("div", { className: classes.switchTrack })),
        !!label && (react_1.default.createElement(Text_1.default, { className: (0, clsx_1.default)(classes.switchLabel, { disabled }), variant: "caption1", role: "switch-label" }, label))));
}
exports.default = ToggleSwitch;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    toggleSwitch: {
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'max-content',
        gridAutoFlow: 'column',
        gap: 8,
        cursor: ({ disabled }) => (disabled ? 'not-allowed' : 'pointer'),
    },
    switchContainer: {
        position: 'relative',
        height: 16,
        display: 'grid',
        alignItems: 'center',
    },
    switchHandle: {
        position: 'absolute',
        borderRadius: 16,
        width: 16,
        height: 16,
        boxShadow: ({ disabled }) => (disabled ? 'unset' : '0 0 12px 0 rgba(13, 13, 40, 0.15)'),
        backgroundColor: ({ active, disabled }) => {
            const key = disabled
                ? 'disabledHandle'
                : active
                    ? 'activeHandle'
                    : 'inactiveHandle';
            return theme.components.toggleSwitch[key];
        },
        left: ({ active }) => (active ? 'calc(100% - 16px)' : 0),
        transition: 'left .2s ease, background-color .2s ease',
    },
    switchTrack: {
        width: 32,
        height: 12,
        borderRadius: 18,
        backgroundColor: ({ active, disabled }) => {
            const key = disabled
                ? 'disabledTrack'
                : active
                    ? 'activeTrack'
                    : 'inactiveTrack';
            return theme.components.toggleSwitch[key];
        },
        transition: 'background-color .2s ease',
    },
    switchLabel: {
        color: theme.components.toggleSwitch.label,
        transition: 'color .2s ease',
        '&.disabled': {
            color: theme.components.toggleSwitch.disabledLabel,
        },
        '&:not(.disabled):hover': {
            color: theme.components.toggleSwitch.hoverLabel,
        },
    },
}));
//# sourceMappingURL=ToggleSwitch.js.map