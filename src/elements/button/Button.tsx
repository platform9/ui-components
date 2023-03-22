import React, { ReactNode } from 'react'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Text from '../Text'
import { ButtonProps as MuiButtonProps } from '@material-ui/core'
import generateTestId from '../../utils/test-helpers'
import Progress from '../../components/progress/Progress'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import { withInfoTooltip } from '../../components/InfoTooltip'
import { compose } from '../../utils/fp'

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'background'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'cta'
  size?: 'small' | 'medium' | 'large'
  children: string | ReactNode
  disabled?: boolean
  loading?: boolean
  icon?: string
  tooltip?: string | ReactNode
  rightIcon?: string
  solidIcon?: boolean
  iconBrand?: boolean
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  className = undefined,
  children,
  disabled = false,
  loading = false,
  icon = undefined,
  rightIcon = undefined,
  onClick,
  solidIcon = false,
  iconBrand = false,
  ...rest
}: ButtonProps) => {
  const hasRightIcon = !!rightIcon
  const hasLeftIcon = !!icon
  const isDropdown = rightIcon === 'angle-down'
  const classes = useStyles({ variant, size, hasLeftIcon, isDropdown, hasRightIcon })
  const spanTextVariant = size === 'large' ? 'buttonPrimary' : 'buttonSecondary'
  return (
    <button
      data-testid={generateTestId(children)}
      className={clsx(classes.button, className, {
        disabled,
        loading,
        [classes.isDropdown]: !!isDropdown,
      })}
      disabled={disabled || loading}
      onClick={disabled || loading ? undefined : onClick}
      {...rest}
    >
      <Text
        className={clsx('button-text', classes.buttonText, {
          [classes.iconText]: hasLeftIcon || hasRightIcon,
        })}
        component="div"
        variant={spanTextVariant}
      >
        {!!icon && !loading && (
          <FontAwesomeIcon size="md" solid={solidIcon} className="button-icon">
            {icon}
          </FontAwesomeIcon>
        )}
        {loading ? (
          <Progress
            inline
            overlay={false}
            message={null}
            loading
            inlineClassName={classes.inheritColors}
          />
        ) : (
          children
        )}
        {!!rightIcon && !loading && (
          <FontAwesomeIcon size="md" brand={iconBrand} className="button-icon button-right-icon">
            {rightIcon}
          </FontAwesomeIcon>
        )}
      </Text>
    </button>
  )
}

interface StyleProps extends ButtonProps {
  hasRightIcon: boolean
  hasLeftIcon: boolean
  isDropdown: boolean
}

const useStyles = makeStyles<Theme, Partial<StyleProps>>((theme: Theme) => ({
  isDropdown: {
    minWidth: 150,
  },
  inheritColors: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    fontStyle: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    fontStretch: 'inherit',
    letterSpacing: 'inherit',
  },
  iconText: {
    justifyContent: ({ hasLeftIcon }) => (!hasLeftIcon ? 'center' : 'start'),
    gridTemplateColumns: ({ hasLeftIcon, hasRightIcon }) =>
      `${hasLeftIcon ? 'max-content ' : ''}max-content${hasRightIcon ? ' max-content' : ''}`,
    gridTemplateAreas: ({ isDropdown }) =>
      isDropdown ? '"button-icon button-text button-right-icon"' : 'unset',
  },
  buttonText: {
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontSize: ({ size }) => (size === 'small' ? 12 : size === 'medium' ? 14 : 16),
    '& .loading-ellipsis-animation': {
      position: 'relative',
      top: -5,
    },
  },
  button: {
    cursor: 'pointer',
    outline: 0,
    height: ({ size }) => (size === 'medium' ? 36 : size === 'small' ? 32 : 40),
    transition:
      'background 0.2s ease, color 0.2s ease, border-color 0.2s ease, border-radius 0.3s ease',
    padding: ({ size, hasLeftIcon, hasRightIcon }) => {
      const hasIcon = hasLeftIcon || hasRightIcon
      const multiplier = size === 'small' ? 1 : size === 'medium' ? 2 : 3
      const verticalPad = 2 * multiplier
      const horizontalPad = 20
      const horizontalOffset = hasIcon ? horizontalPad / 8 : 0
      return `${verticalPad}px ${horizontalPad - horizontalOffset}px`
    },
    border: ({ variant }) => `1px solid ${theme.components.button[variant].border}`,
    backgroundColor: ({ variant }) => theme.components.button[variant].background,
    color: ({ variant }) => theme.components.button[variant].color,
    borderRadius: 4,

    '& .button-icon': {
      marginTop: 2,
      gridArea: ({ isDropdown }) => (isDropdown ? 'button-icon' : 'unset'),
      fontWeight: 400,
    },
    '& .button-icon, & .button-text': {
      transition: 'color 0.2s ease',
      color: ({ variant }) => theme.components.button[variant].color,
    },
    '& .button-right-icon': {
      gridArea: ({ isDropdown }) => (isDropdown ? 'button-right-icon' : 'unset'),
      fontSize: ({ isDropdown }) => (isDropdown ? 18 : undefined),
    },

    '&:hover, &.hover, &:active, &.active, &:focus, &.focus': {
      backgroundColor: ({ variant }) => theme.components.button[variant].activeBackground,
      borderColor: ({ variant }) => theme.components.button[variant].activeBorder,
      color: ({ variant }) => theme.components.button[variant].activeColor,
      '& .button-icon, & .button-text': {
        color: ({ variant }) => theme.components.button[variant].activeColor,
      },
    },
    '&.disabled': {
      cursor: 'not-allowed',
      backgroundColor: ({ variant }) =>
        `${theme.components.button[variant].disabledBackground} !important`,
      borderColor: ({ variant }) => `${theme.components.button[variant].disabledBorder} !important`,
      color: ({ variant }) => `${theme.components.button[variant].color} !important`,
      '& .button-icon, & .button-text': {
        color: ({ variant }) => theme.components.button[variant].color,
      },
    },
    '&.loading': {
      cursor: 'not-allowed',
      backgroundColor: ({ variant }) => `${theme.components.button[variant].background} !important`,
      borderColor: ({ variant }) => `${theme.components.button[variant].border} !important`,
      color: ({ variant }) => `${theme.components.button[variant].color} !important`,
    },
  },
}))

export default compose(withInfoTooltip)(Button)
