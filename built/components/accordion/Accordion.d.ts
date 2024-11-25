import React, { PropsWithChildren } from 'react';
interface AccordionProps {
    id: string;
    title: string | React.ReactNode;
    className?: string;
    icon?: string;
    open?: boolean;
    onClick?: () => void;
}
export default function Accordion({ id, title, children, open, className, onClick, icon, ...props }: PropsWithChildren<AccordionProps>): JSX.Element;
export {};
