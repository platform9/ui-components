"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Truncation = exports.Gallery = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Text_1 = __importDefault(require("../../elements/Text"));
const typography_1 = __importDefault(require("../../theme-manager/themes/base/typography"));
const variants = Object.keys(typography_1.default);
const meta = {
    title: 'Elements/Text',
    component: Text_1.default,
    argTypes: {
        variant: {
            options: variants,
            control: { type: 'select' },
            description: 'Typography variant',
            table: {
                defaultValue: { summary: 'body1' },
                type: { summary: 'string' },
            },
        },
        children: {
            control: { type: 'text' },
            description: 'Text content',
        },
        component: {
            description: 'DOM element to render',
            control: { type: 'text' },
        },
        noWrap: {
            control: { type: 'boolean' },
            description: 'If true, the text will not wrap',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' },
            },
        },
        lineClamp: {
            control: { type: 'number' },
            description: 'Number of lines to show before truncating',
            table: {
                type: { summary: 'number' },
            },
        },
        maxWidth: {
            control: { type: 'number' },
            description: 'Maximum width of the text container',
            table: {
                type: { summary: 'number' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body1',
};
exports.Default = {
    args: baseArgs,
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '16px' } }, variants.map((variant) => (react_1.default.createElement("div", { key: variant },
        react_1.default.createElement("div", { style: { fontSize: '12px', color: '#999', marginBottom: '4px' } }, variant),
        react_1.default.createElement(Text_1.default, Object.assign({}, args, { variant: variant }),
            variant,
            ": ",
            args.children),
        react_1.default.createElement("hr", { style: { margin: '8px 0', borderColor: '#eee' } })))))),
};
exports.Truncation = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'This is a very long text that should be truncated because it exceeds the maximum width or line clamp settings. '.repeat(10), maxWidth: 300, noWrap: true }),
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "noWrap + maxWidth (300px):"),
            react_1.default.createElement(Text_1.default, Object.assign({}, args))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "lineClamp (2 lines) + maxWidth (300px):"),
            react_1.default.createElement(Text_1.default, Object.assign({}, args, { noWrap: false, lineClamp: 2 }))))),
};
//# sourceMappingURL=Text.stories.js.map