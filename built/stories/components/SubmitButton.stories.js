"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLabel = exports.Default = void 0;
const SubmitButton_1 = __importDefault(require("../../components/SubmitButton"));
const meta = {
    title: 'Components/SubmitButton',
    component: SubmitButton_1.default,
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Button label',
        },
    },
};
exports.default = meta;
const baseArgs = {
    children: 'Submit Form',
};
exports.Default = {
    args: baseArgs,
};
exports.CustomLabel = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'Save Changes' }),
};
//# sourceMappingURL=SubmitButton.stories.js.map