import { ThemeProvider } from '@material-ui/styles'
import React, { FC, useCallback, useMemo } from 'react'
import { useGridContext } from '../../../elements/grid/Grid'
import useToggler from '../../../hooks/useToggler'
import { useCustomTheme } from '../../../theme-manager/ThemeManager'
import GridDefaultActionButton, {
  GridDefaultActionButtonProps,
} from '../buttons/GridDefaultActionButton'

export interface GridDialogProps<T> {
  onClose: (success?: boolean) => void
  rows: T[]
}

export default function getGridDialogButton<T, DialogProps extends GridDialogProps<T>>(
  DialogComponent: FC<DialogProps>,
  customDialogProps?: Omit<DialogProps, keyof GridDialogProps<T>>,
  customButtonProps:
    | Partial<GridDefaultActionButtonProps<T>>
    | ((selectedItems: T[], isDisabled: boolean) => Partial<GridDefaultActionButtonProps<T>>) = {},
): FC<GridDefaultActionButtonProps<T>> {
  return ({ children, ...buttonProps }) => {
    const { triggerRefresh, selectedItems, clearSelectedRows } = useGridContext<T>()
    const [theme] = useCustomTheme()
    const [dialogOpened, toggleDialogOpened, setDialogOpened] = useToggler()
    const handleDialogClose = useCallback((success?: boolean) => {
      if (success === true && triggerRefresh) {
        clearSelectedRows()
        triggerRefresh()
      }
      setDialogOpened(false)
    }, [])
    const additionalButtonProps = useMemo(
      () =>
        typeof customButtonProps === 'function'
          ? customButtonProps(selectedItems, buttonProps.disabled)
          : customButtonProps,
      [customButtonProps, selectedItems, buttonProps.disabled],
    )
    return (
      <ThemeProvider theme={theme}>
        <GridDefaultActionButton
          {...buttonProps}
          {...additionalButtonProps}
          onClick={toggleDialogOpened}
        >
          {children}
        </GridDefaultActionButton>
        {dialogOpened && (
          <DialogComponent
            onClose={handleDialogClose}
            rows={selectedItems}
            // We have to trick the TS engine here as it is unable to infer extraProps as the remaining props
            {...((customDialogProps || {}) as DialogProps)}
          />
        )}
      </ThemeProvider>
    )
  }
}
