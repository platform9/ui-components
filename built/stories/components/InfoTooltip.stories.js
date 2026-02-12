"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const InfoTooltip_1 = __importDefault(require("../../components/InfoTooltip"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const meta = {
    title: 'Components/InfoTooltip',
    component: InfoTooltip_1.default,
    argTypes: {
        info: {
            control: { type: 'text' },
            description: 'Tooltip content',
        },
        align: {
            control: { type: 'object' },
            description: 'Alignment object',
        },
        offset: {
            control: { type: 'object' },
            description: 'Offset object',
        },
    },
};
exports.default = meta;
const baseArgs = {
    info: 'This is an info tooltip',
    align: { vertical: 'top', horizontal: 'middle' },
};
exports.Default = {
    args: baseArgs,
    render: (args) => (react_1.default.createElement("div", { style: { padding: 50, display: 'flex', justifyContent: 'center' } },
        react_1.default.createElement(InfoTooltip_1.default, Object.assign({}, args),
            react_1.default.createElement(Button_1.default, null, "Hover Me"))))
};
//# sourceMappingURL=InfoTooltip.stories.js.map