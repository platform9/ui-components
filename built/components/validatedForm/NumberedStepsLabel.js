"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const clsx_1 = __importDefault(require("clsx"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'max-content max-content',
        gap: 16,
        alignItems: 'center',
    },
    circle: {
        color: theme.components.card.passiveText,
        background: theme.components.badge.unknown.background,
        border: `1px solid ${theme.components.card.border}`,
        width: 24,
        height: 24,
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {},
}));
function NumberedStepLabel({ step, title, className }) {
    const classes = useStyles({});
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.container, className) },
        react_1.default.createElement(Text_1.default, { variant: "caption1", className: (0, clsx_1.default)(classes.circle, 'circle') }, step),
        react_1.default.createElement(Text_1.default, { variant: "caption1", className: (0, clsx_1.default)(classes.title, 'title') }, title)));
}
exports.default = NumberedStepLabel;
//# sourceMappingURL=NumberedStepsLabel.js.map