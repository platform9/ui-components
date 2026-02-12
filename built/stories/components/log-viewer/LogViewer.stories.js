"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithStringInput = exports.NoLineNumbers = exports.LargeText = exports.Default = void 0;
const log_viewer_1 = __importDefault(require("../../../components/log-viewer"));
const meta = {
    title: 'Components/LogViewer',
    component: log_viewer_1.default,
    argTypes: {
        logs: { control: 'object' },
        size: { control: 'number' },
        lineNumbers: { control: 'boolean' },
        extraLines: {
            control: { type: 'select' },
            options: ['none', 'top', 'bottom', 'both'],
        },
    },
};
exports.default = meta;
const logs = [
    '2023-10-27T10:00:00Z INFO Starting application...',
    '2023-10-27T10:00:01Z DEBUG Connecting to database...',
    '2023-10-27T10:00:02Z INFO Database connected successfully.',
    '2023-10-27T10:00:03Z WARN Retrying external service call...',
    '2023-10-27T10:00:05Z ERROR Connection failed: Timeout.',
    '   at com.example.Service.connect(Service.java:45)',
    '   at com.example.Main.main(Main.java:20)',
];
const baseArgs = {
    logs: logs,
    size: 14,
    lineNumbers: true,
    extraLines: 'none',
};
exports.Default = {
    args: baseArgs,
};
exports.LargeText = {
    args: Object.assign(Object.assign({}, baseArgs), { size: 18 }),
};
exports.NoLineNumbers = {
    args: Object.assign(Object.assign({}, baseArgs), { lineNumbers: false }),
};
exports.WithStringInput = {
    args: Object.assign(Object.assign({}, baseArgs), { logs: logs.join('\n') })
};
//# sourceMappingURL=LogViewer.stories.js.map