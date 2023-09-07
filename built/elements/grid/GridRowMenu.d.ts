/// <reference types="react" />
import { GridRowMenuItemsProps, GridRowMenuOffset } from '../../elements/grid/hooks/useGridRowMenu';
interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
    item: T;
    rowMenuOffset?: GridRowMenuOffset;
    showRowMenuForSingleRowActions?: boolean;
    maxRowMenuHeight?: number;
    expandRow?: () => void;
}
export default function GridRowMenu<T>({ item, rowMenuItems, rowMenuDisabled, rowMenuOffset, showRowMenuForSingleRowActions, maxRowMenuHeight, expandRow, }: GridRowMenuProps<T>): JSX.Element;
export {};
