"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gallery = exports.CustomLabelVariant = exports.CustomLineColor = exports.FirstStep = exports.Default = void 0;
/* eslint-disable no-restricted-globals */
const react_1 = __importDefault(require("react"));
const Stepper_1 = __importDefault(require("../../components/stepper/Stepper"));
const steps = [
    {
        label: 'Select campaign settings',
        content: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: 'Create an ad group',
        content: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        content: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];
const meta = {
    title: 'Elements/Stepper',
    component: Stepper_1.default,
    argTypes: {
        activeStep: {
            control: { type: 'number' },
            description: '1-based index of the active step',
            table: {
                defaultValue: { summary: 1 },
                type: { summary: 'number' },
            },
        },
        steps: {
            control: { type: 'object' },
            description: 'Configuration for each step (label, content, optional custom icon)',
            table: {
                type: { summary: 'Array<{ label: string; content?: string | JSX.Element }>' },
            },
        },
        lineColor: {
            control: { type: 'color' },
            description: 'Overrides the color of the vertical connector line between steps',
        },
    },
};
exports.default = meta;
const baseArgs = {
    activeStep: 2,
    steps,
};
exports.Default = {
    args: Object.assign({}, baseArgs),
};
exports.FirstStep = {
    args: Object.assign(Object.assign({}, baseArgs), { activeStep: 1 }),
};
exports.CustomLineColor = {
    args: Object.assign(Object.assign({}, baseArgs), { lineColor: '#00abe8' }),
};
exports.CustomLabelVariant = {
    args: Object.assign(Object.assign({}, baseArgs), { activeStep: 3, labelTextVariant: 'caption1' }),
};
exports.Gallery = {
    args: Object.assign({}, baseArgs),
    render: (args) => (react_1.default.createElement("div", { style: { display: 'grid', gap: 24 } },
        react_1.default.createElement(Stepper_1.default, Object.assign({}, args, { activeStep: 1, steps: steps })),
        react_1.default.createElement(Stepper_1.default, Object.assign({}, args, { activeStep: 2, steps: steps })),
        react_1.default.createElement(Stepper_1.default, Object.assign({}, args, { activeStep: 3, steps: steps })))),
};
//# sourceMappingURL=stepper.stories.js.map