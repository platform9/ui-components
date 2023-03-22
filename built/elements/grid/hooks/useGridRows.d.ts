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
}
export declare type GridCellWidth = 'small' | 'medium' | 'large' | number;
export declare type Accessor<T> = string | keyof T | ((item: T) => unknown);
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
}
export interface ParsedGridCell<T, V = unknown> {
    key: string;
    value: V;
    width: GridCellWidth;
    getFormattedValue: () => string;
    CellComponent: FC<GridCellProps<T, V>>;
}
declare const useGridRows: <T>({ uniqueIdentifier, columns, data, }: GridBaseConfig<T, GridColumnSpec<T, Accessor<T>, (string extends keyof T ? T[keyof T & string] : unknown) | (keyof T extends keyof T ? T[keyof T] : keyof T extends (item: T) => unknown ? ReturnType<((item: T) => unknown) & keyof T> : unknown) | ((item: T) => unknown extends keyof T ? T[keyof T & ((item: T) => unknown)] : unknown)>>) => ParsedGridRow<T>[];
export default useGridRows;
