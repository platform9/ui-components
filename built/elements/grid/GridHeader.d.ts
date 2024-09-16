/// <reference types="react" />
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns';
import { GridBatchActionsProps, SelectableParsedGridRow } from './hooks/useGridSelectableRows';
import { GridSortingProps } from './hooks/useGridSorting';
export interface GridHeaderProps<T> extends GridSortingProps, GridBatchActionsProps<T>, GridManagedColumnsProps {
    pageRows: Array<SelectableParsedGridRow<T>>;
    rowMenuItemsLength: number;
    rowMenuCellWidth?: number;
}
export default function GridHeader<T>(props: GridHeaderProps<T>): JSX.Element;
