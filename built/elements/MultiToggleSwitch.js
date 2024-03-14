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
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("./Text"));
function MultiToggleSwitch({ options = [], onChange, className, activeOptionColor, }) {
    var _a;
    const classes = useStyles({ activeOptionColor });
    const [activeOption, setActiveOption] = (0, react_1.useState)((_a = options[0]) === null || _a === void 0 ? void 0 : _a.value);
    const onClick = (value) => {
        setActiveOption(value);
        onChange && onChange(value);
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.toggleSwitch, className) }, options.map(({ label, value }) => (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.option, activeOption === value ? classes.activeOption : ''), onClick: () => onClick(value) },
        react_1.default.createElement(Text_1.default, { variant: "caption1" }, label))))));
}
exports.default = MultiToggleSwitch;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    toggleSwitch: {
        width: 'max-content',
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
        alignItems: 'center',
        backgroundColor: theme.palette.common.white,
        borderRadius: '14px',
        height: '28px',
        padding: theme.spacing(0, 1),
        border: `1px solid ${theme.palette.grey[200]}`,
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
    option: {
        cursor: 'pointer',
        padding: theme.spacing(0, 1.5),
    },
    activeOption: {
        backgroundColor: ({ activeOptionColor }) => activeOptionColor ? activeOptionColor : theme.palette.primary.main,
        borderRadius: '18px',
        color: theme.palette.common.white,
        '& span': {
            color: theme.palette.common.white,
        },
    },
}));
//# sourceMappingURL=MultiToggleSwitch.js.map