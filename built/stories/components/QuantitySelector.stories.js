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
exports.LargeIcons = exports.Disabled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const QuantitySelector_1 = __importDefault(require("../../components/QuantitySelector"));
const ValidatedForm_1 = __importDefault(require("../../components/validatedForm/ValidatedForm"));
const meta = {
    title: 'Components/QuantitySelector',
    component: QuantitySelector_1.default,
    argTypes: {
        value: {
            control: { type: 'number' },
            description: 'Current value',
        },
        min: {
            control: { type: 'number' },
            description: 'Minimum value',
        },
        max: {
            control: { type: 'number' },
            description: 'Maximum value',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disabled state',
        },
        onChange: { action: 'changed' },
        iconSize: {
            control: { type: 'select' },
            options: ['sm', 'lg']
        }
    },
};
exports.default = meta;
const baseArgs = {
    value: 1,
    min: 0,
    max: 10,
    onChange: () => { },
};
const Wrapper = (args) => {
    const [val, setVal] = (0, react_1.useState)(args.value || 0);
    return (react_1.default.createElement(ValidatedForm_1.default, null,
        react_1.default.createElement(QuantitySelector_1.default, Object.assign({}, args, { value: val, onChange: (v) => {
                var _a;
                setVal(v);
                (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, v);
            } }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Disabled = {
    args: Object.assign(Object.assign({}, baseArgs), { disabled: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.LargeIcons = {
    args: Object.assign(Object.assign({}, baseArgs), { iconSize: 'lg' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=QuantitySelector.stories.js.map