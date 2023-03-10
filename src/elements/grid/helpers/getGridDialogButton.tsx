import React, { useCallback, FC, useMemo } from 'react'
import GridDefaultActionButton, {
  GridDefaultActionButtonProps,
} from '../buttons/GridDefaultActionButton'
import useToggler from 'src/hooks/useToggler'
import { useGridContext } from 'src/elements/grid/Grid'
import { ThemeProvider } from '@material-ui/styles'
import { useCustomTheme } from 'src/theme-manager/ThemeManager'

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
      <>
        <GridDefaultActionButton
          {...buttonProps}
          {...additionalButtonProps}
          onClick={toggleDialogOpened}
        >
          {children}
        </GridDefaultActionButton>
        {dialogOpened && (
          <ThemeProvider theme={theme}>
            <DialogComponent
              onClose={handleDialogClose}
              rows={selectedItems}
              // We have to trick the TS engine here as it is unable to infer extraProps as the remaining props
              {...((customDialogProps || {}) as DialogProps)}
            />
          </ThemeProvider>
        )}
      </>
    )
  }
}
