"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const styles_1 = require("@material-ui/styles");
// import { useTheme } from '@material-ui/styles'
const fp_1 = require("../../utils/fp");
const react_redux_1 = require("react-redux");
const selector_1 = require("../../theme-manager/selector");
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    chartContainer: {
        '& g.recharts-cartesian-grid-horizontal > line:last-child': {
            display: 'none',
        },
    },
}));
// Todo: Instead of a set width and height, also allow for percents
function StackedAreaChart({ values, width = 600, height = 400, keys, xAxis, verticalAxisLines = false, horizontalAxisLines = true, responsive = false, responsiveHeight = 250, CustomTooltip = undefined, }) {
    // old theme to access palette
    const theme = (0, styles_1.useTheme)();
    // const themeStore = useSelector(prop<string, ThemeReducer>('theme'))
    const themeStore = (0, react_redux_1.useSelector)(selector_1.themeSelector);
    const classes = useStyles({});
    const renderAreaChart = () => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return (react_1.default.createElement(recharts_1.AreaChart, { data: values, margin: { top: 0, right: 0, left: 0, bottom: 0 } },
            react_1.default.createElement(recharts_1.CartesianGrid, { vertical: verticalAxisLines, horizontal: horizontalAxisLines, 
                // strokeDasharray="2 3"
                stroke: (_b = (_a = themeStore === null || themeStore === void 0 ? void 0 : themeStore.components) === null || _a === void 0 ? void 0 : _a.table) === null || _b === void 0 ? void 0 : _b.border }),
            react_1.default.createElement(recharts_1.XAxis, { axisLine: { stroke: (_d = (_c = themeStore === null || themeStore === void 0 ? void 0 : themeStore.components) === null || _c === void 0 ? void 0 : _c.table) === null || _d === void 0 ? void 0 : _d.border, strokeWidth: 1 }, tick: false, dataKey: xAxis, allowDataOverflow: true }),
            react_1.default.createElement(recharts_1.YAxis, { padding: {
                    top: 20,
                }, axisLine: { stroke: (_f = (_e = themeStore === null || themeStore === void 0 ? void 0 : themeStore.components) === null || _e === void 0 ? void 0 : _e.table) === null || _f === void 0 ? void 0 : _f.border, strokeWidth: 1 }, tickLine: {
                    stroke: (_h = (_g = themeStore === null || themeStore === void 0 ? void 0 : themeStore.components) === null || _g === void 0 ? void 0 : _g.table) === null || _h === void 0 ? void 0 : _h.border,
                    strokeWidth: 1,
                }, tick: {
                    fontSize: 14,
                    fill: (_k = (_j = themeStore === null || themeStore === void 0 ? void 0 : themeStore.components) === null || _j === void 0 ? void 0 : _j.table) === null || _k === void 0 ? void 0 : _k.headColor,
                    style: { transform: 'translate(-12px, 0px)' },
                }, tickSize: 8, allowDataOverflow: true }),
            react_1.default.createElement(recharts_1.Tooltip, { cursor: { stroke: 'rgba(96, 96, 96, 0.5)', strokeDasharray: '6' /* strokeWidth: 6 */ }, content: CustomTooltip }),
            keys.map(({ name, color }) => (react_1.default.createElement(recharts_1.Area, { key: name, type: "monotone", dataKey: name, stackId: "1", stroke: (0, fp_1.pathStr)(color, theme.palette), strokeWidth: 2, fill: (0, fp_1.pathStr)(color, theme.palette), activeDot: { strokeWidth: 4, r: 8, stroke: 'rgba(96, 96, 96, 0.5)' } })))));
    };
    return responsive ? (react_1.default.createElement(recharts_1.ResponsiveContainer, { width: "100%", height: responsiveHeight, className: classes.chartContainer }, renderAreaChart())) : (react_1.default.createElement("div", { className: classes.chartContainer }, renderAreaChart()));
}
exports.default = StackedAreaChart;
//# sourceMappingURL=StackedAreaChart.js.map