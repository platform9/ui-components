import React, { PropsWithChildren, ReactNode } from 'react';
export interface InputIconProps {
    onClick?: () => void;
    placement?: 'start' | 'end';
}
export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string;
    compact?: boolean;
    variant?: 'light' | 'dark';
    mask?: string;
    iconProps?: InputIconProps;
    icon?: string;
    label?: string;
    info?: string | ReactNode;
    disabled?: boolean;
    error?: string;
    onChange?: (e: any) => void;
}
declare const Input: ({ className, compact, variant, mask, icon, iconProps, placeholder, label, info, children, value, onChange, disabled, error, ...rest }: PropsWithChildren<InputProps>) => JSX.Element;
export default Input;
