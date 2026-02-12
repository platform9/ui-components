"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDescription = exports.CustomColor = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const DataPoint_1 = __importDefault(require("../../../components/dataPointLine/DataPoint"));
const Text_1 = __importDefault(require("../../../elements/Text"));
const meta = {
    title: 'Components/DataPointLine/DataPoint',
    component: DataPoint_1.default,
    argTypes: {
        description: { control: 'text' },
        percent: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Position percent (0-100)',
        },
        circleColor: { control: 'color' },
        textVariant: {
            control: { type: 'select' },
            options: ['body1', 'body2', 'caption1', 'caption2'],
        },
    },
};
exports.default = meta;
const baseArgs = {
    description: 'Milestone 1',
    percent: 50,
};
// DataPoint uses absolute positioning based on percentage, so it needs a relative container
const Wrapper = (args) => (react_1.default.createElement("div", { style: { position: 'relative', width: '100%', height: 100, border: '1px dashed #ccc', marginTop: 20 } },
    react_1.default.createElement(DataPoint_1.default, Object.assign({}, args))));
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.CustomColor = {
    args: Object.assign(Object.assign({}, baseArgs), { description: 'Critical Event', circleColor: 'red', percent: 75 }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.CustomDescription = {
    args: Object.assign(Object.assign({}, baseArgs), { description: react_1.default.createElement(Text_1.default, { variant: "caption1", style: { fontWeight: 'bold' } }, "Custom JSX"), percent: 25 }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=DataPoint.stories.js.map