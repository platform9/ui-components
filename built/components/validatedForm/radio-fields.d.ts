import React from 'react';
export declare enum Orientation {
    Row = "row",
    Column = "column"
}
export interface OptionType {
    value: string | number;
    label: string;
    info?: string;
    infoPlacement?: string;
    disabled?: boolean;
    extraContent?: React.ReactNode;
}
interface FormProps {
    id: string;
    value: string;
    options: OptionType[];
    info?: string;
    title?: string;
    hasError?: boolean;
    orientation?: Orientation;
    errorMessage?: string;
    onChange: (value: OptionType['value']) => void;
    disabled?: boolean;
    className?: string;
}
declare const _default: React.FC<FormProps>;
export default _default;
