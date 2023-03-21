"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = require("react");
const constants_1 = require("../constants");
const getPagesCount = (totalItems, pageSize) => {
    const tmpPageCount = Math.ceil(totalItems / pageSize) - 1;
    return (tmpPageCount > 0 ? tmpPageCount : 0) + 1;
};
function useGridPagination(rows, { initialPage = 1, rowsPerPage = constants_1.defaultPageSize, controlledPagination, disablePagination = false, onPageChange, onRowsPerPageChange, totalItems = rows.length, showResultsPerPageDropdown = true, }) {
    if (disablePagination) {
        return [rows, { paginationDisabled: true }];
    }
    const [pageSize, setPageSize] = (0, react_1.useState)(rowsPerPage);
    const [page, setPage] = (0, react_1.useState)(initialPage);
    const pagesCount = (0, react_1.useMemo)(() => {
        return getPagesCount(totalItems, pageSize);
    }, [totalItems, pageSize]);
    const currentPage = (0, react_1.useMemo)(() => {
        return page > pagesCount ? pagesCount : page;
    }, [page, pagesCount, rows]);
    const goToPage = (0, react_1.useCallback)(async (page) => {
        const currentPage = page > pagesCount ? pagesCount : page < 1 ? 1 : page;
        if (onPageChange) {
            await onPageChange(currentPage, pageSize);
        }
        setPage(currentPage);
    }, [pagesCount, pageSize]);
    const updatePageSize = (0, react_1.useCallback)(async (pageSize) => {
        if (onPageChange) {
            const pagesCount = getPagesCount(totalItems, pageSize);
            const currentPage = page > pagesCount ? pagesCount : page < 1 ? 1 : page;
            await onPageChange(currentPage, pageSize);
        }
        if (onRowsPerPageChange) {
            await onRowsPerPageChange(pageSize);
        }
        setPageSize(pageSize);
    }, [currentPage]);
    const goPrevPage = (0, react_1.useCallback)(async () => {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1;
        if (onPageChange) {
            await onPageChange(prevPage, pageSize);
        }
        setPage(prevPage);
    }, [currentPage, pageSize]);
    const goNextPage = (0, react_1.useCallback)(async () => {
        const nextPage = currentPage < pagesCount ? currentPage + 1 : currentPage;
        if (onPageChange) {
            await onPageChange(nextPage, pageSize);
        }
        setPage(nextPage);
    }, [currentPage, pagesCount, pageSize]);
    const pageRows = (0, react_1.useMemo)(() => {
        if (controlledPagination) {
            return rows;
        }
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        return rows.slice(startIdx, endIdx);
    }, [rows, pageSize, currentPage]);
    return [
        pageRows,
        {
            rowsPerPage: pageSize,
            updateRowsPerPage: updatePageSize,
            currentPage,
            currentPageItemsCount: pageRows.length,
            itemsCount: totalItems,
            pagesCount,
            goToPage,
            goPrevPage,
            goNextPage,
            paginationDisabled: false,
            showResultsPerPageDropdown,
        },
    ];
}
exports.default = useGridPagination;
//# sourceMappingURL=useGridPagination.js.map