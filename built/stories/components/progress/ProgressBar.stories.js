"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomColor = exports.ContainedLabel = exports.CriticalHealth = exports.HealthVariant = exports.Animated = exports.Default = void 0;
const ProgressBar_1 = __importDefault(require("../../../components/progress/ProgressBar"));
const meta = {
    title: 'Components/Progress/ProgressBar',
    component: ProgressBar_1.default,
    argTypes: {
        percent: { control: { type: 'range', min: 0, max: 100 } },
        width: { control: 'text' },
        height: { control: 'number' },
        animated: { control: 'boolean' },
        showPercent: { control: 'boolean' },
        containedPercent: { control: 'boolean' },
        variant: {
            control: { type: 'select' },
            options: ['progress', 'health'],
        },
        color: { control: 'color' },
    },
};
exports.default = meta;
const baseArgs = {
    percent: 50,
    width: 300,
    height: 20,
};
exports.Default = {
    args: baseArgs,
};
exports.Animated = {
    args: Object.assign(Object.assign({}, baseArgs), { animated: true }),
};
exports.HealthVariant = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'health', percent: 85 }),
};
exports.CriticalHealth = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'health', percent: 95 })
};
exports.ContainedLabel = {
    args: Object.assign(Object.assign({}, baseArgs), { containedPercent: true, height: 24 }),
};
exports.CustomColor = {
    args: Object.assign(Object.assign({}, baseArgs), { color: 'purple' }),
};
//# sourceMappingURL=ProgressBar.stories.js.map