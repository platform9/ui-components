"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importDefault(require("react"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    columnLayout: {
        display: 'grid',
        gridAutoFlow: 'row',
        gap: ({ gap }) => gap,
        padding: ({ padding }) => padding,
    },
}));
function Column({ children, gap = '8px', padding = '0', }) {
    const classes = useStyles({ padding, gap });
    return react_1.default.createElement("div", { className: classes.columnLayout }, children);
}
exports.default = Column;
//# sourceMappingURL=Column.js.map