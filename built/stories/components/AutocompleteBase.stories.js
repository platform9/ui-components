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
exports.Gallery = exports.PreFilled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const AutocompleteBase_1 = __importDefault(require("../../components/AutocompleteBase"));
const meta = {
    title: 'Components/AutocompleteBase',
    component: AutocompleteBase_1.default,
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Input label/placeholder',
        },
        initialValue: {
            control: { type: 'text' },
            description: 'Initial input value',
        },
        suggestions: {
            control: { type: 'object' },
            description: 'Array of suggestion strings',
        },
        onChange: { action: 'changed' },
        fullWidth: {
            control: { type: 'boolean' },
            description: 'Full width input',
        },
    },
};
exports.default = meta;
const baseArgs = {
    label: 'Search...',
    suggestions: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
    value: '',
    onChange: () => { },
};
const Wrapper = (args) => {
    const [value, setValue] = (0, react_1.useState)(args.initialValue || '');
    return (react_1.default.createElement("div", { style: { padding: 20 } },
        react_1.default.createElement(AutocompleteBase_1.default, Object.assign({}, args, { value: value, onChange: (val) => {
                var _a;
                setValue(val);
                (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, val);
            } }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.PreFilled = {
    args: Object.assign(Object.assign({}, baseArgs), { initialValue: 'Ban' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Gallery = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: 20 } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "Default:"),
            react_1.default.createElement(Wrapper, Object.assign({}, args))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("strong", null, "With Many Suggestions:"),
            react_1.default.createElement(Wrapper, Object.assign({}, args, { suggestions: [
                    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
                    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
                ], label: "Select State" })))))
};
//# sourceMappingURL=AutocompleteBase.stories.js.map