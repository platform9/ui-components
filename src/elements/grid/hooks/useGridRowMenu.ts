import { FC, useMemo, ReactNode } from 'react'
import { emptyArr } from '../../../utils/fp'
import { ParsedGridRow } from './useGridRows'
import GridDefaultActionButton from '../../../elements/grid/buttons/GridDefaultActionButton'
import { memoize } from '../../../utils/misc'

export interface GridRowMenuConfig<T> {
  rowMenuItems?: Array<GridRowMenuHeader | GridRowMenuItemSpec<T>>
  rowMenuOffset?: GridRowMenuOffset
  onRefresh?: (...args: unknown[]) => void | Promise<void>
  showRowMenuForSingleRowActions?: boolean
  maxRowMenuHeight?: number
}

export interface GridRowMenuOffset {
  vertical?: number
}

export interface GridRowMenuHeader {
  title?: string
  insertDivider?: boolean
}

export interface GridRowMenuItemSpec<T> {
  cond?: (item: T) => boolean
  label?: string | ReactNode
  icon?: string
  handleClick?: (item: T) => boolean | void | Promise<boolean | void | unknown>
  refreshAfterSuccess?: boolean
  onComplete?: (success, item: T) => boolean | void | Promise<boolean | void>
  RowMenuButton?: FC<RowMenuButtonProps<T>>
  hideIfDisabled?: boolean
}

export interface RowMenuButtonProps<T> {
  onClick: () => void | Promise<void>
  children: string | ReactNode
  disabled?: boolean
  icon?: string
  className?: string
}

export interface GridRowMenuItemsProps<T> {
  rowMenuDisabled: boolean
  rowMenuItems?: Array<GridRowMenuHeader | GridRowMenuItemProps<T>>
  rowMenuOffset?: GridRowMenuOffset
  showRowMenuForSingleRowActions?: boolean
  maxRowMenuHeight?: number
}

export interface GridRowMenuItemProps<T> {
  key: string | number
  label: string | ReactNode
  icon?: string
  getIsDisabled: (item: T) => boolean
  triggerAction: (item: T) => void
  RowMenuButton: FC<RowMenuButtonProps<T>>
  hideIfDisabled?: boolean
}

export const isGridRowMenuHeader = (item: any): item is GridRowMenuHeader =>
  !!item.title || !!item.insertDivider

export default function useGridRowMenu<T>(
  rows: Array<ParsedGridRow<T>>,
  {
    rowMenuItems: rowActionsSpec = emptyArr,
    onRefresh,
    rowMenuOffset = {},
    showRowMenuForSingleRowActions,
    maxRowMenuHeight,
  }: GridRowMenuConfig<T>,
): [Array<ParsedGridRow<T>>, GridRowMenuItemsProps<T>] {
  const rowMenuItems = useMemo<Array<GridRowMenuHeader | GridRowMenuItemProps<T>>>(() => {
    return rowActionsSpec.map((item, idx) => {
      if (isGridRowMenuHeader(item)) return item as GridRowMenuHeader
      const {
        cond,
        RowMenuButton = GridDefaultActionButton,
        label,
        refreshAfterSuccess,
        onComplete,
        handleClick,
        icon,
        hideIfDisabled = false,
      } = item as GridRowMenuItemSpec<T>
      return {
        key: idx,
        RowMenuButton,
        icon,
        label,
        hideIfDisabled,
        getIsDisabled: memoize((currentItem: T): boolean => cond && !cond(currentItem)),
        triggerAction: async (currentItem) => {
          const success = handleClick ? await handleClick(currentItem) : true
          if (success && refreshAfterSuccess && onRefresh) {
            onRefresh(true)
          }
          if (onComplete) {
            onComplete(success, currentItem)
          }
        },
      }
    })
  }, [rowActionsSpec])

  if (!rowActionsSpec.length) {
    return [rows, { rowMenuDisabled: true }]
  }

  return [
    rows,
    {
      rowMenuDisabled: false,
      rowMenuItems,
      rowMenuOffset,
      showRowMenuForSingleRowActions,
      maxRowMenuHeight,
    },
  ]
}
