import PropTypes from 'prop-types';
import React, { FC, FocusEvent } from 'react';
export declare const ValidatedFormInputPropTypes: {
    required: PropTypes.Requireable<boolean>;
    validateFormOnChange: PropTypes.Requireable<boolean>;
    validations: PropTypes.Requireable<object>;
    initialValue: PropTypes.Requireable<any>;
};
export interface ChildrenFnParams<T> {
    id: string;
    values?: Record<string, unknown>;
    value?: T;
    className?: string;
    onBlur?: (event: FocusEvent<any>) => void;
    onChange?: (value: T) => void;
    getCurrentValue?: <V, C>(getterFn?: (formContext: C) => V) => V;
    updateFieldValue?: (value: T) => void;
    setFieldValue?: <T>(key: string) => (value: T) => void;
    hasError?: boolean;
    errorMessage?: string;
    required?: boolean;
}
export interface ValidatedFormInputProps<T, P> {
    id: string;
    className?: string;
    value?: T;
    initialValue?: T;
    required?: boolean;
    error?: string;
    validateFormOnChange?: boolean;
    validations?: any[] | Record<string, any>;
    onBlur?: (event: FocusEvent<any>) => void;
    onChange?: (value: T) => void;
    children: (params: ChildrenFnParams<T> & P) => JSX.Element;
}
/**
 * Wrapper for all the inputs that will require some sort of interaction with
 * the ValidatedForm such as validations and text hints on hover
 */
export declare function ValidatedFormInput<T, P>({ id, className, initialValue, validateFormOnChange, value, required, validations, onBlur, onChange, children, error, ...rest }: ValidatedFormInputProps<T, P> & P): JSX.Element;
export type PropsWithFormContext<T, P> = ChildrenFnParams<T> & P;
/**
 * withFormContext provides access to the form context through props.
 *
 * This pattern is needed because React does not provide access to context within
 * lifecycle methods (componentDidMount).
 *
 * See: https://github.com/facebook/react/issues/12397#issuecomment-375501574
 *
 * @param {Inject the form context into this Component through props.} Input
 */
export default function withFormContext<T, P>(Input: FC<P & ChildrenFnParams<T>>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Omit<ValidatedFormInputProps<T, P>, "children"> & P> & React.RefAttributes<HTMLElement>>;
