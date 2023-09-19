"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Step_1 = __importDefault(require("./Step"));
const CircleStepIcon_1 = __importDefault(require("./CircleStepIcon"));
function Stepper({ activeStep, steps, className, lineColor, labelTextVariant, }) {
    const numSteps = steps.length;
    return (react_1.default.createElement("div", null, steps.map(({ label, content, stepIcon }, idx) => {
        const stepNumber = idx + 1;
        const isActiveStep = activeStep === stepNumber;
        const isCompleted = stepNumber < activeStep;
        return (react_1.default.createElement(Step_1.default, { key: label, className: className, label: label, content: content, stepIcon: stepIcon ? (stepIcon) : (react_1.default.createElement(CircleStepIcon_1.default, { stepNumber: stepNumber, icon: isCompleted ? 'check' : null, inactiveStep: !isActiveStep && !isCompleted })), isLastStep: idx === numSteps - 1, lineColor: lineColor, labelTextVariant: labelTextVariant }));
    })));
}
exports.default = Stepper;
//# sourceMappingURL=Stepper.js.map