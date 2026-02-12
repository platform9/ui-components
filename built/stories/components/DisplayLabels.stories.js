"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const DisplayLabels_1 = __importDefault(require("../../components/DisplayLabels"));
const meta = {
    title: 'Components/DisplayLabels',
    component: DisplayLabels_1.default,
    argTypes: {
        labels: {
            control: { type: 'object' },
            description: 'Object with key-value pairs',
        },
    },
};
exports.default = meta;
const baseArgs = {
    labels: {
        env: 'production',
        region: 'us-west-1',
        tier: 'frontend',
    },
};
exports.Default = {
    args: baseArgs,
};
//# sourceMappingURL=DisplayLabels.stories.js.map