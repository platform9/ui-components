"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomContent = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const NoContentMessage_1 = __importDefault(require("../../components/NoContentMessage"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const meta = {
    title: 'Components/NoContentMessage',
    component: NoContentMessage_1.default,
    argTypes: {
        message: {
            control: { type: 'text' },
            description: 'Message to display',
        },
        defaultHeight: {
            control: { type: 'number' },
            description: 'Minimum height of the container',
        },
    },
};
exports.default = meta;
const baseArgs = {
    message: 'No data found.',
    defaultHeight: 200,
};
exports.Default = {
    args: baseArgs,
};
exports.CustomContent = {
    args: Object.assign(Object.assign({}, baseArgs), { message: undefined, children: (react_1.default.createElement("div", { style: { textAlign: 'center' } },
            react_1.default.createElement("p", null, "No items to display at this time."),
            react_1.default.createElement(Button_1.default, null, "Refresh"))) }),
};
//# sourceMappingURL=NoContentMessage.stories.js.map