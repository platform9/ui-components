"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Small = exports.Large = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Spacer_1 = __importDefault(require("../../elements/Spacer"));
const meta = {
    title: 'Elements/Spacer',
    component: Spacer_1.default,
    argTypes: {
        height: {
            control: { type: 'number' },
            description: 'Height of the spacer in pixels',
            table: {
                defaultValue: { summary: 16 },
                type: { summary: 'number' },
            },
        },
        className: {
            control: { type: 'text' },
            description: 'CSS class name to override styles',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};
exports.default = meta;
const baseArgs = {
    height: 16,
};
exports.Default = {
    args: Object.assign({}, baseArgs),
};
exports.Large = {
    args: Object.assign(Object.assign({}, baseArgs), { height: 48 }),
};
exports.Small = {
    args: Object.assign(Object.assign({}, baseArgs), { height: 8 }),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement("div", { style: { border: '1px solid #ccc', padding: '10px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Default Spacer (16px):"),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Top Block"),
            react_1.default.createElement(Spacer_1.default, Object.assign({}, args, { height: 16 })),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Bottom Block")),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Large Spacer (48px):"),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Top Block"),
            react_1.default.createElement(Spacer_1.default, Object.assign({}, args, { height: 48 })),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Bottom Block")),
        react_1.default.createElement("hr", null),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Small Spacer (8px):"),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Top Block"),
            react_1.default.createElement(Spacer_1.default, Object.assign({}, args, { height: 8 })),
            react_1.default.createElement("div", { style: { background: '#eee' } }, "Bottom Block")))),
};
//# sourceMappingURL=Spacer.stories.js.map