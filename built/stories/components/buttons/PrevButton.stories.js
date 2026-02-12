"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Disabled = exports.Default = void 0;
const PrevButton_1 = __importDefault(require("../../../components/buttons/PrevButton"));
const meta = {
    title: 'Components/Buttons/PrevButton',
    component: PrevButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
        disabled: { control: 'boolean' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Go Back',
    },
};
exports.Disabled = {
    args: {
        children: 'Back',
        disabled: true,
    }
};
//# sourceMappingURL=PrevButton.stories.js.map