"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomColors = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const DataPointLine_1 = __importDefault(require("../../../components/dataPointLine/DataPointLine"));
const DataPoint_1 = __importDefault(require("../../../components/dataPointLine/DataPoint"));
const meta = {
    title: 'Components/DataPointLine/DataPointLine',
    component: DataPointLine_1.default,
    argTypes: {
        lineColor: { control: 'color' },
        arrowColor: { control: 'color' },
    },
};
exports.default = meta;
const baseArgs = {
    children: null,
};
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement(DataPointLine_1.default, Object.assign({}, args),
        react_1.default.createElement(DataPoint_1.default, { percent: 0, description: "Start" }),
        react_1.default.createElement(DataPoint_1.default, { percent: 50, description: "Middle" }),
        react_1.default.createElement(DataPoint_1.default, { percent: 100, description: "End" })))
};
exports.CustomColors = {
    args: {
        lineColor: 'blue',
        arrowColor: 'blue',
    },
    render: (args) => (react_1.default.createElement(DataPointLine_1.default, Object.assign({}, args),
        react_1.default.createElement(DataPoint_1.default, { percent: 20, description: "Step 1", circleColor: "blue" }),
        react_1.default.createElement(DataPoint_1.default, { percent: 80, description: "Step 2", circleColor: "blue" })))
};
//# sourceMappingURL=DataPointLine.stories.js.map