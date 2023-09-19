"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../FontAwesomeIcon"));
const Text_1 = __importDefault(require("../../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
function CircleStepIcon({ stepNumber, icon, className, color, inactiveStep = false, }) {
    const classes = useStyles({ color, inactiveStep });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.circle, className) }, icon ? (react_1.default.createElement(FontAwesomeIcon_1.default, { className: (0, clsx_1.default)(classes.icon, 'icon') }, icon)) : (react_1.default.createElement(Text_1.default, { variant: "body1", className: (0, clsx_1.default)(classes.stepNumber, 'step-number') }, stepNumber))));
}
exports.default = CircleStepIcon;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    circle: {
        display: 'flex',
        height: '35px',
        width: '35px',
        backgroundColor: ({ color, inactiveStep }) => color ? color : inactiveStep ? theme.palette.grey[300] : theme.palette.blue[500],
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: theme.palette.common.white,
    },
    stepNumber: {
        color: theme.palette.common.white,
    },
}));
//# sourceMappingURL=CircleStepIcon.js.map