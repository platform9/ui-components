"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@mui/material/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const StyledAlert = (0, styles_1.styled)('article')(({ theme, variant = 'primary', maxWidth }) => ({
    backgroundColor: theme.components.alert[variant].background,
    maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : 'unset',
    borderTop: `1px solid ${theme.components.alert[variant].border}`,
    width: '100%',
    boxSizing: 'border-box',
    padding: 8,
    wordBreak: 'break-word',
}));
const AlertTitle = (0, styles_1.styled)('h5')({
    marginBottom: 10,
});
function Alert({ variant = 'primary', title, message, id = undefined, className = undefined, children, maxWidth, }) {
    const msgComponent = typeof message === 'string' ? react_1.default.createElement(Text_1.default, { variant: "body2" }, message) : message;
    return (react_1.default.createElement(StyledAlert, { id: id, className: className, variant: variant, maxWidth: maxWidth },
        title && react_1.default.createElement(AlertTitle, null, title),
        msgComponent,
        children));
}
exports.default = Alert;
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