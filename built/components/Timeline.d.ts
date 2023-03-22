/// <reference types="react" />
interface Props {
    items: string[];
    activeStep?: number;
    className?: string;
}
export default function Timeline({ items, activeStep, className }: Props): JSX.Element;
export {};
