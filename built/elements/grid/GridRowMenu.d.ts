/// <reference types="react" />
import { GridRowMenuItemsProps, GridRowMenuOffset } from '../../elements/grid/hooks/useGridRowMenu';
interface GridRowMenuProps<T> extends GridRowMenuItemsProps<T> {
    item: T;
    rowMenuOffset?: GridRowMenuOffset;
    showRowMenuForSingleRowActions?: boolean;
}
export default function GridRowMenu<T>({ item, rowMenuItems, rowMenuDisabled, rowMenuOffset, showRowMenuForSingleRowActions, }: GridRowMenuProps<T>): JSX.Element;
export {};
