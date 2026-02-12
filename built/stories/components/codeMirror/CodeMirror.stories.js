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
exports.WithError = exports.WithTools = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const CodeMirror_1 = __importDefault(require("../../../components/codeMirror/CodeMirror"));
const meta = {
    title: 'Components/CodeMirror/CodeMirror',
    component: CodeMirror_1.default,
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        hasError: { control: 'boolean' },
        errorMessage: { control: 'text' },
        loading: { control: 'boolean' },
        showSearchBar: { control: 'boolean' },
        showCopyButton: { control: 'boolean' },
        showDownloadButton: { control: 'boolean' },
        showExpandButton: { control: 'boolean' },
        showCollapseButton: { control: 'boolean' },
        collapseYaml: { control: 'boolean' },
        onChange: { action: 'changed' },
    },
};
exports.default = meta;
const yamlContent = `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2
    ports:
    - containerPort: 80
`;
const baseArgs = {
    id: 'cm-demo',
    label: 'YAML Configuration',
    value: yamlContent,
    onChange: () => { },
    options: {
        mode: 'yaml',
    }
};
const Wrapper = (args) => {
    const [val, setVal] = (0, react_1.useState)(args.value);
    return (react_1.default.createElement(CodeMirror_1.default, Object.assign({}, args, { value: val, onChange: (v) => {
            var _a;
            setVal(v);
            (_a = args.onChange) === null || _a === void 0 ? void 0 : _a.call(args, v);
        } })));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithTools = {
    args: Object.assign(Object.assign({}, baseArgs), { showSearchBar: true, showCopyButton: true, showDownloadButton: true, showExpandButton: true, showCollapseButton: true, downloadFileName: 'config.yaml' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
exports.WithError = {
    args: Object.assign(Object.assign({}, baseArgs), { hasError: true, errorMessage: 'Invalid configuration syntax' }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=CodeMirror.stories.js.map