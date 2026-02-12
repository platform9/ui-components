"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donut = exports.Empty = exports.WithCenterText = exports.Default = void 0;
const PieGraph_1 = __importDefault(require("../../../components/graphs/PieGraph"));
const meta = {
    title: 'Components/Graphs/PieGraph',
    component: PieGraph_1.default,
    argTypes: {
        sideLength: { control: 'number' },
        arcWidth: { control: 'number' },
        startAngle: { control: 'number' },
        endAngle: { control: 'number' },
        percent: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
        primary: { control: 'text' },
        empty: { control: 'boolean' },
    },
};
exports.default = meta;
const data = [
    { name: 'Group A', value: 400, color: 'primary' },
    { name: 'Group B', value: 300, color: 'secondary' },
    { name: 'Group C', value: 300, color: 'faded' },
    { name: 'Group D', value: 200, color: 'error' },
];
const baseArgs = {
    data: data,
    sideLength: 300,
};
exports.Default = {
    args: baseArgs,
};
exports.WithCenterText = {
    args: Object.assign(Object.assign({}, baseArgs), { percent: 0.75, primary: 'Usage' }),
};
exports.Empty = {
    args: Object.assign(Object.assign({}, baseArgs), { empty: true }),
};
exports.Donut = {
    args: Object.assign(Object.assign({}, baseArgs), { arcWidth: 30 })
};
//# sourceMappingURL=PieGraph.stories.js.map