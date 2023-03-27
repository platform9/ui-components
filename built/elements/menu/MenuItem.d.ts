import React, { PropsWithChildren } from 'react';
import { TextVariant } from '../Text';
type Props = {
    component?: React.ElementType;
    textVariant?: TextVariant;
    icon?: string;
    iconPlacement?: 'start' | 'end';
    iconProps?: {
        [key: string]: any;
    };
    src?: string;
    className?: string;
    readonly?: boolean;
    onClick?: () => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
export default function MenuItem({ component, textVariant, icon, iconPlacement, iconProps, src, onClick, className, readonly, children, ...props }: PropsWithChildren<Props>): JSX.Element;
export {};
