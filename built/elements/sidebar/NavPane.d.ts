import React, { PropsWithChildren } from 'react';
type Props = PropsWithChildren<{
    className?: string;
    bottomContent?: JSX.Element[];
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
export default function NavPane({ className, title, children, bottomContent, ...rest }: PropsWithChildren<Props>): JSX.Element;
export {};
