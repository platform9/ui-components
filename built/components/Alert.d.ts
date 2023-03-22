import React, { PropsWithChildren } from 'react';
interface AlertProps {
    variant?: 'primary' | 'success' | 'warning' | 'error';
    title?: string;
    message?: string | React.ReactNode;
    id?: string;
    className?: string;
    maxWidth?: string;
}
export default function Alert({ variant, title, message, id, className, children, maxWidth, }: PropsWithChildren<AlertProps>): JSX.Element;
export {};
