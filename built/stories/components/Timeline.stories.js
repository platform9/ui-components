"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Completed = exports.MidProgress = exports.Default = void 0;
const Timeline_1 = __importDefault(require("../../components/Timeline"));
const meta = {
    title: 'Components/Timeline',
    component: Timeline_1.default,
    argTypes: {
        items: {
            control: { type: 'object' },
            description: 'Array of step labels',
        },
        activeStep: {
            control: { type: 'number' },
            description: 'Current active step index (1-based)',
        },
    },
};
exports.default = meta;
const baseArgs = {
    items: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
    activeStep: 1,
};
exports.Default = {
    args: baseArgs,
};
exports.MidProgress = {
    args: Object.assign(Object.assign({}, baseArgs), { activeStep: 2 }),
};
exports.Completed = {
    args: Object.assign(Object.assign({}, baseArgs), { activeStep: 4 }),
};
//# sourceMappingURL=Timeline.stories.js.map