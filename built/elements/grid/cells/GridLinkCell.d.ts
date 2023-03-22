/// <reference types="react" />
import { GridCellProps } from '../../../elements/grid/hooks/useGridRows';
interface BaseGridLinkCellProps<T> {
    routeToFn: (item: T) => string;
}
interface GridLinkCellProps<T> extends GridCellProps<T>, BaseGridLinkCellProps<T> {
}
export default function GridLinkCell<T>({ children, item, routeToFn }: GridLinkCellProps<T>): JSX.Element;
export declare function createGridLinkCell<T>({ routeToFn }: BaseGridLinkCellProps<T>): (props: GridCellProps<T>) => JSX.Element;
export {};
