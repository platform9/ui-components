import { ParsedGridRow } from './useGridRows';
export type OrderDirection = 'asc' | 'desc';
export interface SortingState {
    orderBy: string;
    orderDirection: OrderDirection;
}
export interface GridSortableColumnSpec<V = unknown> {
    key: string;
    disableSorting?: boolean;
    sortFn?: (prevItemVal: V, nextItemVal: V) => number;
}
export interface GridSortingConfig<C extends GridSortableColumnSpec = GridSortableColumnSpec> {
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
    disableSorting?: boolean;
    controlledSorting?: boolean;
    onSortChange?: (sortBy?: string, sortDirection?: 'asc' | 'desc') => void | Promise<void>;
    columns: C[];
}
export interface GridSortingProps {
    sortingDisabled: boolean;
    sortedBy?: string;
    sortedDirection?: OrderDirection;
    sortByFieldAsc?: (key: string) => void;
    sortByFieldDesc?: (key: string) => void;
    clearSorting?: () => void;
    toggleSort?: (key: string) => void;
}
export declare const defaultSortWith: (prevValue: any, nextValue: any) => 1 | -1;
export declare const defaultSortingState: SortingState;
export default function useGridSorting<T, C extends GridSortableColumnSpec>(rows: Array<ParsedGridRow<T>>, { orderBy: initialOrderBy, orderDirection: initialOrderDirection, disableSorting: disableAllSorting, controlledSorting, onSortChange, columns, }: GridSortingConfig<C>): [Array<ParsedGridRow<T>>, GridSortingProps];
