"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const SubmitButton_1 = __importDefault(require("../../../components/buttons/SubmitButton"));
const meta = {
    title: 'Components/Buttons/SubmitButton (Buttons Module)',
    component: SubmitButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Submit Request',
    },
};
//# sourceMappingURL=SubmitButton.stories.js.map