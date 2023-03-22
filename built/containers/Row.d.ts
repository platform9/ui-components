import { PropsWithChildren } from 'react';
interface StyleProps {
    padding?: number;
    minItemWidth?: string;
    gap?: number;
    className?: string;
}
export default function Row({ children, padding, minItemWidth, gap, className, }: PropsWithChildren<StyleProps>): JSX.Element;
export {};
