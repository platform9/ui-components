import { PropsWithChildren } from 'react';
interface StyleProps {
    padding?: string | number;
    variant?: 'card' | 'frame';
}
export declare function Container({ children, title, padding, }: PropsWithChildren<StyleProps & {
    title?: string;
}>): JSX.Element;
export declare function ThemedContainer({ children, padding, }: PropsWithChildren<StyleProps & {
    title?: string;
}>): JSX.Element;
export declare function Column({ children, variant, padding, }: PropsWithChildren<StyleProps>): JSX.Element;
export declare function Row({ children, padding }: PropsWithChildren<StyleProps>): JSX.Element;
export {};
