"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../../elements/Text"));
function Step({ label, content, stepIcon, isLastStep, className, lineColor, labelTextVariant = 'body2', }) {
    const classes = useStyles({ lineColor });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.step, className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.stepper, 'stepper') },
            stepIcon,
            !isLastStep && react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.line, 'line') })),
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.info, 'info') },
            react_1.default.createElement(Text_1.default, { variant: "h3", className: (0, clsx_1.default)(classes.label, 'label') }, label),
            typeof content === 'string' ? react_1.default.createElement(Text_1.default, { variant: labelTextVariant }, content) : content)));
}
exports.default = Step;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    step: {
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        gridGap: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    stepper: {
        display: 'grid',
        gridTemplateColumns: 'max-content',
        justifyItems: 'center',
        gridTemplateRows: 'max-content',
        gridGap: theme.spacing(1),
    },
    line: {
        minHeight: '50px',
        height: '100%',
        borderLeft: ({ lineColor }) => `1px solid ${lineColor || theme.palette.grey[300]}`,
    },
    info: {
        display: 'grid',
        gridAutoFlow: 'row',
        gridGap: theme.spacing(1),
    },
}));
//# sourceMappingURL=Step.js.map