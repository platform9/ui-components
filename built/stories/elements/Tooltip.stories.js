"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Tooltip_1 = __importDefault(require("../../elements/tooltip/Tooltip"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const meta = {
    title: 'Elements/Tooltip',
    component: Tooltip_1.default,
    argTypes: {
        message: {
            control: { type: 'text' },
            description: 'Tooltip message content',
        },
        align: {
            control: { type: 'object' },
            description: 'Alignment object { vertical, horizontal }',
        },
        customClassName: {
            control: { type: 'text' },
            description: 'Custom CSS class',
        },
    },
};
exports.default = meta;
const baseArgs = {
    message: 'This is a tooltip message',
};
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { padding: '50px', display: 'flex', justifyContent: 'center' } },
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args),
            react_1.default.createElement(Button_1.default, null, "Hover Me")))),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { padding: '50px', display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(3, 1fr)', justifyItems: 'center' } },
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Top Left", align: { vertical: 'top', horizontal: 'left' } }),
            react_1.default.createElement(Button_1.default, null, "Top Left")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Top Middle", align: { vertical: 'top', horizontal: 'middle' } }),
            react_1.default.createElement(Button_1.default, null, "Top Middle")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Top Right", align: { vertical: 'top', horizontal: 'right' } }),
            react_1.default.createElement(Button_1.default, null, "Top Right")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Middle Left", align: { vertical: 'middle', horizontal: 'left' } }),
            react_1.default.createElement(Button_1.default, null, "Middle Left")),
        react_1.default.createElement("div", { style: { width: '100px' } }),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Middle Right", align: { vertical: 'middle', horizontal: 'right' } }),
            react_1.default.createElement(Button_1.default, null, "Middle Right")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Bottom Left", align: { vertical: 'bottom', horizontal: 'left' } }),
            react_1.default.createElement(Button_1.default, null, "Bottom Left")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Bottom Middle", align: { vertical: 'bottom', horizontal: 'middle' } }),
            react_1.default.createElement(Button_1.default, null, "Bottom Middle")),
        react_1.default.createElement(Tooltip_1.default, Object.assign({}, args, { message: "Bottom Right", align: { vertical: 'bottom', horizontal: 'right' } }),
            react_1.default.createElement(Button_1.default, null, "Bottom Right")))),
};
//# sourceMappingURL=Tooltip.stories.js.map