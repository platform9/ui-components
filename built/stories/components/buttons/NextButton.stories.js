"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoIcon = exports.Default = void 0;
const NextButton_1 = __importDefault(require("../../../components/buttons/NextButton"));
const meta = {
    title: 'Components/Buttons/NextButton',
    component: NextButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
        showForward: { control: 'boolean' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Next Step',
    },
};
exports.NoIcon = {
    args: {
        children: 'Continue',
        showForward: false,
    }
};
//# sourceMappingURL=NextButton.stories.js.map