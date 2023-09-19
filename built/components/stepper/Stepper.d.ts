/// <reference types="react" />
import { TextVariant } from '../../elements/Text';
interface StepperProps {
    activeStep: number;
    steps: StepDetails[];
    className?: string;
    lineColor?: string;
    labelTextVariant?: TextVariant;
}
interface StepDetails {
    label: string;
    content?: string | JSX.Element;
    stepIcon?: JSX.Element;
}
export default function Stepper({ activeStep, steps, className, lineColor, labelTextVariant, }: StepperProps): JSX.Element;
export {};
