"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const FontAwesomeIcon_1 = __importDefault(require("../FontAwesomeIcon"));
const clsx_1 = __importDefault(require("clsx"));
const useStyles = styles_1.makeStyles((theme) => ({
    errorMessage: {
        color: theme.palette.red[500],
        display: 'grid',
        gridTemplateColumns: '26px auto',
    },
    errorIcon: {
        alignSelf: 'center',
    },
}));
exports.ErrorMessage = ({ className = undefined, children }) => {
    const classes = useStyles({});
    return children ? (react_1.default.createElement("div", { className: clsx_1.default(classes.errorMessage, className) },
        react_1.default.createElement(FontAwesomeIcon_1.default, { className: classes.errorIcon }, "exclamation-circle"),
        react_1.default.createElement("div", null, children))) : null;
};
//# sourceMappingURL=ErrorMessage.js.map