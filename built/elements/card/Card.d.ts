import { PropsWithChildren, ReactNode } from 'react';
export interface CardProps {
    title?: string | ReactNode;
    footer?: string | ReactNode;
    withCustomBody?: boolean;
    withCustomFooter?: boolean;
    className?: string;
    dataTestId?: string;
}
declare function Card({ title, children, footer, withCustomBody, withCustomFooter, className, dataTestId, }: PropsWithChildren<CardProps>): JSX.Element;
export default Card;
