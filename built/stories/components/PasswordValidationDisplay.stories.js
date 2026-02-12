"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullMatch = exports.PartialMatch = exports.Default = void 0;
const PasswordValidationDisplay_1 = __importDefault(require("../../components/PasswordValidationDisplay"));
const meta = {
    title: 'Components/PasswordValidationDisplay',
    component: PasswordValidationDisplay_1.default,
    argTypes: {
        values: {
            control: { type: 'object' },
            description: 'Object containing `newPassword` field to validate',
        },
    },
};
exports.default = meta;
const baseArgs = {
    values: { newPassword: '' },
};
exports.Default = {
    args: baseArgs,
};
exports.PartialMatch = {
    args: {
        values: { newPassword: 'Password1' },
    },
};
exports.FullMatch = {
    args: {
        values: { newPassword: 'Password1!' },
    },
};
//# sourceMappingURL=PasswordValidationDisplay.stories.js.map