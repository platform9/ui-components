import React, { ReactNode } from 'react';
import { ControllerStateAndHelpers, DownshiftProps } from 'downshift';
type OnClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
interface DownshiftChildrenProps<T> extends ControllerStateAndHelpers<T> {
    getRemoveButtonProps: (args: {
        onClick: OnClickHandler;
        item: T;
    }) => {
        onClick: OnClickHandler;
    };
    toggleItem: (item: T) => void;
    selectItem: (item: T) => void;
    unselectItem: (item: T) => void;
    selectedItems: T[];
    selectAll: (items: T[]) => void;
    clear: () => void;
}
export interface MultiDownshiftProps<T> extends DownshiftProps<T> {
    children: (props: DownshiftChildrenProps<T>) => ReactNode;
    onMultiChange: (items: T[]) => void;
    selectedItems?: T[];
    isControlled?: boolean;
}
export default function MultiDownshift<T>({ children, onMultiChange, selectedItems, isControlled, ...props }: MultiDownshiftProps<T>): JSX.Element;
export {};
