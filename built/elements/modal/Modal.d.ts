import React, { PropsWithChildren } from 'react';
export interface ModalProps {
    open: boolean;
    onClose: (e?: any) => void;
    onBackdropClick?: (e?: any) => void;
    onClick?: (e?: any) => void;
    title?: string | React.ReactNode;
    entityName?: string;
    panel?: 'drawer' | 'dialog';
    info?: string | React.ReactNode;
    anchorId?: string;
    className?: string;
    footer?: React.ReactNode;
    slideFrom?: 'top' | 'right' | 'bottom' | 'left';
    maxWidth?: number;
    showOverlay?: boolean;
}
export default function Modal({ onClose, onClick, onBackdropClick, open, showOverlay, title, entityName, info, anchorId, footer, slideFrom, panel, maxWidth, children, className, ...rest }: PropsWithChildren<ModalProps>): React.ReactPortal;
