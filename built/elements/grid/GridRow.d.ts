/// <reference types="react" />
import { SelectableParsedGridRow } from './hooks/useGridSelectableRows';
import { GridRowMenuItemsProps, GridRowMenuOffset } from './hooks/useGridRowMenu';
export interface GridRowProps<T> extends SelectableParsedGridRow<T>, GridRowMenuItemsProps<T> {
    className: string;
    tdClassName: string;
    cellClassName: string;
    index?: number;
    numPageItems?: number;
    rowMenuOffset?: GridRowMenuOffset;
}
export default function GridRow<T>(props: GridRowProps<T>): JSX.Element;
