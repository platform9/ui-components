import React, { FC, PropsWithChildren } from 'react';
interface Props {
    children: any;
    error?: boolean;
    className?: string;
    title?: string;
    expanded?: boolean;
}
declare const Info: ({ children, error, className, title, expanded, }: Props) => JSX.Element;
export declare const IconInfo: FC<PropsWithChildren<{
    icon: string;
    title: string | React.ReactNode;
    spacer?: boolean;
    className?: string;
    iconClass?: string;
}>>;
export default Info;
