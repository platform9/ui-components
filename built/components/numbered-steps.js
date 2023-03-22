"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const useStyles = styles_1.makeStyles((theme) => ({
    column: {
        margin: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        margin: theme.spacing(1, 0),
    },
    step: {
        color: theme.palette.secondary.contrastText,
        marginRight: theme.spacing(2),
        flex: `0 0 ${theme.spacing(5)}px`,
        width: theme.spacing(5),
        height: theme.spacing(5),
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '100%',
    },
}));
const NumberedSteps = ({ step, title, description, children, }) => {
    const classes = useStyles({});
    return (react_1.default.createElement("div", { className: classes.column },
        title && react_1.default.createElement(Text_1.default, { variant: "subtitle2" }, title),
        react_1.default.createElement("div", { className: classes.row },
            react_1.default.createElement(Text_1.default, { variant: "body1", className: classes.step }, step),
            typeof description === 'string' ? react_1.default.createElement(Text_1.default, { variant: "body1" }, description) : description,
            children)));
};
exports.default = NumberedSteps;
//# sourceMappingURL=numbered-steps.js.map