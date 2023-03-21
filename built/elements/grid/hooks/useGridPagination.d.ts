import { ParsedGridRow } from './useGridRows';
export interface GridPaginationConfig {
    initialPage?: number;
    rowsPerPage?: number;
    disablePagination?: boolean;
    controlledPagination?: boolean;
    totalItems?: number;
    onPageChange?: (page: number, rowsPerPage: number) => void | Promise<void>;
    onRowsPerPageChange?: (rowsPerPage: number) => void | Promise<void>;
    disableToolbar?: boolean;
    showResultsPerPageDropdown?: boolean;
}
export interface GridPaginationProps {
    paginationDisabled: boolean;
    rowsPerPage?: number;
    updateRowsPerPage?: (size: number) => void;
    currentPage?: number;
    currentPageItemsCount?: number;
    pagesCount?: number;
    itemsCount?: number;
    goToPage?: (page: number) => void;
    goPrevPage?: () => void;
    goNextPage?: () => void;
    showResultsPerPageDropdown?: boolean;
}
export default function useGridPagination<T>(rows: Array<ParsedGridRow<T>>, { initialPage, rowsPerPage, controlledPagination, disablePagination, onPageChange, onRowsPerPageChange, totalItems, showResultsPerPageDropdown, }: GridPaginationConfig): [Array<ParsedGridRow<T>>, GridPaginationProps];
