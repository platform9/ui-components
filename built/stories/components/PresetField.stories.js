"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const PresetField_1 = __importDefault(require("../../components/PresetField"));
const meta = {
    title: 'Components/PresetField',
    component: PresetField_1.default,
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Field label',
        },
        value: {
            control: { type: 'text' },
            description: 'Field value',
        },
    },
};
exports.default = meta;
const baseArgs = {
    label: 'Cluster Name',
    value: 'production-cluster-1',
};
exports.Default = {
    args: baseArgs,
};
//# sourceMappingURL=PresetField.stories.js.map