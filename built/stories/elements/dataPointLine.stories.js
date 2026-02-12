"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.SolidColor = exports.Gradient = void 0;
const react_1 = __importDefault(require("react"));
const DataPointLine_1 = __importDefault(require("../../components/dataPointLine/DataPointLine"));
const DataPoint_1 = __importDefault(require("../../components/dataPointLine/DataPoint"));
const gradientLineColor = 'linear-gradient(to right, red, orange, yellow, green)';
const meta = {
    title: 'Elements/DataPointLine',
    component: DataPointLine_1.default,
    argTypes: {
        lineColor: {
            control: { type: 'text' },
            description: 'CSS color or gradient used for the line background',
            table: {
                type: { summary: 'string' },
            },
        },
        arrowColor: {
            control: { type: 'text' },
            description: 'Color of the arrow at the end of the line',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    lineColor: gradientLineColor,
    arrowColor: 'green',
};
exports.Gradient = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement(DataPointLine_1.default, Object.assign({}, args),
        react_1.default.createElement(DataPoint_1.default, { description: "0%", percent: 0, circleColor: "red" }),
        react_1.default.createElement(DataPoint_1.default, { description: "20%", percent: 20, circleColor: "#ff6400" }),
        react_1.default.createElement(DataPoint_1.default, { description: "50%", percent: 50, circleColor: "#ffd700" }),
        react_1.default.createElement(DataPoint_1.default, { description: "80%", percent: 80, circleColor: "#73b500" }))),
};
exports.SolidColor = {
    args: {
        lineColor: '#00abe8',
        arrowColor: '#00abe8',
    },
    render: (args) => (react_1.default.createElement(DataPointLine_1.default, Object.assign({}, args),
        react_1.default.createElement(DataPoint_1.default, { description: "0%", percent: 0, circleColor: "#00abe8" }),
        react_1.default.createElement(DataPoint_1.default, { description: "50%", percent: 50, circleColor: "#00abe8" }),
        react_1.default.createElement(DataPoint_1.default, { description: "100%", percent: 100, circleColor: "#00abe8" }))),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: 24 } },
        react_1.default.createElement(DataPointLine_1.default, Object.assign({}, args),
            react_1.default.createElement(DataPoint_1.default, { description: "0%", percent: 0, circleColor: "red" }),
            react_1.default.createElement(DataPoint_1.default, { description: "20%", percent: 20, circleColor: "#ff6400" }),
            react_1.default.createElement(DataPoint_1.default, { description: "50%", percent: 50, circleColor: "#ffd700" }),
            react_1.default.createElement(DataPoint_1.default, { description: "80%", percent: 80, circleColor: "#73b500" })),
        react_1.default.createElement(DataPointLine_1.default, { lineColor: "#333", arrowColor: "#333" },
            react_1.default.createElement(DataPoint_1.default, { description: "Start", percent: 0, circleColor: "#333" }),
            react_1.default.createElement(DataPoint_1.default, { description: "Middle", percent: 50, circleColor: "#333" }),
            react_1.default.createElement(DataPoint_1.default, { description: "End", percent: 100, circleColor: "#333" })))),
};
//# sourceMappingURL=dataPointLine.stories.js.map