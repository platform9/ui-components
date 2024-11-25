import { FC, ReactNode } from 'react';
export interface GridBaseConfig<T, C extends GridColumnSpec<T> = GridColumnSpec<T>> {
    uniqueIdentifier: keyof T;
    columns: C[];
    data: T[];
    onReload?: () => void | Promise<void>;
}
export interface GridCellProps<T, V = unknown> {
    index?: number;
    item?: T;
    value?: V;
    title?: string;
    /** This will typically contain the formatted value of the cell */
    children?: ReactNode;
    className?: string;
    expandRow?: () => void;
    rowIsExpanded?: boolean;
}
export type GridCellWidth = 'small' | 'medium' | 'large' | number;
export type Accessor<T> = string | keyof T | ((item: T) => unknown);
export interface GridColumnSpec<T, A extends Accessor<T> = Accessor<T>, V = A extends keyof T ? T[A] : A extends (item: T) => unknown ? ReturnType<A> : unknown> {
    key: keyof T | string;
    label: ReactNode;
    tooltip?: ReactNode;
    width?: GridCellWidth;
    /** If accessor is not defined, key will be used to get the value */
    accessor?: A;
    formatFn?: (value: V, item: T) => string;
    CellComponent?: FC<GridCellProps<T, V>>;
    /** @deprecated less performant than rendering with CellComponent */
    render?: (value: V, item: T) => ReactNode;
    memoizeCell?: boolean;
}
export interface ParsedGridRow<T> {
    key: string;
    item: T;
    getCells: () => Array<ParsedGridCell<T>>;
    isSelected?: boolean;
}
export interface ParsedGridCell<T, V = unknown> {
    key: string;
    value: V;
    width: GridCellWidth;
    getFormattedValue: () => string;
    CellComponent: FC<GridCellProps<T, V>>;
}
declare const useGridRows: <T>({ uniqueIdentifier, columns, data, }: GridBaseConfig<T, GridColumnSpec<T, Accessor<T>, (string extends infer T_1 ? T_1 extends string ? T_1 extends keyof T ? T[T_1] : T_1 extends (item: T) => unknown ? ReturnType<T_1> : unknown : never : never) | (keyof T extends infer T_2 ? T_2 extends keyof T ? T_2 extends keyof T ? T[T_2] : T_2 extends (item: T) => unknown ? ReturnType<T_2> : unknown : never : never) | (((item: T) => unknown) extends infer T_3 ? T_3 extends (item: T) => unknown ? T_3 extends keyof T ? T[T_3] : T_3 extends (item: T) => unknown ? ReturnType<T_3> : unknown : never : never)>>) => ParsedGridRow<T>[];
export default useGridRows;
