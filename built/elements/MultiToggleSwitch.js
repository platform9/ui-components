"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("./Text"));
function MultiToggleSwitch({ options = [], value, onClick, className, activeOptionColor, }) {
    const classes = useStyles({ activeOptionColor });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.toggleSwitch, className) }, options.map((option) => (react_1.default.createElement("div", { key: option.label, className: (0, clsx_1.default)(classes.option, option.value === value ? classes.activeOption : '', 'option'), onClick: () => onClick(option.value) },
        react_1.default.createElement(Text_1.default, { variant: "caption1" }, option.label))))));
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