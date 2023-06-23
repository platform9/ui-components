import React, { forwardRef, useCallback, ComponentType, PropsWithChildren } from 'react'
import { Link } from '@material-ui/core'
import useReactRouter from 'use-react-router'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import FontAwesomeIcon from './FontAwesomeIcon'
import Theme from '../theme-manager/themes/model'
import Text, { TextVariant } from '../elements/Text'
import generateTestId from '../utils/test-helpers'

type ISimpleLinkVariant = 'error' | 'primary' | 'secondary'

export interface Props {
  src?: string
  staticContext?: any
  className?: string
  icon?: string
  variant?: ISimpleLinkVariant
  textVariant?: TextVariant
  textDecoration?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  label?: string
  lineClamp?: number
  iconPosition?: 'left' | 'right'
  underline?: 'none' | 'always' | 'hover'
}

const getColor = (variant, theme) => {
  if (variant === 'error') {
    return theme.components.graph.error
  } else if (variant === 'secondary') {
    return theme.palette.secondary.main
  } else {
    return theme.palette.primary.main
  }
}

const useStyles = makeStyles<
  Theme,
  { variant: ISimpleLinkVariant; textDecoration: string; iconPosition: string }
>((theme) => ({
  root: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: ({ textDecoration }) => textDecoration || 'underline',
    },
    color: ({ variant }) => getColor(variant, theme),
  },
  icon: {
    fontSize: theme.typography.subtitle2.fontSize,
    marginRight: ({ iconPosition }) => (iconPosition === 'left' ? '8px' : '0px'),
    marginLeft: ({ iconPosition }) => (iconPosition === 'right' ? '8px' : '0px'),
  },

  text: {
    color: ({ variant }) => getColor(variant, theme),
  },
}))

// We need to destructure staticContext even though we are not using it in order to
// work around this issue: https://github.com/ReactTraining/react-router/issues/4683
// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const SimpleLink: ComponentType<PropsWithChildren<Props>> = forwardRef<
  HTMLElement,
  PropsWithChildren<Props>
>(
  (
    {
      onClick,
      src,
      children,
      staticContext,
      className,
      icon,
      variant,
      textVariant = 'body2',
      textDecoration = 'underline',
      label,
      lineClamp,
      iconPosition = 'right',
      ...rest
    },
    ref,
  ) => {
    const classes = useStyles({ variant, textDecoration, iconPosition })
    const { history } = useReactRouter()
    const handleClick = useCallback(
      (e) => {
        // Prevent links inside of a table row from triggering row selection.
        e.stopPropagation()
        if (onClick) {
          e.preventDefault()
          onClick(e)
        }
        // If there is no provided onClick, just use the `src` as a normal link.
        if (src && !src.startsWith('http')) {
          // local paths should use the History's push state
          e.preventDefault()
          return history.push(src)
        }
        // Any path that starts with http should be treated as an external link
      },
      [src, history, onClick],
    )

    return (
      <Link
        className={clsx(className, classes.root)}
        ref={ref}
        href={src || null}
        onClick={handleClick}
        data-testid={generateTestId(children)}
        {...rest}
      >
        {!!icon && iconPosition === 'left' && (
          <FontAwesomeIcon className={clsx(classes.icon, 'icon')}>{icon}</FontAwesomeIcon>
        )}
        {textVariant ? (
          <Text
            variant={textVariant}
            lineClamp={lineClamp}
            component="span"
            className={clsx('simple-link-text', classes.text)}
          >
            {children || src}
          </Text>
        ) : (
          children || src
        )}
        {!!icon && iconPosition === 'right' && (
          <FontAwesomeIcon className={clsx(classes.icon, 'icon')}>{icon}</FontAwesomeIcon>
        )}
      </Link>
    )
  },
)

export default SimpleLink
