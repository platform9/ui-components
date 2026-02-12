"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomIcon = exports.WithLink = exports.Default = void 0;
const HelpContainer_1 = __importDefault(require("../../components/HelpContainer"));
const meta = {
    title: 'Components/HelpContainer',
    component: HelpContainer_1.default,
    argTypes: {
        title: {
            control: { type: 'text' },
            description: 'Tooltip text',
        },
        icon: {
            control: { type: 'text' },
            description: 'Icon name',
        },
        color: {
            control: { type: 'radio' },
            options: ['white', 'black'],
            description: 'Icon color',
        },
        link: {
            control: { type: 'text' },
            description: 'Optional link URL',
        },
    },
};
exports.default = meta;
const baseArgs = {
    title: 'This is some helpful information.',
    icon: 'question-circle',
    color: 'black',
};
exports.Default = {
    args: baseArgs,
};
exports.WithLink = {
    args: Object.assign(Object.assign({}, baseArgs), { link: 'https://example.com', title: 'Click for more help' }),
};
exports.CustomIcon = {
    args: Object.assign(Object.assign({}, baseArgs), { icon: 'info-circle' }),
};
//# sourceMappingURL=HelpContainer.stories.js.map