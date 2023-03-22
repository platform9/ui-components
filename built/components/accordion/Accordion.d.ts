import React, { PropsWithChildren } from 'react';
interface AccordionProps {
    id: string;
    title: string | React.ReactNode;
    open?: boolean;
    className?: string;
}
export default function Accordion({ id, title, children, open, className, ...props }: PropsWithChildren<AccordionProps>): JSX.Element;
export {};
