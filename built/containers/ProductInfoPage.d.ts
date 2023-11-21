import React, { PropsWithChildren } from 'react';
interface Props {
    title: string;
    icon?: React.ReactNode;
    actions: React.ReactNode[];
    footerTitle?: string;
    rootClassName?: string;
    className?: string;
    componentDidMountFn?: any;
    componentWillUnmountFn?: any;
}
export default function ProductInfoPage({ title, footerTitle, className, rootClassName, children, icon, actions, componentDidMountFn, componentWillUnmountFn, }: PropsWithChildren<Props>): JSX.Element;
export {};
