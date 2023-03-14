import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import { memoize } from 'src/utils/misc'

interface FontAwesomeStyles {
  solid?: boolean
  brand?: boolean
  regular?: boolean
  light?: boolean
  duotone?: boolean
  thin?: boolean
}

interface Props extends React.HTMLAttributes<HTMLElement>, FontAwesomeStyles {
  children?: any
  size?: string
  className?: string
  name?: string
  spin?: boolean
  disabled?: boolean
}

const getStyleClass = memoize((light, solid, brand, regular, thin, duotone) => {
  if (solid) {
    return 'fa-solid'
  }
  if (brand) {
    return 'fa-brands'
  }
  if (regular) {
    return 'fa-regular'
  }
  if (thin) {
    return 'fa-thin'
  }
  if (duotone) {
    return 'fa-duotone'
  }
  if (light) {
    return 'fa-light'
  }
  return 'fa-light'
})

const FontAwesomeIcon = forwardRef<HTMLElement, Props>((props, ref?: React.Ref<HTMLElement>) => {
  const classes = useStyles(props)
  const {
    children,
    disabled = false,
    name,
    className,
    size = 'lg',
    solid,
    brand,
    regular,
    light = true,
    duotone,
    thin,
    spin,
    onClick,
    ...rest
  } = props
  const styleClass = getStyleClass(light, solid, brand, regular, thin, duotone)
  return (
    <i
      ref={ref}
      onClick={disabled ? undefined : onClick}
      className={clsx(
        classes.faIcon,
        `fa-${size}`,
        `fa-${name || children}`,
        styleClass,
        { 'fa-spin': spin },
        className,
      )}
      {...rest}
    />
  )
})

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  faIcon: {
    cursor: ({ disabled, onClick }) => (!disabled && onClick ? 'pointer' : 'inherit'),
    width: 'max-content',
    height: 'max-content',
    color: ({ disabled }) =>
      disabled ? theme?.components?.typography?.passive : theme?.components?.typography?.default,
  },
}))

export default FontAwesomeIcon
