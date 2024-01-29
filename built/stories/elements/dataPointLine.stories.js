"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientDataPointLine = void 0;
const react_1 = __importDefault(require("react"));
const DataPointLine_1 = __importDefault(require("../../components/dataPointLine/DataPointLine"));
const DataPoint_1 = __importDefault(require("../../components/dataPointLine/DataPoint"));
const gradientLineColor = 'linear-gradient(to right, red, orange, yellow, green)';
const GradientDataPointLine = ({ lineColor = gradientLineColor, arrowColor = 'green' }) => {
    return (react_1.default.createElement(DataPointLine_1.default, { lineColor: lineColor, arrowColor: arrowColor },
        react_1.default.createElement(DataPoint_1.default, { description: "0%", percent: 0, circleColor: "red" }),
        react_1.default.createElement(DataPoint_1.default, { description: "20%", percent: 20, circleColor: '#ff6400' }),
        react_1.default.createElement(DataPoint_1.default, { description: "50%", percent: 50, circleColor: '#ffd700' }),
        react_1.default.createElement(DataPoint_1.default, { description: "80%", percent: 80, circleColor: '#73b500' })));
};
exports.GradientDataPointLine = GradientDataPointLine;
const DataPointLineStory = {
    title: 'Elements/DataPointLine',
    component: DataPointLine_1.default,
};
exports.default = DataPointLineStory;
//# sourceMappingURL=dataPointLine.stories.js.map