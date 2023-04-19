import React, { PropsWithChildren } from 'react';
import { ModalProps } from './Modal';
import { Route } from '../../plugins/route';
interface BaseModalFormProps extends Omit<ModalProps, 'open'> {
    submitTitle?: string;
    onSubmit?: any;
    disableSubmit?: boolean;
    fieldSetter?: any;
    error?: {
        title?: string;
        message?: string;
    };
    customErrorComponent?: React.ReactNode;
    loading?: boolean;
    loadingMessage?: string;
    submitting?: boolean;
    initialValues?: Record<string, unknown>;
    withAddonManager?: boolean;
    clearOnSubmit?: boolean;
}
interface PropsWithOpenRoute extends BaseModalFormProps {
    open?: undefined;
    route: Route;
}
interface PropsWithOpenFlag extends BaseModalFormProps {
    open: boolean;
    route?: undefined;
}
type ModalFormProps = PropsWithOpenRoute | PropsWithOpenFlag;
export default function ModalForm({ children, onSubmit, disableSubmit, submitTitle, fieldSetter, submitting, loading, loadingMessage, error, customErrorComponent, route, open, withAddonManager, initialValues, ...props }: PropsWithChildren<ModalFormProps>): JSX.Element;
export {};
