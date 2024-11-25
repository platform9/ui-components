import { ReactNode } from 'react';
import { ParsedGridRow } from './useGridRows';
export interface GridExpandedRowsConfig<T> {
    expandableRow?: (row: T, onRowExpand: any) => ReactNode;
    expandedByDefault?: (row: T) => boolean;
    allowMultipleExpandedRows?: boolean;
    expandRowsUponSelection?: boolean;
}
export interface GridExpandedRowsProps {
    expandedRowsById?: {
        [key: string]: boolean;
    };
    onRowExpand?: (key: any) => () => void;
}
export default function useGridExpandedRows<T>(rows: Array<ParsedGridRow<T>>, { expandableRow, expandedByDefault, allowMultipleExpandedRows, expandRowsUponSelection, }: GridExpandedRowsConfig<T>): [Array<ParsedGridRow<T>>, GridExpandedRowsProps];
