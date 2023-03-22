import { FC } from 'react';
import { GridDefaultActionButtonProps } from '../buttons/GridDefaultActionButton';
export interface GridDialogProps<T> {
    onClose: (success?: boolean) => void;
    rows: T[];
}
export default function getGridDialogButton<T, DialogProps extends GridDialogProps<T>>(DialogComponent: FC<DialogProps>, customDialogProps?: Omit<DialogProps, keyof GridDialogProps<T>>, customButtonProps?: Partial<GridDefaultActionButtonProps<T>> | ((selectedItems: T[], isDisabled: boolean) => Partial<GridDefaultActionButtonProps<T>>)): FC<GridDefaultActionButtonProps<T>>;
