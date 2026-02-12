"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.Disabled = exports.Indeterminate = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const Checkbox_1 = __importDefault(require("../../components/Checkbox"));
const Text_1 = __importDefault(require("../../elements/Text"));
// This Checkbox component is a wrapper around Material UI Checkbox with custom icons.
// It is distinct from elements/input/Checkbox.
const meta = {
    title: 'Components/Checkbox',
    component: Checkbox_1.default,
    argTypes: {
        checked: {
            control: { type: 'boolean' },
            description: 'Checked state',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
        indeterminate: {
            control: { type: 'boolean' },
            description: 'Indeterminate state',
        },
        onChange: { action: 'changed' },
        name: {
            control: { type: 'text' },
            description: 'Input name',
        },
    },
};
exports.default = meta;
const baseArgs = {
    checked: false,
    disabled: false,
    indeterminate: false,
    name: 'test-checkbox',
};
const Wrapper = (args) => {
    const [checked, setChecked] = (0, react_1.useState)(args.checked);
    return (react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
        react_1.default.createElement(Checkbox_1.default, Object.assign({}, args, { checked: checked, onChange: (e) => {
                var _a;
                setChecked(e.target.checked);
                (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, e);
            } })),
        react_1.default.createElement(Text_1.default, { variant: "body2", onClick: () => setChecked(!checked), style: { cursor: 'pointer' } }, "Label for Checkbox")));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Indeterminate = {
    args: Object.assign(Object.assign({}, baseArgs), { indeterminate: true, checked: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true, checked: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: '10px' } },
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Checkbox_1.default, { checked: false }),
            " ",
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "Unchecked")),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Checkbox_1.default, { checked: true }),
            " ",
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "Checked")),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Checkbox_1.default, { indeterminate: true }),
            " ",
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "Indeterminate")),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Checkbox_1.default, { disabled: true, checked: false }),
            " ",
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "Disabled Unchecked")),
        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
            react_1.default.createElement(Checkbox_1.default, { disabled: true, checked: true }),
            " ",
            react_1.default.createElement(Text_1.default, { variant: "body2" }, "Disabled Checked")))),
};
//# sourceMappingURL=Checkbox.stories.js.map