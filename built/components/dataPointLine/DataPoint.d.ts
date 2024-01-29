/// <reference types="react" />
import { TextVariant } from '../../elements/Text';
interface DataPointLineProps {
    description: string | JSX.Element;
    percent: number;
    className?: string;
    textVariant?: TextVariant;
    circleColor?: string;
}
export default function DataPointLine({ description, percent, className, textVariant, circleColor, }: DataPointLineProps): JSX.Element;
export {};
