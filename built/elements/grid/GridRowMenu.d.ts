/// <reference types="react" />
import { GridRowMenuItemsProps, GridRowMenuOffset } from '../../elements/grid/hooks/useGridRowMenu';
interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
    item: T;
    rowMenuOffset?: GridRowMenuOffset;
    showRowMenuForSingleRowActions?: boolean;
    maxRowMenuHeight?: number;
    expandRow?: () => void;
    toggleRow?: () => void;
}
export default function GridRowMenu<T>({ item, rowMenuItems, rowMenuDisabled, rowMenuOffset, showRowMenuForSingleRowActions, maxRowMenuHeight, expandRow, toggleRow, }: GridRowMenuProps<T>): JSX.Element;
export {};
