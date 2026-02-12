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
exports.Default = void 0;
const react_1 = __importStar(require("react"));
const CodeMirrorModal_1 = __importDefault(require("../../../components/codeMirror/CodeMirrorModal"));
const button_1 = __importDefault(require("../../../elements/button"));
const meta = {
    title: 'Components/CodeMirror/CodeMirrorModal',
    component: CodeMirrorModal_1.default,
    argTypes: {
        label: { control: 'text' },
        value: { control: 'text' },
        open: { control: 'boolean' },
        onClose: { action: 'closed' },
    },
};
exports.default = meta;
const yamlContent = `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
`;
const baseArgs = {
    label: 'View Configuration',
    value: yamlContent,
    open: false,
    onClose: () => { },
};
const Wrapper = (args) => {
    const [open, setOpen] = (0, react_1.useState)(args.open);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(button_1.default, { onClick: () => setOpen(true) }, "Open CodeMirror Modal"),
        react_1.default.createElement(CodeMirrorModal_1.default, Object.assign({}, args, { open: open, onClose: () => {
                var _a;
                setOpen(false);
                (_a = args.onClose) === null || _a === void 0 ? void 0 : _a.call(args);
            } }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args))
};
//# sourceMappingURL=CodeMirrorModal.stories.js.map