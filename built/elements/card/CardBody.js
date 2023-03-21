"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_1 = require("@material-ui/styles");
function CardBody({ children, className = undefined }) {
    const classes = useStyles({});
    return react_1.default.createElement("section", { className: (0, clsx_1.default)('card-body', classes.body, className) }, children);
}
exports.default = CardBody;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    body: {
        padding: '16px 32px',
    },
}));
//# sourceMappingURL=CardBody.js.map