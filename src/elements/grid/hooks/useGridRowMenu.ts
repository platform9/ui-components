import { FC, useMemo, ReactNode } from 'react'
import { emptyArr } from '../../../utils/fp'
import { ParsedGridRow } from './useGridRows'
import GridDefaultActionButton from '../../../elements/grid/buttons/GridDefaultActionButton'
import { memoize } from '../../../utils/misc'

export interface GridRowMenuConfig<T> {
  rowMenuItems?: Array<GridRowMenuItemSpec<T>>
  rowMenuOffset?: GridRowMenuOffset
  onRefresh?: () => void | Promise<void>
  showRowMenuForSingleRowActions?: boolean
  maxRowMenuHeight?: number
}

export interface GridRowMenuOffset {
  vertical?: number
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
  rowMenuItems?: GridRowMenuItemProps<T>[]
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
  const rowMenuItems = useMemo<GridRowMenuItemProps<T>[]>(() => {
    return rowActionsSpec.map(
      (
        {
          cond,
          RowMenuButton = GridDefaultActionButton,
          label,
          refreshAfterSuccess,
          onComplete,
          handleClick,
          icon,
          hideIfDisabled = false,
        },
        idx,
      ) => ({
        key: idx,
        RowMenuButton,
        icon,
        label,
        hideIfDisabled,
        getIsDisabled: memoize((currentItem: T): boolean => cond && !cond(currentItem)),
        triggerAction: async (currentItem) => {
          const success = handleClick ? await handleClick(currentItem) : true
          if (success && refreshAfterSuccess && onRefresh) {
            onRefresh()
          }
          if (onComplete) {
            onComplete(success, currentItem)
          }
        },
      }),
    )
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
