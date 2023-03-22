/// <reference types="react" />
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows';
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
interface BaseGridArrayCellProps<K extends unknown[]> {
    nameFn: (item: ArrayElement<K>) => string;
}
interface GridArrayCellProps<T, K extends unknown[] = []> extends GridCellProps<T, K>, BaseGridArrayCellProps<K> {
}
export default function GridArrayCell<T, K extends unknown[]>({ value: items, nameFn, }: GridArrayCellProps<T, K>): JSX.Element;
export declare function createGridArrayCell<T, K extends unknown[]>({ nameFn }: BaseGridArrayCellProps<K>): (props: GridCellProps<T, K>) => JSX.Element;
export {};
