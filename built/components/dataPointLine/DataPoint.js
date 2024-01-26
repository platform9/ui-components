"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../../elements/Text"));
function DataPointLine({ description, percent, className, textVariant = 'body2', circleColor, }) {
    const classes = useStyles({ percent, circleColor });
    const descriptionComponent = typeof description === 'string' ? (react_1.default.createElement(Text_1.default, { variant: textVariant, className: classes.description }, description)) : (description);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.dataPoint, className) },
        react_1.default.createElement("div", { className: classes.circle }),
        descriptionComponent));
}
exports.default = DataPointLine;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    dataPoint: {
        display: 'grid',
        gridAutoFlow: 'row',
        gridGap: theme.spacing(1),
        position: 'absolute',
        left: ({ percent }) => `${percent}%`,
        top: '-5px',
    },
    circle: {
        backgroundColor: ({ circleColor }) => { var _a; return circleColor || ((_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main); },
        border: ({ circleColor }) => { var _a; return `2px solid ${circleColor || ((_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.primary.main)}`; },
        borderRadius: '50%',
        width: '10px',
        height: '10px',
        position: 'relative',
    },
    description: {
        transform: 'translateX(-45%)',
    },
}));
//# sourceMappingURL=DataPoint.js.map