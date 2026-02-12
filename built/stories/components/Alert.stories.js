"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Error = exports.Warning = exports.Success = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const Alert_1 = __importDefault(require("../../components/Alert"));
const meta = {
    title: 'Components/Alert',
    component: Alert_1.default,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'success', 'warning', 'error'],
            description: 'Alert variant style',
        },
        title: {
            control: { type: 'text' },
            description: 'Alert title',
        },
        message: {
            control: { type: 'text' },
            description: 'Alert message body',
        },
        maxWidth: {
            control: { type: 'text' },
            description: 'CSS max-width value',
        }
    },
};
exports.default = meta;
const baseArgs = {
    title: 'Alert Title',
    message: 'This is an important alert message.',
    variant: 'primary',
};
exports.Default = {
    args: baseArgs,
};
exports.Success = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'success', title: 'Success!', message: 'Operation completed successfully.' }),
};
exports.Warning = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'warning', title: 'Warning', message: 'Please proceed with caution.' }),
};
exports.Error = {
    args: Object.assign(Object.assign({}, baseArgs), { variant: 'error', title: 'Error', message: 'Something went wrong.' }),
};
exports.Gallery = {
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '16px' } },
        react_1.default.createElement(Alert_1.default, Object.assign({}, args, { variant: "primary", title: "Primary Alert" })),
        react_1.default.createElement(Alert_1.default, Object.assign({}, args, { variant: "success", title: "Success Alert" })),
        react_1.default.createElement(Alert_1.default, Object.assign({}, args, { variant: "warning", title: "Warning Alert" })),
        react_1.default.createElement(Alert_1.default, Object.assign({}, args, { variant: "error", title: "Error Alert" })),
        react_1.default.createElement(Alert_1.default, Object.assign({}, args, { variant: "primary", title: "With Children" }),
            react_1.default.createElement("div", { style: { marginTop: 8, padding: 8, background: 'rgba(255,255,255,0.5)' } }, "Custom content children")))),
    args: baseArgs,
};
//# sourceMappingURL=Alert.stories.js.map