import { ReactNode } from 'react';
import { ParsedGridRow, ParsedGridCell, GridColumnSpec, GridCellWidth } from './useGridRows';
export interface GridManagedColumnSpec<T> extends GridColumnSpec<T> {
    key: string;
    display?: boolean;
    canHide?: boolean;
}
export interface GridManagedColumnsConfig<T, C extends GridManagedColumnSpec<T> = GridManagedColumnSpec<T>> {
    disableColumnOrdering?: boolean;
    columnsOrder?: string[];
    disableColumnHiding?: boolean;
    visibleColumns?: string[];
    onColumnsChange?: (visibleColumnKeys: string[], orderedColumnKeys: string[]) => void;
    columns: C[];
}
export interface ManagedColumnsParsedGridCell<T, V = unknown> extends ParsedGridCell<T, V> {
    visible?: boolean;
}
export interface ManagedColumnsParsedGridRow<T> extends ParsedGridRow<T> {
    getCells: () => Array<ManagedColumnsParsedGridCell<T>>;
}
export interface ColumnToggler {
    key: string;
    label: ReactNode;
    visible: boolean;
    disabled: boolean;
    toggleColumn: () => void;
}
export interface GridManagedColumnProps {
    key: string;
    label: ReactNode;
    tooltip: ReactNode;
    width: GridCellWidth;
    visible: boolean;
    changeColumnOrder: (targetIdx: any) => void;
    toggleColumn: (key: any) => void;
}
export interface GridManagedColumnsProps {
    columns: GridManagedColumnProps[];
    columnTogglers: ColumnToggler[];
    columnOrderingDisabled?: boolean;
    columnHidingDisabled?: boolean;
}
export default function useGridManagedColumns<T, C extends GridManagedColumnSpec<T>>(rows: Array<ParsedGridRow<T>>, { columns: columnSpecs, onColumnsChange, columnsOrder, visibleColumns, disableColumnOrdering, disableColumnHiding, }: GridManagedColumnsConfig<T, C>): [Array<ManagedColumnsParsedGridRow<T>>, GridManagedColumnsProps];
