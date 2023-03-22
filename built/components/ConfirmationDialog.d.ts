import React from 'react';
interface IConfirmationDialog {
    loading?: boolean;
    open: boolean;
    title?: string;
    text?: JSX.Element | string;
    error?: {
        title?: string;
        message?: string;
    };
    cancelText?: string;
    confirmText?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    customFooterActions?: JSX.Element;
}
declare class ConfirmationDialog extends React.PureComponent<IConfirmationDialog> {
    handleCancel: () => void;
    handleConfirm: () => void;
    render(): JSX.Element;
}
export default ConfirmationDialog;
