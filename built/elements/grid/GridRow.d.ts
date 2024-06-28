/// <reference types="react" />
import { GridExpandedRowsProps } from './hooks/useGridExpandedRows';
import { GridRowMenuItemsProps, GridRowMenuOffset } from './hooks/useGridRowMenu';
import { SelectableParsedGridRow } from './hooks/useGridSelectableRows';
export interface GridRowProps<T> extends SelectableParsedGridRow<T>, GridRowMenuItemsProps<T>, GridExpandedRowsProps {
    className: string;
    tdClassName: string;
    cellClassName: string;
    index?: number;
    numPageItems?: number;
    rowMenuOffset?: GridRowMenuOffset;
    rowId?: string;
}
export default function GridRow<T>(props: GridRowProps<T>): JSX.Element;
