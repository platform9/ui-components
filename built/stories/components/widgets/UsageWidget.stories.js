"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighUsage = exports.Default = void 0;
const UsageWidget_1 = __importDefault(require("../../../components/widgets/UsageWidget"));
const meta = {
    title: 'Components/Widgets/UsageWidget',
    component: UsageWidget_1.default,
    argTypes: {
        title: { control: 'text' },
        units: { control: 'text' },
        precision: { control: 'number' },
        usedText: { control: 'text' },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Memory Usage',
    units: 'GB',
    stats: {
        current: 8,
        max: 16,
        percent: 50,
    },
};
exports.Default = {
    args: baseArgs,
};
exports.HighUsage = {
    args: Object.assign(Object.assign({}, baseArgs), { title: 'Storage Usage', units: 'TB', stats: {
            current: 9.5,
            max: 10,
            percent: 95,
        } }),
};
//# sourceMappingURL=UsageWidget.stories.js.map