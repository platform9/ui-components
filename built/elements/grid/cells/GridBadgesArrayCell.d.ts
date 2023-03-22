/// <reference types="react" />
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows';
import { BadgeVariant } from '../../../elements/badge/Badge';
interface BaseGridArrayCellProps<K extends unknown[]> {
    badgeVariant?: BadgeVariant;
    maxItems?: number;
}
interface GridArrayCellProps<T, K extends unknown[] = []> extends GridCellProps<T, K>, BaseGridArrayCellProps<K> {
}
export default function GridBadgesArrayCell<T, K extends unknown[]>({ value: items, badgeVariant, maxItems, }: GridArrayCellProps<T, K>): JSX.Element;
export declare function createGridBadgesArrayCell<T, K extends unknown[]>({ badgeVariant, maxItems, }: BaseGridArrayCellProps<K>): (props: GridCellProps<T, K>) => JSX.Element;
export {};
