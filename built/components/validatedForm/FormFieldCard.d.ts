import React, { PropsWithChildren } from 'react';
interface ContainerProps {
    title?: string | JSX.Element;
    link?: JSX.Element;
    topContent?: JSX.Element;
    className?: string;
    maxWidth?: number | string;
    step?: number;
    middleHeader?: JSX.Element;
}
export declare const useStyles: (props: ContainerProps) => import("@material-ui/styles").ClassNameMap<string>;
export declare const FormFieldCard: React.FC<PropsWithChildren<ContainerProps>>;
export {};
