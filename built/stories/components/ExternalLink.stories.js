"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomContent = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const ExternalLink_1 = __importDefault(require("../../components/ExternalLink"));
const meta = {
    title: 'Components/ExternalLink',
    component: ExternalLink_1.default,
    argTypes: {
        url: {
            control: { type: 'text' },
            description: 'Target URL',
        },
        newWindow: {
            control: { type: 'boolean' },
            description: 'Open in new window',
        },
        children: {
            control: { type: 'text' },
            description: 'Link text/content',
        },
    },
};
exports.default = meta;
const baseArgs = {
    url: 'https://www.platform9.com',
    children: 'Visit Platform9',
};
exports.Default = {
    args: baseArgs,
};
exports.CustomContent = {
    args: Object.assign(Object.assign({}, baseArgs), { children: react_1.default.createElement("strong", null, "Bold Link Text") }),
};
//# sourceMappingURL=ExternalLink.stories.js.map