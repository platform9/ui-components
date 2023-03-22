import { ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core';
export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'background'> {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'cta';
    size?: 'small' | 'medium' | 'large';
    children: string | ReactNode;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    tooltip?: string | ReactNode;
    rightIcon?: string;
    solidIcon?: boolean;
    iconBrand?: boolean;
}
declare const _default: any;
export default _default;
