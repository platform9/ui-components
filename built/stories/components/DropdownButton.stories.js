"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const DropdownButton_1 = __importDefault(require("../../components/DropdownButton"));
const meta = {
    title: 'Components/DropdownButton',
    component: DropdownButton_1.default,
    argTypes: {
        addText: {
            control: { type: 'text' },
            description: 'Button label',
        },
        links: {
            control: { type: 'object' },
            description: 'List of links',
        },
    },
};
exports.default = meta;
const baseArgs = {
    addText: 'Options',
    links: [
        { label: 'Profile', link: '/profile' },
        { label: 'Settings', link: '/settings' },
        { label: 'Logout', link: '/logout' },
    ],
};
exports.Default = {
    args: baseArgs,
    decorators: [
        (Story) => (react_1.default.createElement("div", { style: { height: 200, display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(Story, null)))
    ]
};
//# sourceMappingURL=DropdownButton.stories.js.map