"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const DropdownButtons_1 = __importDefault(require("../../components/DropdownButtons"));
const meta = {
    title: 'Components/DropdownButtons',
    component: DropdownButtons_1.default,
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Main button label',
        },
        buttons: {
            control: { type: 'object' },
            description: 'List of button actions',
        },
    },
};
exports.default = meta;
const baseArgs = {
    label: 'Actions',
    buttons: [
        { label: 'Edit', icon: 'edit', onClick: () => console.log('Edit') },
        { label: 'Delete', icon: 'trash', onClick: () => console.log('Delete') },
        { label: 'View External', icon: 'external-link-alt', externalLink: 'https://example.com' },
        { label: 'Disabled Action', icon: 'ban', disabled: true, tooltipMsg: 'Not allowed' },
    ],
};
exports.Default = {
    args: baseArgs,
    decorators: [
        (Story) => (react_1.default.createElement("div", { style: { height: 250, display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(Story, null)))
    ]
};
//# sourceMappingURL=DropdownButtons.stories.js.map