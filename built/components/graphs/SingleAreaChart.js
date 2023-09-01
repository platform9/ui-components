"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const styles_1 = require("@material-ui/styles");
const Text_1 = __importDefault(require("../../elements/Text"));
// To add other functionality as graphs demand
function SingleAreaChart({ values, xAxis, dataKey, lineColor, fillColor, height = 250, legendLabelFn, tooltipFormatterFn, }) {
    var _a, _b, _c, _d, _e, _f;
    const theme = (0, styles_1.useTheme)();
    const customLegendLabel = legendLabelFn
        ? (val, entry, index) => {
            return (react_1.default.createElement(Text_1.default, { variant: "body2", component: "span" }, legendLabelFn(val)));
        }
        : null;
    return (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: height },
        react_1.default.createElement(recharts_1.AreaChart, { width: 730, height: 250, data: values, margin: { top: 10, right: 30, left: 0, bottom: 0 } },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("linearGradient", { id: "fillColor", x1: "0", y1: "0", x2: "0", y2: "1" },
                    react_1.default.createElement("stop", { offset: "0%", stopColor: fillColor || ((_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.blue) === null || _b === void 0 ? void 0 : _b[200]), stopOpacity: 1 }),
                    react_1.default.createElement("stop", { offset: "100%", stopColor: fillColor || ((_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.blue) === null || _d === void 0 ? void 0 : _d[200]), stopOpacity: 0 }))),
            react_1.default.createElement(recharts_1.XAxis, { dataKey: xAxis, tick: false }),
            react_1.default.createElement(recharts_1.YAxis, { tick: false }),
            react_1.default.createElement(recharts_1.CartesianGrid, { vertical: false, horizontal: false }),
            react_1.default.createElement(recharts_1.Tooltip, { formatter: tooltipFormatterFn }),
            react_1.default.createElement(recharts_1.Legend, { wrapperStyle: {
                    bottom: '16px',
                }, verticalAlign: "bottom", iconType: "plainline", formatter: customLegendLabel }),
            react_1.default.createElement(recharts_1.Area, { type: "monotone", dataKey: dataKey, stroke: lineColor || ((_f = (_e = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _e === void 0 ? void 0 : _e.blue) === null || _f === void 0 ? void 0 : _f[500]), strokeWidth: 2, fillOpacity: 1, fill: "url(#fillColor)" }))));
}
exports.default = SingleAreaChart;
//# sourceMappingURL=SingleAreaChart.js.map