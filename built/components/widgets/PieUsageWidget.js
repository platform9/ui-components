"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieLegend = void 0;
const react_1 = __importDefault(require("react"));
const PieGraph_1 = __importDefault(require("../../components/graphs/PieGraph"));
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
const formatters_1 = require("../../utils/formatters");
const tooltip_1 = __importDefault(require("../../elements/tooltip"));
const clsx_1 = __importDefault(require("clsx"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '& path': {
            stroke: theme.components.graph.stroke,
        },
        '& path[name="unknown"]': {
            stroke: theme.components.graph.stroke,
            fill: theme.components.graph.tray,
        },
    },
    pieLegend: {
        display: 'grid',
        gridTemplateRows: 'repeat(auto-fill, 20px)',
        gap: theme.spacing(),
        alignContent: 'center',
        justifyItems: 'start',
        maxWidth: 135,
    },
    legendName: {
        color: theme.components.card.text,
        whiteSpace: 'nowrap',
    },
    legendCount: {
        justifySelf: 'end',
        color: theme.palette.grey[700],
        textShadow: '1px 1px rgba(0,0,0,0.1)',
        padding: '0px 5px 2px',
        borderRadius: 16,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
        minWidth: 8,
    },
    legendRow: {
        display: 'inline-grid',
        gridTemplateColumns: 'minmax(min-content, 36px) 1fr',
        gap: theme.spacing(),
    },
}));
const PieLegend = ({ data }) => {
    const theme = (0, styles_1.useTheme)();
    const classes = useStyles({});
    const { pieLegend, legendName } = useStyles({});
    return (react_1.default.createElement("legend", { className: (0, clsx_1.default)(pieLegend, 'pieLegend') }, data &&
        data.map((entry) => (react_1.default.createElement("div", { key: entry.name, className: classes.legendRow },
            react_1.default.createElement(Text_1.default, { component: "span", variant: "caption2", className: classes.legendCount, style: { backgroundColor: theme.components.graph[entry.color] } }, entry.value),
            entry.info ? (react_1.default.createElement(tooltip_1.default, { message: entry.info },
                react_1.default.createElement(Text_1.default, { component: "span", variant: "caption2", className: legendName }, (0, formatters_1.formattedName)(entry.name)))) : (react_1.default.createElement(Text_1.default, { component: "span", variant: "caption2", className: legendName }, (0, formatters_1.formattedName)(entry.name))))))));
};
exports.PieLegend = PieLegend;
const PieUsageWidget = (_a) => {
    var { primary, data, className, showPercent = true } = _a, rest = __rest(_a, ["primary", "data", "className", "showPercent"]);
    const { container } = useStyles({});
    if (!data) {
        return null;
    }
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    const isEmpty = !total;
    const primaryObj = data.find((x) => x.name === primary);
    const primaryNum = primaryObj === null || primaryObj === void 0 ? void 0 : primaryObj.value;
    const percent = primaryNum / total || 0;
    const healthColorKey = isEmpty
        ? 'default'
        : percent < 0.25
            ? 'error'
            : percent < 0.5
                ? 'danger'
                : percent < 0.75
                    ? 'warning'
                    : 'success';
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)(container, className) },
        react_1.default.createElement(PieGraph_1.default, Object.assign({ data: data, percent: showPercent ? percent : undefined, healthColor: healthColorKey, primary: primary, empty: isEmpty }, rest)),
        react_1.default.createElement(exports.PieLegend, { data: data })));
};
exports.default = PieUsageWidget;
//# sourceMappingURL=PieUsageWidget.js.map