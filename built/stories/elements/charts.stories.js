"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleAreaChart = exports.StackedChart = void 0;
/* eslint-disable no-restricted-globals */
const react_1 = __importDefault(require("react"));
const styles_1 = require("@material-ui/styles");
const StackedAreaChart_1 = __importDefault(require("src/components/graphs/StackedAreaChart"));
const SingleAreaChart_1 = __importDefault(require("src/components/graphs/SingleAreaChart"));
const useStyles = (0, styles_1.makeStyles)((theme) => ({
    expandedRow: {
        padding: '32px',
        display: 'grid',
        gap: '16px',
    },
}));
const exampleData = [
    {
        time: '8:00 PM',
        warning: 5,
        critical: 10,
        fatal: 0,
    },
    {
        time: '9:00 PM',
        warning: 2,
        critical: 8,
        fatal: 3,
    },
    {
        time: '10:00 PM',
        warning: 2,
        critical: 9,
        fatal: 5,
    },
    {
        time: '11:00 PM',
        warning: 10,
        critical: 2,
        fatal: 4,
    },
    {
        time: '12:00 PM',
        warning: 8,
        critical: 9,
        fatal: 8,
    },
    {
        time: '1:00 AM',
        warning: 2,
        critical: 2,
        fatal: 15,
    },
];
const chartKeys = [
    {
        name: 'warning',
        color: 'yellow.200',
        // badge: 'warning' as const,
        icon: 'exclamation-triangle',
    },
    {
        name: 'critical',
        color: 'yellow.300',
        // badge: 'danger' as const,
        icon: 'engine-warning',
    },
    {
        name: 'fatal',
        color: 'red.300',
        // badge: 'error' as const,
        icon: 'skull-crossbones',
    },
];
const exampleAxis = 'time';
const StackedChart = (args) => {
    return react_1.default.createElement(StackedAreaChart_1.default, { values: exampleData, keys: chartKeys, xAxis: exampleAxis, responsive: true });
};
exports.StackedChart = StackedChart;
const singleChartData = [
    {
        time: '8:00 PM',
        price: 0.27,
    },
    {
        time: '9:00 PM',
        price: 0.85,
    },
    {
        time: '10:00 PM',
        price: 1.37,
    },
    {
        time: '11:00 PM',
        price: 1.39,
    },
    {
        time: '12:00 PM',
        price: 0.88,
    },
    {
        time: '1:00 AM',
        price: 1.05,
    },
];
const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const SimpleAreaChart = (args) => {
    return (react_1.default.createElement(SingleAreaChart_1.default, { values: singleChartData, dataKey: "price", xAxis: "time", legendLabelFn: () => '30-day price history', tooltipFormatterFn: (value, key) => {
            const dollarFormat = moneyFormatter.format(value);
            return [dollarFormat, 'Price'];
        } }));
};
exports.SimpleAreaChart = SimpleAreaChart;
exports.StackedChart.parameters = {
    docs: {
        source: {
            code: `
  import StackedAreaChart from 'core/components/graphs/StackedAreaChart'

  const AreaChart = () => (
    <StackedAreaChart<'time', IRequiredAreaChartTypes>
      values={exampleData}
      keys={chartKeys}
      xAxis="time"
    />
  )
`,
        },
    },
};
exports.StackedChart.args = {
// size: 'large',
};
const ChartStories = {
    title: 'Elements/Chart',
    component: StackedAreaChart_1.default,
    argTypes: {
        onBeforePageChange: {
            action: 'beforePageChange',
        },
    },
};
exports.default = ChartStories;
//# sourceMappingURL=charts.stories.js.map