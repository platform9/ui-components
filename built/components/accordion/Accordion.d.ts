import React, { PropsWithChildren } from 'react';
interface AccordionProps {
    id: string;
    title: string | React.ReactNode;
    open?: boolean;
    className?: string;
    onClick?: () => void;
    icon?: string;
}
export default function Accordion({ id, title, children, open, className, onClick, icon, ...props }: PropsWithChildren<AccordionProps>): JSX.Element;
export {};
