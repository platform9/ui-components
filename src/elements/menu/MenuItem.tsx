import React, { PropsWithChildren, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import SimpleLink from '../../components/SimpleLink'
import clsx from 'clsx'
import { TextVariant } from '../Text'
import generateTestId from '../../utils/test-helpers'

type Props = {
  component?: React.ElementType
  textVariant?: TextVariant
  icon?: string
  iconPlacement?: 'start' | 'end'
  iconProps?: { [key: string]: any }
  src?: string
  className?: string
  readonly?: boolean
  onClick?: () => void
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export default function MenuItem({
  component = 'li',
  textVariant = 'body2',
  icon = undefined,
  iconPlacement = 'start',
  iconProps = {},
  src = undefined,
  onClick,
  className,
  readonly = false,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const classes = useStyles({ iconPlacement, readonly })
  const handleClick = useCallback(
    (e) => {
      if (readonly) {
        e.stopPropagation()
        return
      }
      onClick(e)
    },
    [onClick, readonly],
  )
  const content = (
    <Text
      data-testid={generateTestId(children[1])}
      variant={textVariant}
      component={component}
      className={clsx(classes.menuItem, className)}
      onClick={!src ? handleClick : undefined}
      {...(props as any)}
    >
      {icon && (
        <FontAwesomeIcon size="md" {...iconProps}>
          {icon}
        </FontAwesomeIcon>
      )}
      {children}
    </Text>
  )
  if (src) {
    return (
      <SimpleLink src={src} onClick={onClick} className={classes.link}>
        {content}
      </SimpleLink>
    )
  }
  return content
}

const useStyles = makeStyles<Theme, { iconPlacement: Props['iconPlacement']; readonly: boolean }>(
  (theme) => ({
    menuItem: {
      display: 'grid',
      // gridTemplateColumns: ({ iconPlacement }) =>
      //   iconPlacement === 'start' ? 'max-content 1fr' : 'max-content max-content',
      gridTemplateColumns: 'max-content max-content',
      justifyContent: ({ iconPlacement }) =>
        iconPlacement === 'start' ? 'start' : 'space-between',
      gap: 16,
      minHeight: 48,
      alignItems: 'center',
      paddingLeft: 8,
      borderRadius: 4,
      backgroundColor: theme.components.checkbox.background,
      transition: 'background .2s ease, color .2s ease',
      color: ({ readonly }) =>
        readonly ? theme.components.checkbox.disabledColor : theme.components.checkbox.color,
      cursor: ({ readonly }) => (readonly ? 'default' : 'pointer'),

      '&:hover': {
        backgroundColor: ({ readonly }) =>
          readonly ? 'inherit' : theme.components.checkbox.hoverBackground,
      },

      '& i': {
        transition: 'color .2s ease',
        marginTop: 1,
        fontSize: ({ iconPlacement }) => (iconPlacement === 'start' ? 18 : 14),
        width: 20,
        height: 20,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        order: ({ iconPlacement }) => (iconPlacement === 'start' ? 0 : 1),
      },
    },
    link: {
      textDecoration: 'none !important',
      display: 'grid',
    },
  }),
)
