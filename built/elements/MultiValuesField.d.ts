import React from 'react';
interface Props {
    label: string;
    items?: string[];
    addLabel: string;
    info?: string;
    placeholderText?: string;
    onChange: (value: string[]) => void;
}
declare const _default: React.ForwardRefExoticComponent<Pick<import("../components/validatedForm/withFormContext").ValidatedFormInputProps<unknown, Props>, "error" | "value" | "required" | "className" | "id" | "onBlur" | "onChange" | "initialValue" | "validations" | "validateFormOnChange"> & Props & React.RefAttributes<HTMLElement>>;
export default _default;
