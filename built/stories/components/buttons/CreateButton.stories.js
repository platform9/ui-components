"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const CreateButton_1 = __importDefault(require("../../../components/buttons/CreateButton"));
const meta = {
    title: 'Components/Buttons/CreateButton',
    component: CreateButton_1.default,
    argTypes: {
        children: { control: 'text' },
        onClick: { action: 'clicked' },
    },
};
exports.default = meta;
exports.Default = {
    args: {
        children: 'Create Item',
    },
};
//# sourceMappingURL=CreateButton.stories.js.map