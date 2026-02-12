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
exports.SingleValue = exports.PreFilled = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const KeyValues_1 = __importDefault(require("../../components/KeyValues"));
const meta = {
    title: 'Components/KeyValues',
    component: KeyValues_1.default,
    argTypes: {
        entries: {
            control: { type: 'object' },
            description: 'Initial entries',
        },
        onChange: { action: 'changed' },
        keySuggestions: {
            control: { type: 'object' },
            description: 'Suggestions for keys',
        },
        valueSuggestions: {
            control: { type: 'object' },
            description: 'Suggestions for values',
        },
        allowMultipleValues: {
            control: { type: 'boolean' },
            description: 'Allow adding multiple entries',
        },
    },
};
exports.default = meta;
const baseArgs = {
    entries: [{ key: '', value: '' }],
    onChange: () => { },
    keySuggestions: ['Environment', 'Region', 'Zone'],
    valueSuggestions: ['Production', 'Staging', 'US-West', 'US-East'],
    allowMultipleValues: true,
};
const Wrapper = (args) => {
    const [entries, setEntries] = (0, react_1.useState)(args.entries);
    return (react_1.default.createElement(KeyValues_1.default, Object.assign({}, args, { entries: entries, onChange: (newEntries) => {
            var _a;
            setEntries(newEntries);
            (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, newEntries);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.PreFilled = {
    args: Object.assign(Object.assign({}, baseArgs), { entries: [
            { key: 'Environment', value: 'Production' },
            { key: 'Region', value: 'US-West' }
        ] }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.SingleValue = {
    args: Object.assign(Object.assign({}, baseArgs), { allowMultipleValues: false, entries: [{ key: 'Single', value: 'Entry' }] }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=KeyValues.stories.js.map