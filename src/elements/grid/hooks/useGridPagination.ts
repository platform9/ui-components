/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo, useState, useCallback } from 'react'
import { ParsedGridRow } from './useGridRows'
import { defaultPageSize } from '../constants'

export interface GridPaginationConfig {
  initialPage?: number
  rowsPerPage?: number
  disablePagination?: boolean
  controlledPagination?: boolean
  totalItems?: number
  onPageChange?: (page: number, rowsPerPage: number) => void | Promise<void>
  onRowsPerPageChange?: (rowsPerPage: number) => void | Promise<void>
  disableToolbar?: boolean
  showResultsPerPageDropdown?: boolean
}

export interface GridPaginationProps {
  paginationDisabled: boolean
  rowsPerPage?: number
  updateRowsPerPage?: (size: number) => void
  currentPage?: number
  currentPageItemsCount?: number
  pagesCount?: number
  itemsCount?: number
  goToPage?: (page: number) => void
  goPrevPage?: () => void
  goNextPage?: () => void
  showResultsPerPageDropdown?: boolean
}

const getPagesCount = (totalItems, pageSize) => {
  const tmpPageCount = Math.ceil(totalItems / pageSize) - 1
  return (tmpPageCount > 0 ? tmpPageCount : 0) + 1
}

export default function useGridPagination<T>(
  rows: Array<ParsedGridRow<T>>,
  {
    initialPage = 1,
    rowsPerPage = defaultPageSize,
    controlledPagination,
    disablePagination = false,
    onPageChange,
    onRowsPerPageChange,
    totalItems = rows.length,
    showResultsPerPageDropdown = true,
  }: GridPaginationConfig,
): [Array<ParsedGridRow<T>>, GridPaginationProps] {
  if (disablePagination) {
    return [rows, { paginationDisabled: true }]
  }
  const [pageSize, setPageSize] = useState<number>(rowsPerPage)
  const [page, setPage] = useState<number>(initialPage)

  const pagesCount = useMemo<number>(() => {
    return getPagesCount(totalItems, pageSize)
  }, [totalItems, pageSize])

  const currentPage = useMemo<number>(() => {
    return page > pagesCount ? pagesCount : page
  }, [page, pagesCount, rows])

  const goToPage = useCallback(
    async (page: number) => {
      const currentPage = page > pagesCount ? pagesCount : page < 1 ? 1 : page
      if (onPageChange) {
        await onPageChange(currentPage, pageSize)
      }
      setPage(currentPage)
    },
    [pagesCount, pageSize],
  )

  const updatePageSize = useCallback(
    async (pageSize) => {
      if (onPageChange) {
        const pagesCount = getPagesCount(totalItems, pageSize)
        const currentPage = page > pagesCount ? pagesCount : page < 1 ? 1 : page
        await onPageChange(currentPage, pageSize)
      }
      if (onRowsPerPageChange) {
        await onRowsPerPageChange(pageSize)
      }
      setPageSize(pageSize)
    },
    [currentPage],
  )
  const goPrevPage = useCallback(async () => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1
    if (onPageChange) {
      await onPageChange(prevPage, pageSize)
    }
    setPage(prevPage)
  }, [currentPage, pageSize])

  const goNextPage = useCallback(async () => {
    const nextPage = currentPage < pagesCount ? currentPage + 1 : currentPage
    if (onPageChange) {
      await onPageChange(nextPage, pageSize)
    }
    setPage(nextPage)
  }, [currentPage, pagesCount, pageSize])

  const pageRows = useMemo<Array<ParsedGridRow<T>>>(() => {
    if (controlledPagination) {
      return rows
    }

    const startIdx = (currentPage - 1) * pageSize
    const endIdx = startIdx + pageSize
    return rows.slice(startIdx, endIdx)
  }, [rows, pageSize, currentPage])

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
  ]
}
