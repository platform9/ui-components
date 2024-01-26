"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
function DataPointLine({ className, lineColor, arrowColor = lineColor, children, }) {
    const classes = useStyles({ lineColor, arrowColor });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.lineContainer, className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.line, 'line') },
            children,
            react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.arrow, 'arrow') }))));
}
exports.default = DataPointLine;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    lineContainer: {
        display: 'grid',
        position: 'relative',
        width: '100%',
        padding: theme.spacing(2, 0, 5, 0),
    },
    line: {
        width: '90%',
        justifySelf: 'center',
        position: 'relative',
        height: '4px',
        background: ({ lineColor }) => lineColor || theme.palette.common.black,
    },
    arrow: {
        position: 'absolute',
        right: '-4px' /* Adjust to position the arrow on the right of the line */,
        top: '-6px' /* Adjust to center the arrow on the line */,
        width: '0',
        height: '0',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: ({ arrowColor }) => `8px solid ${arrowColor || theme.palette.common.black}`,
    },
}));
//# sourceMappingURL=DataPointLine.js.map