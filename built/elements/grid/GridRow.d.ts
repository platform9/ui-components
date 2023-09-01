/// <reference types="react" />
import { SelectableParsedGridRow } from './hooks/useGridSelectableRows';
import { GridRowMenuItemsProps, GridRowMenuOffset } from './hooks/useGridRowMenu';
import { GridExpandedRowsProps } from './hooks/useGridExpandedRows';
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
