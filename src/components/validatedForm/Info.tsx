import React, { FC, PropsWithChildren, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Divider } from '@material-ui/core'
import Theme from 'src/theme-manager/themes/model'
import clsx from 'clsx'
import FontAwesomeIcon from '../FontAwesomeIcon'
import Text from 'src/elements/Text'

const useIconInfoStyles = makeStyles<Theme, { spacer: boolean }>((theme: Theme) => ({
  alertTitle: {
    display: 'flex',
    alignItems: 'center',

    '& i': {
      color: theme.components.graph.primary,
      fontSize: 22,
      marginRight: 4,
    },
  },
  infoContainer: {
    margin: ({ spacer }) => (spacer ? '60px 0 40px 0' : '16px 0'),
  },
}))

const useStyles = makeStyles<Theme, { error: boolean }>((theme: Theme) => ({
  container: {
    background: theme.components.table.hoverBackground,
    padding: theme.spacing(1.5, 3),
    border: ({ error }) =>
      `1px solid ${error ? theme.components.graph.error : theme.components.table.border}`,
    borderRadius: 4,
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    fontStretch: theme.typography.body2.fontStretch,
    fontStyle: theme.typography.body2.fontStyle,
    lineHeight: theme.typography.body2.lineHeight,
    letterSpacing: theme.typography.body2.letterSpacing,
    color: theme.components.card.text,
  },
  minimizedContainer: {
    background: theme.components.table.hoverBackground,
    border: `1px solid ${theme.components.table.border}`,
    borderRadius: 4,
    padding: theme.spacing(1.5, 3),
  },
  header: {
    fontSize: 16,
    color: theme.components.graph.primary,
    fontWeight: 600,
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  button: {
    flexGrow: 0,
    backgroundColor: theme.components.graph.primary,
    height: '24px',
    width: '24px',
    borderRadius: '50%',
    display: 'flex',
    cursor: 'pointer',
  },
  icon: {
    color: theme.components.card.text,
    alignSelf: 'center',
    marginLeft: '4px',
  },
  divider: {
    backgroundColor: theme.components.graph.primary,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
}))

interface Props {
  children: any
  error?: boolean
  className?: string
  title?: string
  expanded?: boolean // Show expanded by default or not
}

const Info = ({
  children,
  error = false,
  className = undefined,
  title = '',
  expanded = true,
}: Props) => {
  const classes = useStyles({ error })
  const [isExpanded, setExpanded] = useState(expanded)
  const isMinimized = title && !isExpanded

  return (
    <div className={clsx(isMinimized ? classes.minimizedContainer : classes.container, className)}>
      {title && (
        <div className={classes.header}>
          <span className={classes.title}>{title}</span>
          <div
            className={classes.button}
            onClick={() => {
              setExpanded(!isExpanded)
            }}
          >
            <FontAwesomeIcon className={classes.icon}>
              {`angle-${isExpanded ? 'up' : 'down'}`}
            </FontAwesomeIcon>
          </div>
        </div>
      )}
      {title && isExpanded && <Divider className={classes.divider} />}
      {(!title || isExpanded) && children}
    </div>
  )
}

export const IconInfo: FC<
  PropsWithChildren<{
    icon: string
    title: string | React.ReactNode
    spacer?: boolean
    className?: string
    iconClass?: string
  }>
> = ({ icon, title, children, className = '', iconClass = '', spacer = true }) => {
  const classes = useIconInfoStyles({ spacer })
  return (
    <Info className={clsx(classes.infoContainer, className)}>
      <Text className={classes.alertTitle} variant="body2">
        <FontAwesomeIcon className={iconClass}>{icon}</FontAwesomeIcon> {title}
      </Text>
      {!!children && <br />}
      {children}
    </Info>
  )
}

export default Info
