"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
const button_1 = __importDefault(require("../elements/button"));
const test_helpers_1 = __importDefault(require("../utils/test-helpers"));
const useStyles = styles_1.makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
}));
const SubmitButton = ({ className, children, form }) => {
    const classes = useStyles({});
    return (react_1.default.createElement(button_1.default, { "data-testid": test_helpers_1.default(children), className: clsx_1.default(classes.root, className), type: "submit", variant: "primary", size: "large", form: form }, children));
};
exports.default = SubmitButton;
//# sourceMappingURL=SubmitButton.js.map