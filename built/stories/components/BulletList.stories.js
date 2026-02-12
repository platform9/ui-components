"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.CustomContent = exports.Dashed = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const BulletList_1 = __importDefault(require("../../components/BulletList"));
const Text_1 = __importDefault(require("../../elements/Text"));
const meta = {
    title: 'Components/BulletList',
    component: BulletList_1.default,
    argTypes: {
        items: {
            control: { type: 'object' },
            description: 'List of items (string or JSX)',
        },
        type: {
            control: { type: 'text' },
            description: 'List style type (e.g. "disc", "circle", "dash")',
        },
    },
};
exports.default = meta;
const baseArgs = {
    items: ['Item 1', 'Item 2', 'Item 3'],
    type: 'disc',
};
exports.Default = {
    args: baseArgs,
};
exports.Dashed = {
    args: Object.assign(Object.assign({}, baseArgs), { type: 'dash' }),
};
exports.CustomContent = {
    args: Object.assign(Object.assign({}, baseArgs), { items: [
            'Simple string item',
            react_1.default.createElement(Text_1.default, { variant: "body2", style: { color: 'blue' } },
                "Custom ",
                react_1.default.createElement("strong", null, "JSX"),
                " Item"),
            'Another string',
        ] }),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '20px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Disc (Default):"),
            react_1.default.createElement(BulletList_1.default, Object.assign({}, args, { items: args.items, type: "disc" }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Circle:"),
            react_1.default.createElement(BulletList_1.default, Object.assign({}, args, { items: args.items, type: "circle" }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Square:"),
            react_1.default.createElement(BulletList_1.default, Object.assign({}, args, { items: args.items, type: "square" }))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Dash (Custom):"),
            react_1.default.createElement(BulletList_1.default, Object.assign({}, args, { items: args.items, type: "dash" }))))),
};
//# sourceMappingURL=BulletList.stories.js.map