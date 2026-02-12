"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Divider_1 = __importDefault(require("../../elements/Divider"));
const meta = {
    title: 'Elements/Divider',
    component: Divider_1.default,
    argTypes: {
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
const baseArgs = {};
exports.Default = {
    args: Object.assign({}, baseArgs),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement("div", { style: { width: '100%', padding: '20px' } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Default Divider:"),
            react_1.default.createElement("p", null, "Content above"),
            react_1.default.createElement(Divider_1.default, Object.assign({}, args)),
            react_1.default.createElement("p", null, "Content below")))),
};
//# sourceMappingURL=Divider.stories.js.map