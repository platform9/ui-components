"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/styles");
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../elements/Text"));
const fp_1 = require("../../utils/fp");
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    root: {
        height: ({ height }) => height,
        display: 'flex',
        width: ({ width }) => width,
        flexFlow: 'row nowrap',
        alignItems: 'center',
    },
    label: {
        whiteSpace: 'nowrap',
        height: '100%',
        width: 30,
        paddingLeft: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    progressContainer: {
        flexGrow: 1,
        height: '100%',
        minHeight: '100%',
        backgroundColor: theme.components.table.border,
        borderRadius: 3,
    },
    '@keyframes stripes': {
        from: {
            backgroundPosition: '40px 0',
        },
        to: {
            backgroundPosition: '0 0',
        },
    },
    progress: {
        display: 'flex',
        flexFlow: 'row nowrap',
        fontSize: '12px',
        alignItems: 'center',
        justifyContent: 'center',
        width: ({ percent }) => `${percent}%`,
        textAlign: 'center',
        textOverflow: 'visible',
        height: '100%',
        borderRadius: 2,
        backgroundImage: ({ animated }) => animated
            ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'
            : null,
        backgroundSize: '40px 40px',
        backgroundColor: ({ animated, percent, variant, color = theme.components.graph.success }) => {
            if (['error', 'success', 'primary'].includes(color)) {
                return theme.palette[color].main;
            }
            if (animated)
                return theme.components.graph.primary;
            if (variant === 'health') {
                if (typeof percent === 'number' && percent >= 90)
                    return theme.components.graph.error;
                if (typeof percent === 'number' && percent >= 80)
                    return theme.components.graph.warning;
            }
            return color;
        },
        animation: '$stripes 2s linear infinite',
        color: '#FFF',
    },
}));
const ProgressBar = ({ percent, animated = false, containedPercent = false, width = 145, height = 12, label = (progress) => `${progress}%`, variant = 'progress', color = undefined, showPercent = true, }) => {
    const classes = useStyles({ percent, animated, width, height, variant, color });
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement("div", { className: classes.progressContainer },
            react_1.default.createElement("div", { className: classes.progress }, showPercent && (react_1.default.createElement(Text_1.default, { variant: "body2" }, containedPercent ? (0, fp_1.ensureFunction)(label)(percent) : null)))),
        showPercent && !containedPercent && (react_1.default.createElement("div", { className: classes.label },
            react_1.default.createElement(Text_1.default, { variant: "body2" }, (0, fp_1.ensureFunction)(label)(percent))))));
};
exports.default = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map