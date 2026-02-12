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
exports.PreSelected = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const MultiSelect_1 = __importDefault(require("../../components/MultiSelect"));
const meta = {
    title: 'Components/MultiSelect',
    component: MultiSelect_1.default,
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Input label',
        },
        options: {
            control: { type: 'object' },
            description: 'Options array',
        },
        value: {
            control: { type: 'object' },
            description: 'Selected values',
        },
        onChange: { action: 'changed' },
        maxOptions: {
            control: { type: 'number' },
            description: 'Max visible options',
        },
    },
};
exports.default = meta;
const baseArgs = {
    id: 'multi-select-demo',
    label: 'Choose items',
    options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
        { label: 'Option 4', value: '4' },
        { label: 'Option 5', value: '5' },
    ],
    value: [],
    onChange: () => { },
};
const Wrapper = (args) => {
    const [value, setValue] = (0, react_1.useState)(args.value || []);
    return (react_1.default.createElement("div", { style: { maxWidth: 400 } },
        react_1.default.createElement(MultiSelect_1.default, Object.assign({}, args, { value: value, onChange: (val) => {
                var _a;
                setValue(val);
                (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
            } }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.PreSelected = {
    args: Object.assign(Object.assign({}, baseArgs), { value: ['1', '3'] }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=MultiSelect.stories.js.map