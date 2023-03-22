"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    spacer: {
        height: ({ height }) => height,
    },
}));
function Spacer({ className, height = 16 }) {
    const classes = useStyles({ height });
    return react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.spacer, className) });
}
exports.default = Spacer;
//# sourceMappingURL=Spacer.js.map