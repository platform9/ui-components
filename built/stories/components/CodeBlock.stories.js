"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.LongContent = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const CodeBlock_1 = __importDefault(require("../../components/CodeBlock"));
const meta = {
    title: 'Components/CodeBlock',
    component: CodeBlock_1.default,
    argTypes: {
        children: {
            control: { type: 'text' },
            description: 'Code content to display',
        },
        fill: {
            control: { type: 'boolean' },
            description: 'If true, fills the available height/width and flexes',
        },
        overflow: {
            control: { type: 'boolean' },
            description: 'If true, uses `pre` whitespace, else `pre-wrap`',
        },
    },
};
exports.default = meta;
const baseArgs = {
    children: `const greeting = "Hello World";
console.log(greeting);

function add(a, b) {
  return a + b;
}`,
    fill: false,
    overflow: false,
};
exports.Default = {
    args: baseArgs,
};
exports.LongContent = {
    args: Object.assign(Object.assign({}, baseArgs), { children: JSON.stringify({
            id: '12345',
            name: 'Test Object',
            description: 'This is a very long JSON object to demonstrate scrolling behavior.',
            data: Array.from({ length: 20 }).map((_, i) => ({ index: i, value: Math.random() })),
        }, null, 2) }),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Default Code Block:"),
            react_1.default.createElement(CodeBlock_1.default, Object.assign({}, args))),
        react_1.default.createElement("div", { style: { height: '200px', display: 'flex', flexDirection: 'column', border: '1px solid #ccc', padding: 10 } },
            react_1.default.createElement("strong", null, "Filled Code Block (inside 200px container):"),
            react_1.default.createElement(CodeBlock_1.default, Object.assign({}, args, { fill: true, overflow: true }),
                args.children,
                '\n// Extra lines to force scroll...',
                '\n'.repeat(20),
                '// End of file')))),
};
//# sourceMappingURL=CodeBlock.stories.js.map