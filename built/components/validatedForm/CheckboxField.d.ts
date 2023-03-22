import React from 'react';
import { CheckboxProps } from '../../elements/input/Checkbox';
import { PropsWithFormContext } from '../../components/validatedForm/withFormContext';
import { PropsWithTooltip } from '../../elements/tooltip/withTooltip';
interface BaseCheckboxFieldProps extends Omit<CheckboxProps, 'checked'> {
    required?: boolean;
    disabled?: boolean;
    label?: string;
    onChange?: (value?: boolean) => void;
}
export declare type CheckboxFieldProps = PropsWithFormContext<boolean, PropsWithTooltip<BaseCheckboxFieldProps>>;
declare const _default: React.ForwardRefExoticComponent<Pick<import("./withFormContext").ValidatedFormInputProps<boolean, PropsWithFormContext<boolean, PropsWithTooltip<BaseCheckboxFieldProps>>>, "error" | "value" | "required" | "className" | "id" | "onBlur" | "onChange" | "initialValue" | "validations" | "validateFormOnChange"> & import("./withFormContext").ChildrenFnParams<boolean> & {
    tooltip?: React.ReactNode;
    tooltipProps?: Pick<import("../../elements/tooltip/Tooltip").TooltipProps, "offset" | "align" | "origin" | "customClassName" | "customBody">;
} & BaseCheckboxFieldProps & React.RefAttributes<HTMLElement>>;
export default _default;
