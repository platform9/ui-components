"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../elements/Text"));
function Alert({ variant = 'primary', title, message, id = undefined, className = undefined, children, maxWidth, }) {
    const classes = useStyles({ variant, maxWidth });
    const msgComponent = typeof message === 'string' ? react_1.default.createElement(Text_1.default, { variant: "body2" }, message) : message;
    return (react_1.default.createElement("article", { id: id, className: (0, clsx_1.default)(classes.alert, className) },
        title && (react_1.default.createElement(Text_1.default, { className: classes.alertTitle, variant: "caption1", component: "h5" }, title)),
        msgComponent,
        children));
}
exports.default = Alert;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    alert: {
        backgroundColor: ({ variant }) => theme.components.alert[variant].background,
        width: '100%',
        maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
        boxSizing: 'border-box',
        padding: 8,
        borderTop: ({ variant }) => `1px solid ${theme.components.alert[variant].border}`,
        wordBreak: 'break-word',
    },
    alertTitle: {
        marginBottom: 10,
    },
}));
/*
@todo check with design if we want to use icons in the alert

export const variantIcon = {
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'exclamation-circle',
  info: 'info-circle',
}
<FontAwesomeIcon className={classes.icon}>
  {variantIcon[variant]}
</FontAwesomeIcon>
*/
//# sourceMappingURL=Alert.js.map