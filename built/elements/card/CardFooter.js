"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
function CardFooter({ children, className = undefined }) {
    const classes = useStyles({});
    return react_1.default.createElement("footer", { className: clsx_1.default('card-footer', classes.footer, className) }, children);
}
exports.default = CardFooter;
const useStyles = styles_1.makeStyles((theme) => ({
    footer: {
        padding: '8px 24px',
    },
}));
//# sourceMappingURL=CardFooter.js.map