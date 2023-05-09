/// <reference types="react" />
import { GridRowMenuItemsProps, GridRowMenuOffset } from '../../elements/grid/hooks/useGridRowMenu';
interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
    item: T;
    rowMenuOffset?: GridRowMenuOffset;
    showRowMenuForSingleRowActions?: boolean;
    maxRowMenuHeight?: number;
}
export default function GridRowMenu<T>({ item, rowMenuItems, rowMenuDisabled, rowMenuOffset, showRowMenuForSingleRowActions, maxRowMenuHeight, }: GridRowMenuProps<T>): JSX.Element;
export {};
