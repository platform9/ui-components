"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    divider: {
        height: 1,
        background: theme.components.card.border,
        border: 0,
        margin: theme.spacing(3, 0),
    },
}));
function Divider({ className }) {
    const classes = useStyles({});
    return react_1.default.createElement("hr", { className: (0, clsx_1.default)(classes.divider, className) });
}
exports.default = Divider;
//# sourceMappingURL=Divider.js.map