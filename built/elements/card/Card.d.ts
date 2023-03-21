import { ReactNode, PropsWithChildren } from 'react';
export interface CardProps {
    title?: string | ReactNode;
    footer?: string | ReactNode;
    withCustomBody?: boolean;
    withCustomFooter?: boolean;
    className?: string;
}
declare function Card({ title, children, footer, withCustomBody, withCustomFooter, className, }: PropsWithChildren<CardProps>): JSX.Element;
export default Card;
