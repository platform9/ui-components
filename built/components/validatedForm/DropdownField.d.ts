import React, { FC, ReactElement } from 'react';
import { PropsWithFormContext } from '../../components/validatedForm/withFormContext';
import { PropsWithTooltip } from '../../elements/tooltip/withTooltip';
type BaseDropdownFieldProps<V, P> = {
    [K in keyof P]: P[K];
} & {
    DropdownComponent: FC<P>;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    error?: string;
    onChange?: (value?: V) => void;
};
export type DropdownFieldProps<V, P> = PropsWithFormContext<V, PropsWithTooltip<BaseDropdownFieldProps<V, P>>>;
declare const _default: <V, P>(props: DropdownFieldProps<V, P>) => React.ReactElement<DropdownFieldProps<V, P>, string | React.JSXElementConstructor<any>>;
export default _default;
