import { PropsWithChildren } from 'react';
interface StyleProps {
    padding?: string | number;
    gap?: string | number;
}
export default function Column({ children, gap, padding, }: PropsWithChildren<StyleProps>): JSX.Element;
export {};
