import React from 'react';
interface Props {
    label: string;
    items?: string[];
    addLabel: string;
    info?: string;
    placeholderText?: string;
    onChange: (value: string[]) => void;
    inputProperties?: Record<string, any>;
}
declare const _default: React.ForwardRefExoticComponent<Omit<import("../components/validatedForm/withFormContext").ValidatedFormInputProps<unknown, Props>, "children"> & Props & React.RefAttributes<HTMLElement>>;
export default _default;
