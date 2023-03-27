import React, { ReactNode } from 'react';
type Option = {
    value: string;
    label: string;
};
interface Props {
    id: string;
    label?: string;
    options: Option[];
    hasError?: boolean;
    required?: boolean;
    errorMessage?: string;
    value?: string[];
    onChange: (selectedItems: string[]) => void;
    maxOptions?: number;
    sortSelectedFirst?: boolean;
    className?: string;
    showSelectDeselectAllOption?: boolean;
    maxHeight?: number;
    loading?: boolean;
    tooltip?: string | ReactNode;
}
declare const _default: React.FC<import("../elements/tooltip/withTooltip").PropsWithTooltip<Props>>;
export default _default;
declare const Option: ({ classes, label, onChange, ...checkboxProps }: {
    [x: string]: any;
    classes: any;
    label: any;
    onChange: any;
}) => JSX.Element;
