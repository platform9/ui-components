/// <reference types="react" />
import { TextVariant } from '../../elements/Text';
export interface StepProps {
    label: string;
    stepIcon: JSX.Element;
    content?: string | JSX.Element;
    isLastStep?: boolean;
    className?: string;
    lineColor?: string;
    labelTextVariant?: TextVariant;
}
export default function Step({ label, content, stepIcon, isLastStep, className, lineColor, labelTextVariant, }: StepProps): JSX.Element;
