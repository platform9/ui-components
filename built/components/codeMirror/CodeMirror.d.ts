import React from 'react';
import { ICodeMirror } from 'react-codemirror2';
import { ButtonProps } from '../../elements/button/Button';
export type AlignVertical = 'top' | 'middle' | 'bottom';
export type AlignHorizontal = 'left' | 'middle' | 'right';
export interface CodeMirrorActionButtonProps extends Omit<ButtonProps, 'children'> {
    classes?: any;
    align?: any;
    offset?: any;
    info?: string | React.ReactNode;
    infoPlacement?: any;
}
export interface Props extends ICodeMirror {
    id?: string;
    variant?: string;
    label?: string | React.ReactNode;
    value?: string;
    hasError?: boolean;
    errorMessage?: string;
    onChange?: (val: any) => void;
    options?: any;
    info?: string;
    align?: {
        vertical: AlignVertical;
        horizontal: AlignHorizontal;
    };
    className?: string;
    showSearchBar?: boolean;
    extraActions?: React.ReactElement;
    loading?: boolean;
    showCopyButton?: boolean;
    showDownloadButton?: boolean;
    downloadFileName?: string;
    showExpandButton?: boolean;
    showCollapseButton?: boolean;
    collapseYaml?: boolean;
    maxHeight?: number;
    downloadButtonProps?: CodeMirrorActionButtonProps;
    copyButtonProps?: CodeMirrorActionButtonProps;
}
export default function CodeMirror({ id, variant, label, value, hasError, errorMessage, onChange, options, info, align, className, showSearchBar, extraActions, loading, showCopyButton, showDownloadButton, downloadFileName, showExpandButton, showCollapseButton, maxHeight, collapseYaml, downloadButtonProps, copyButtonProps, ...restProps }: Props): JSX.Element;
