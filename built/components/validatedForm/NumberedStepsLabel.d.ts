/// <reference types="react" />
interface Props {
    step: number;
    title: string;
    className?: string;
}
export default function NumberedStepLabel({ step, title, className }: Props): JSX.Element;
export {};
