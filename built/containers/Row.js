"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    rowLayout: {
        display: 'grid',
        gridTemplateColumns: ({ minItemWidth }) => `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
        gap: ({ gap }) => gap,
        padding: ({ padding }) => padding,
        alignItems: 'baseline',
    },
}));
function Row({ children, padding = 0, minItemWidth = '400', gap = 8, className, }) {
    const classes = useStyles({ padding, minItemWidth, gap });
    return react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.rowLayout, className) }, children);
}
exports.default = Row;
//# sourceMappingURL=Row.js.map