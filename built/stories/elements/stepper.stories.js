"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStepper = void 0;
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
const DefaultStepper = (args) => {
    return react_1.default.createElement(Stepper_1.default, Object.assign({}, args, { activeStep: 2, steps: steps }));
};
exports.DefaultStepper = DefaultStepper;
const StepperStories = {
    title: 'Elements/Stepper',
    component: Stepper_1.default,
};
exports.default = StepperStories;
//# sourceMappingURL=stepper.stories.js.map