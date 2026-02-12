"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Spinning = exports.Brands = exports.Regular = exports.Solid = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const FontAwesomeIcon_1 = __importDefault(require("../../components/FontAwesomeIcon"));
const meta = {
    title: 'Components/FontAwesomeIcon',
    component: FontAwesomeIcon_1.default,
    argTypes: {
        name: {
            control: { type: 'text' },
            description: 'Icon name (without fa- prefix)',
        },
        size: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'lg', '2x', '3x', '5x', '7x', '10x'],
            description: 'Size of the icon',
        },
        solid: {
            control: { type: 'boolean' },
            description: 'Solid style',
        },
        regular: {
            control: { type: 'boolean' },
            description: 'Regular style',
        },
        light: {
            control: { type: 'boolean' },
            description: 'Light style',
        },
        brand: {
            control: { type: 'boolean' },
            description: 'Brand style',
        },
        spin: {
            control: { type: 'boolean' },
            description: 'Spin animation',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
    },
};
exports.default = meta;
const baseArgs = {
    children: 'user',
    size: '2x',
    solid: true,
};
exports.Default = {
    args: baseArgs,
};
exports.Solid = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'check-circle', solid: true }),
};
exports.Regular = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'check-circle', solid: false, regular: true }),
};
exports.Brands = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'github', solid: false, brand: true })
};
exports.Spinning = {
    args: Object.assign(Object.assign({}, baseArgs), { children: 'spinner', spin: true }),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'flex', gap: '20px', alignItems: 'center' } },
        react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({}, args, { name: "home" })),
        react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({}, args, { name: "user" })),
        react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({}, args, { name: "cog", spin: true })),
        react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({}, args, { name: "trash", size: "3x" })),
        react_1.default.createElement(FontAwesomeIcon_1.default, Object.assign({}, args, { name: "ban", disabled: true })))),
};
//# sourceMappingURL=FontAwesomeIcon.stories.js.map