"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainText = exports.BlockWithHeader = exports.InlineCode = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const CopyToClipboard_1 = __importDefault(require("../../components/CopyToClipboard"));
const meta = {
    title: 'Components/CopyToClipboard',
    component: CopyToClipboard_1.default,
    argTypes: {
        copyText: {
            control: { type: 'text' },
            description: 'Text to copy',
        },
        header: {
            control: { type: 'text' },
            description: 'Header text (only visible if header is provided)',
        },
        inline: {
            control: { type: 'boolean' },
            description: 'Inline display mode',
        },
        codeBlock: {
            control: { type: 'boolean' },
            description: 'Code block styling',
        },
        fill: {
            control: { type: 'boolean' },
            description: 'Fill container width',
        },
    },
};
exports.default = meta;
const baseArgs = {
    copyText: 'This text will be copied to clipboard',
    children: react_1.default.createElement("span", null, "Some content to display"),
};
exports.Default = {
    args: baseArgs,
};
exports.InlineCode = {
    args: Object.assign(Object.assign({}, baseArgs), { children: react_1.default.createElement("code", null, "npm install package-name"), copyText: 'npm install package-name', inline: true, codeBlock: true }),
};
exports.BlockWithHeader = {
    args: Object.assign(Object.assign({}, baseArgs), { header: 'Installation', children: react_1.default.createElement("pre", { style: { margin: 0, padding: 10 } }, "npm install my-awesome-package"), copyText: 'npm install my-awesome-package', inline: false, codeBlock: true }),
};
exports.PlainText = {
    args: Object.assign(Object.assign({}, baseArgs), { children: react_1.default.createElement("span", null, "Simple text copy"), copyText: 'Simple text copy', codeBlock: false }),
};
//# sourceMappingURL=CopyToClipboard.stories.js.map