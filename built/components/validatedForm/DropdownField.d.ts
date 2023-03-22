import React, { FC, ReactElement } from 'react';
import { PropsWithFormContext } from '../../components/validatedForm/withFormContext';
import { PropsWithTooltip } from '../../elements/tooltip/withTooltip';
declare type BaseDropdownFieldProps<V, P> = {
    [K in keyof P]: P[K];
} & {
    DropdownComponent: FC<P>;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    error?: string;
    onChange?: (value?: V) => void;
};
export declare type DropdownFieldProps<V, P> = PropsWithFormContext<V, PropsWithTooltip<BaseDropdownFieldProps<V, P>>>;
declare const _default: <V, P>(props: PropsWithFormContext<V, PropsWithTooltip<BaseDropdownFieldProps<V, P>>>) => React.ReactElement<PropsWithFormContext<V, PropsWithTooltip<BaseDropdownFieldProps<V, P>>>, string | ((props: any) => React.ReactElement<any, any>) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
