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
export type CheckboxFieldProps = PropsWithFormContext<boolean, PropsWithTooltip<BaseCheckboxFieldProps>>;
declare const _default: React.ForwardRefExoticComponent<Omit<import("../../components/validatedForm/withFormContext").ValidatedFormInputProps<boolean, import("../../components/validatedForm/withFormContext").ChildrenFnParams<boolean> & {
    tooltip?: React.ReactNode;
    tooltipProps?: Omit<import("../../elements/tooltip/Tooltip").TooltipProps, "message">;
} & BaseCheckboxFieldProps>, "children"> & import("../../components/validatedForm/withFormContext").ChildrenFnParams<boolean> & {
    tooltip?: React.ReactNode;
    tooltipProps?: Omit<import("../../elements/tooltip/Tooltip").TooltipProps, "message">;
} & BaseCheckboxFieldProps & React.RefAttributes<HTMLElement>>;
export default _default;
