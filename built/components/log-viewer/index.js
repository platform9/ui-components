"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const helpers_1 = require("./helpers");
const clsx_1 = __importDefault(require("clsx"));
const Text_1 = __importDefault(require("../../elements/Text"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    code: {
        display: 'grid',
        alignSelf: 'stretch',
        justifySelf: 'stretch',
        overflow: 'auto',
    },
    pre: {
        fontFamily: 'SpaceMono',
        fontWeight: 'normal',
        position: 'relative',
        margin: 0,
        fontSize: ({ size }) => size,
        '& .log-row': {
            display: 'grid',
            gridTemplateColumns: '28px 1fr',
            gridAutoFlow: 'row',
            gap: '32px',
            alignItems: 'center',
            gridAutoRows: '24px',
        },
        '& .log-line-number': {
            justifySelf: 'end',
        },
        '& .log-bit': {
            padding: theme.spacing(0, 0.5),
        },
        '& .log-type-code-blue': {
            color: theme.components.code.text,
        },
        '& .log-type-default': {
            color: theme.components.card.text,
            padding: theme.spacing(0, 0.5),
        },
    },
}));
function formatLog({ log, idx, lineNumbers }) {
    const bits = log.split(' ').filter((l) => !!l || !!l.trim());
    const elems = bits.map((bit, index) => {
        const color = (0, helpers_1.discoverText)(bit, index);
        return (react_1.default.createElement("span", { key: `log-type-${index}`, className: `log-bit log-type-${color}` }, bit));
    });
    return (react_1.default.createElement("div", { key: `log-${idx}`, className: "log-row" },
        lineNumbers && (react_1.default.createElement(Text_1.default, { variant: "body2", className: "log-line-number" }, idx)),
        react_1.default.createElement("div", null, elems)));
}
function LogViewer({ logs, size = 14, lineNumbers = false, className = undefined, extraLines = 'none', }) {
    const classes = useStyles({ size });
    const logsAsArr = (0, helpers_1.getLogs)(logs);
    const content = logsAsArr.map((log, idx) => formatLog({ log, idx, lineNumbers }));
    return (react_1.default.createElement("code", { className: (0, clsx_1.default)(classes.code, className) },
        react_1.default.createElement("pre", { className: classes.pre },
            (extraLines === 'top' || extraLines === 'both') && react_1.default.createElement("div", null, "\u00A0"),
            content,
            (extraLines === 'bottom' || extraLines === 'both') && react_1.default.createElement("div", null, "\u00A0"))));
}
exports.default = LogViewer;
//# sourceMappingURL=index.js.map