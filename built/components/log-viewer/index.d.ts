/// <reference types="react" />
export default function LogViewer({ logs, size, lineNumbers, className, extraLines, }: Props): JSX.Element;
interface Props {
    logs: string | string[];
    size?: number;
    lineNumbers?: boolean;
    className?: string;
    extraLines?: 'none' | 'top' | 'bottom' | 'both';
}
export {};
