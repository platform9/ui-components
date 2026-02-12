"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSXDescription = exports.WithChildren = exports.Default = void 0;
const react_1 = __importDefault(require("react"));
const numbered_steps_1 = __importDefault(require("../../components/numbered-steps"));
const Button_1 = __importDefault(require("../../elements/button/Button"));
const meta = {
    title: 'Components/NumberedSteps',
    component: numbered_steps_1.default,
    argTypes: {
        step: {
            control: { type: 'number' },
            description: 'Step number',
        },
        title: {
            control: { type: 'text' },
            description: 'Step title',
        },
        description: {
            control: { type: 'text' },
            description: 'Step description',
        },
    },
};
exports.default = meta;
const baseArgs = {
    step: 1,
    title: 'Configuration',
    description: 'Configure your cluster settings.',
};
exports.Default = {
    args: baseArgs,
};
exports.WithChildren = {
    args: Object.assign(Object.assign({}, baseArgs), { description: 'Please review the terms and click Next.', children: (react_1.default.createElement("div", { style: { marginLeft: 20 } },
            react_1.default.createElement(Button_1.default, { size: "small" }, "Next Step"))) }),
};
exports.JSXDescription = {
    args: Object.assign(Object.assign({}, baseArgs), { description: react_1.default.createElement("span", null,
            "This description uses ",
            react_1.default.createElement("strong", null, "JSX"),
            " for formatting.") })
};
//# sourceMappingURL=NumberedSteps.stories.js.map