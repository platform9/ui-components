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
exports.Paused = exports.Loading = exports.Default = void 0;
const react_1 = __importStar(require("react"));
const PollingData_1 = __importDefault(require("../../components/PollingData"));
const meta = {
    title: 'Components/PollingData',
    component: PollingData_1.default,
    argTypes: {
        loading: {
            control: { type: 'boolean' },
            description: 'Loading state',
        },
        hidden: {
            control: { type: 'boolean' },
            description: 'Hide the control',
        },
        pause: {
            control: { type: 'boolean' },
            description: 'Pause polling',
        },
        pollIntervalMs: {
            control: { type: 'number' },
            description: 'Polling interval in ms',
        },
        onReload: { action: 'reloaded' },
    },
};
exports.default = meta;
const baseArgs = {
    loading: false,
    hidden: false,
    pause: false,
    pollIntervalMs: 2000,
    onReload: async () => new Promise(resolve => setTimeout(resolve, 1000)),
    refreshDuration: 10000,
};
const Wrapper = (args) => {
    const [loading, setLoading] = (0, react_1.useState)(args.loading);
    const handleReload = async () => {
        var _a;
        setLoading(true);
        (_a = args.onReload) === null || _a === void 0 ? void 0 : _a.call(args, true, false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
    };
    return (react_1.default.createElement("div", { style: { padding: 20 } },
        react_1.default.createElement(PollingData_1.default, Object.assign({}, args, { loading: loading, onReload: handleReload }))));
};
exports.Default = {
    args: baseArgs,
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Loading = {
    args: Object.assign(Object.assign({}, baseArgs), { loading: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
exports.Paused = {
    args: Object.assign(Object.assign({}, baseArgs), { pause: true }),
    render: (args) => react_1.default.createElement(Wrapper, Object.assign({}, args)),
};
//# sourceMappingURL=PollingData.stories.js.map