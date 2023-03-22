"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("@material-ui/core/styles");
const Text_1 = __importDefault(require("../elements/Text"));
const react_1 = __importDefault(require("react"));
const colorHelpers_1 = require("../utils/colorHelpers");
const clsx_1 = __importDefault(require("clsx"));
const TimelineItem = ({ label, active }) => {
    const classes = useStyles({ active });
    return (react_1.default.createElement("div", { className: classes.timelineItem },
        react_1.default.createElement("div", { className: classes.timelineItemContent },
            react_1.default.createElement(Text_1.default, { variant: "body2" }, label))));
};
function Timeline({ items, activeStep = 0, className }) {
    const numItems = items.length;
    const timelineElementWidth = 1 / numItems;
    const progressBarWidth = activeStep === numItems
        ? 100
        : (timelineElementWidth * activeStep - timelineElementWidth / 2) * 100;
    const classes = useStyles({ progressBarWidth });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(classes.timelineContainer, className) },
        items.map((label, idx) => (react_1.default.createElement(TimelineItem, { key: label, label: label, active: idx <= activeStep - 1 }))),
        react_1.default.createElement("div", { className: classes.progressBar }),
        react_1.default.createElement("i", { className: classes.arrow })));
}
exports.default = Timeline;
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    timelineContainer: {
        display: 'flex',
        position: 'relative',
        margin: '25px 0',
        '&::after': {
            // Timeline line
            background: `repeating-linear-gradient(to right,${theme.palette.grey['500']} 0,${theme.palette.grey['500']} 10px,transparent 10px,transparent 12px)`,
            content: `''`,
            position: 'absolute',
            width: '100%',
            height: '1px',
            bottom: 0,
        },
    },
    progressBar: {
        position: 'absolute',
        width: ({ progressBarWidth }) => `${progressBarWidth}%`,
        height: '1px',
        backgroundColor: theme.palette.primary.main,
        zIndex: 1,
        bottom: 0,
    },
    timelineItem: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        '&::after': {
            // Circle
            content: `''`,
            width: '10px',
            height: '10px',
            backgroundColor: ({ active }) => active ? theme.palette.primary.main : (0, colorHelpers_1.hexToRgbaCss)(theme.components.frame.background, 0.75),
            border: ({ active }) => active
                ? `1px solid ${theme.palette.primary.main}`
                : `1px solid ${theme.palette.grey['500']}`,
            borderRadius: '50%',
            zIndex: 3,
            position: 'absolute',
            bottom: '-4px',
        },
    },
    timelineItemContent: {
        marginBottom: theme.spacing(2),
    },
    arrow: {
        transform: 'rotate(-45deg)',
        borderColor: ({ progressBarWidth }) => progressBarWidth === 100 ? theme.palette.primary.main : theme.palette.grey['500'],
        borderStyle: 'solid',
        borderWidth: '0 1px 1px 0',
        padding: '3px',
        position: 'absolute',
        right: '0px',
        bottom: '-3px',
    },
}));
//# sourceMappingURL=Timeline.js.map