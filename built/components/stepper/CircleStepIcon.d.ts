/// <reference types="react" />
interface StepIconProps {
    stepNumber: number;
    icon?: string;
    inactiveStep?: boolean;
    className?: string;
    color?: string;
}
export default function CircleStepIcon({ stepNumber, icon, className, color, inactiveStep, }: StepIconProps): JSX.Element;
export {};
