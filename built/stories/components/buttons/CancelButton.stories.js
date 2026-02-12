"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLabel = exports.Default = void 0;
const CancelButton_1 = __importDefault(require("../../../components/buttons/CancelButton"));
const meta = {
    title: 'Components/Buttons/CancelButton',
    component: CancelButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
        disabled: { control: 'boolean' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Cancel',
    },
};
exports.CustomLabel = {
    args: {
        children: 'Abort',
    }
};
//# sourceMappingURL=CancelButton.stories.js.map