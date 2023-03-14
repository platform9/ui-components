import React from 'react'
import SimpleLink from 'src/components/SimpleLink'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column',
    gap: 4,
    '& i': {
      color: theme.components.typography.passive,
      fontWeight: 900,
      fontSize: 14,
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      margin: 0,
      marginTop: 2,
      transition: 'color .2s ease',
    },
    '& > span': {
      color: theme.components.typography.passive,
      transition: 'color .2s ease',
    },
    '&:hover': {
      textDecoration: 'none',
      '& > i': {
        color: theme.components.typography.default,
      },
      '& > span': {
        color: theme.components.typography.default,
      },
    },
  },
}))

const PassiveHeaderLink = ({
  icon,
  text,
  url = undefined,
  className = undefined,
  onClick = undefined,
}) => {
  const classes = useStyles({})
  return (
    <SimpleLink
      onClick={onClick}
      src={url}
      className={clsx(classes.root, className)}
      icon={icon}
      textVariant="subtitle2"
      iconPosition="left"
    >
      {text}
    </SimpleLink>
  )
}

export default PassiveHeaderLink
