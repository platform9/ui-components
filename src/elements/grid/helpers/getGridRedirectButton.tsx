import useReactRouter from 'use-react-router'
import React, { useCallback, useMemo } from 'react'
import { useGridContext } from '../Grid'
import GridDefaultActionButton, {
  GridDefaultActionButtonProps,
} from '../../../elements/grid/buttons/GridDefaultActionButton'

export default function getGridRedirectButton<T>(
  targetRoute: ((item: T) => string) | string,
  customButtonProps:
    | Partial<GridDefaultActionButtonProps<T>>
    | ((selectedItems: T[], isDisabled: boolean) => Partial<GridDefaultActionButtonProps<T>>) = {},
): React.FC<GridDefaultActionButtonProps<T>> {
  return ({ children, ...buttonProps }) => {
    const { history } = useReactRouter()
    const { selectedItems } = useGridContext<T>()
    const handleRedirect = useCallback(() => {
      const [firstItem] = selectedItems
      const targetRouteString =
        typeof targetRoute === 'string' ? targetRoute : targetRoute(firstItem)
      history.push(targetRouteString)
    }, [selectedItems])

    const additionalButtonProps = useMemo(
      () =>
        typeof customButtonProps === 'function'
          ? customButtonProps(selectedItems, buttonProps.disabled)
          : customButtonProps,
      [customButtonProps, selectedItems, buttonProps.disabled],
    )
    return (
      <GridDefaultActionButton {...buttonProps} {...additionalButtonProps} onClick={handleRedirect}>
        {children}
      </GridDefaultActionButton>
    )
  }
}
