import React from 'react';
export interface CheckboxProps {
    id?: any;
    type?: 'checkbox' | 'radio';
    textWeight?: 'heavy' | 'light';
    checked: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string | React.ReactNode;
    info?: string | React.ReactNode;
    className?: string;
    indeterminate?: boolean;
    containerComponent?: 'div' | 'fieldset';
}
export default function Checkbox({ id, type, textWeight, checked, disabled, onChange, label, info, className, indeterminate, containerComponent, ...props }: CheckboxProps): JSX.Element;
