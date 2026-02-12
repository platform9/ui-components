"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empty = exports.Default = void 0;
const DonutWidget_1 = __importDefault(require("../../../components/widgets/DonutWidget"));
const meta = {
    title: 'Components/Widgets/DonutWidget',
    component: DonutWidget_1.default,
    argTypes: {
        primary: { control: 'text' },
        showPercent: { control: 'boolean' },
        sideLength: { control: 'number' },
        arcWidth: { control: 'number' },
    },
};
exports.default = meta;
const data = [
    { name: 'Running', value: 5, color: 'success' },
    { name: 'Pending', value: 2, color: 'warning' },
    { name: 'Failed', value: 1, color: 'error' },
];
exports.Default = {
    args: {
        data: data,
        sideLength: 200,
    },
};
exports.Empty = {
    args: {
        data: [],
        sideLength: 200,
    },
};
//# sourceMappingURL=DonutWidget.stories.js.map