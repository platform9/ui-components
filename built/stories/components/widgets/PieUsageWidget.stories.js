"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighUsage = exports.LowUsage = exports.Default = void 0;
const PieUsageWidget_1 = __importDefault(require("../../../components/widgets/PieUsageWidget"));
const meta = {
    title: 'Components/Widgets/PieUsageWidget',
    component: PieUsageWidget_1.default,
    argTypes: {
        primary: { control: 'text' },
        showPercent: { control: 'boolean' },
        sideLength: { control: 'number' },
        arcWidth: { control: 'number' },
    },
};
exports.default = meta;
const data = [
    { name: 'CPU', value: 65, color: 'primary', info: 'CPU Usage' },
    { name: 'Free', value: 35, color: 'tray' },
];
exports.Default = {
    args: {
        data: data,
        primary: 'CPU',
        sideLength: 200,
    },
};
exports.LowUsage = {
    args: {
        data: [
            { name: 'CPU', value: 10, color: 'primary' },
            { name: 'Free', value: 90, color: 'tray' },
        ],
        primary: 'CPU',
        sideLength: 200,
    },
};
exports.HighUsage = {
    args: {
        data: [
            { name: 'CPU', value: 95, color: 'error' },
            { name: 'Free', value: 5, color: 'tray' },
        ],
        primary: 'CPU',
        sideLength: 200,
    },
};
//# sourceMappingURL=PieUsageWidget.stories.js.map