import { ReactNode } from 'react';
import { GridSortingConfig, GridSortableColumnSpec } from '../../elements/grid/hooks/useGridSorting';
import { GridBaseConfig, Accessor, GridColumnSpec } from '../../elements/grid/hooks/useGridRows';
import { GridPaginationConfig } from '../../elements/grid/hooks/useGridPagination';
declare type ControlledGridColumn<T, A extends Accessor<T> = Accessor<T>> = GridColumnSpec<T, A> & GridSortableColumnSpec;
export interface ControlledGridProps<T, C extends ControlledGridColumn<T> = ControlledGridColumn<T>> extends GridBaseConfig<T, C>, GridSortingConfig<C>, GridPaginationConfig {
    selectedItems: T[];
    onSelectChange: (selectedItems: T[]) => void;
    multiSelection?: boolean;
    disableRowSelection?: boolean;
    rowIsSelectableFn?: (item: T) => boolean;
    loading?: boolean;
    loadingMessage?: string;
    emptyContent?: ReactNode;
}
export default function ControlledGrid<T>(props: ControlledGridProps<T>): JSX.Element;
export {};
