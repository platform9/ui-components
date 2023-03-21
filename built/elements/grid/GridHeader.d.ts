/// <reference types="react" />
import { GridSortingProps } from './hooks/useGridSorting';
import { GridBatchActionsProps, SelectableParsedGridRow } from './hooks/useGridSelectableRows';
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns';
export interface GridHeaderProps<T> extends GridSortingProps, GridBatchActionsProps<T>, GridManagedColumnsProps {
    pageRows: Array<SelectableParsedGridRow<T>>;
    rowMenuItemsLength: number;
}
export default function GridHeader<T>(props: GridHeaderProps<T>): JSX.Element;
