/// <reference types="react" />
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows';
import { BadgeVariant } from '../../../elements/badge/Badge';
export interface StatusCellModel {
    variant: BadgeVariant;
    label?: string;
    tooltipBody?: string;
}
interface BaseGridStatusCellProps<V> {
    dataFn: (value: V) => StatusCellModel;
}
interface GridStatusCellProps<T, V> extends GridCellProps<T, V>, BaseGridStatusCellProps<V> {
}
export default function GridStatusCell<T, V = string>({ value, dataFn, }: GridStatusCellProps<T, V>): JSX.Element;
export declare function createGridStatusCell<T, V = string>({ dataFn }: BaseGridStatusCellProps<V>): (props: GridCellProps<T, V>) => JSX.Element;
export {};
