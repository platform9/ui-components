import React, { FC } from 'react'
import FontAwesomeIcon from 'src/components/FontAwesomeIcon'
import { makeStyles } from '@material-ui/styles'
import SimpleLink from './SimpleLink'
import Theme from 'src/theme-manager/themes/model'
import Tooltip from 'src/elements/tooltip'

interface Props {
  title?: string
  icon?: string
  color?: 'white' | 'black'
  link?: string
}

const colorMap = {
  white: '100',
  black: '700',
}

type IIconColor = Props['color']

const useStyles = makeStyles<Theme, { color: IIconColor; isLink: boolean }>((theme: Theme) => ({
  icon: {
    cursor: ({ isLink }) => (isLink ? 'pointer' : 'default'),
    fontWeight: 300,
    color: ({ color }) => theme.palette.grey[colorMap[color]],
  },
}))

const HelpContainer: FC<Props> = ({
  title = 'Help',
  icon = 'question-circle',
  color = 'white',
  link = undefined,
}) => {
  const classes = useStyles({ color, isLink: !!link })

  const content = link ? (
    <SimpleLink src={link}>
      <FontAwesomeIcon className={classes.icon}>{icon}</FontAwesomeIcon>
    </SimpleLink>
  ) : (
    <FontAwesomeIcon className={classes.icon}>{icon}</FontAwesomeIcon>
  )

  return <Tooltip message={title}>{content}</Tooltip>
}

export default HelpContainer
