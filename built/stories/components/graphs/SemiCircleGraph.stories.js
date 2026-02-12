"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = exports.Default = void 0;
const SemiCircleGraph_1 = __importDefault(require("../../../components/graphs/SemiCircleGraph"));
const meta = {
    title: 'Components/Graphs/SemiCircleGraph',
    component: SemiCircleGraph_1.default,
    argTypes: {
        sideLength: { control: 'number' },
        arcWidth: { control: 'number' },
        percent: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
        primary: { control: 'text' },
        empty: { control: 'boolean' },
    },
};
exports.default = meta;
const data = [
    { name: 'Used', value: 70, color: 'primary' },
    { name: 'Free', value: 30, color: 'tray' },
];
const baseArgs = {
    data: data,
    sideLength: 300,
    percent: 0.70,
    primary: 'Used',
};
exports.Default = {
    args: baseArgs,
};
exports.Empty = {
    args: Object.assign(Object.assign({}, baseArgs), { empty: true, percent: undefined, primary: undefined }),
};
//# sourceMappingURL=SemiCircleGraph.stories.js.map