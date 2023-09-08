/// <reference types="react" />
import { TextVariant } from '../../elements/Text';
interface Props {
    step: number;
    title: string;
    className?: string;
    textVariant?: TextVariant;
}
export default function NumberedStepLabel({ step, title, className, textVariant, }: Props): JSX.Element;
export {};
