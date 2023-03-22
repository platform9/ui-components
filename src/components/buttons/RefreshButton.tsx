import React from 'react'
import Text from '../../elements/Text'
import generateTestId from '../../utils/test-helpers'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

const useStyles = makeStyles<Theme>((theme) => ({
  button: {
    ...theme.typography.inputTable,
    display: 'grid',
    gridAutoFlow: 'column',
    cursor: 'pointer',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    gap: 8,
    '&:hover': {
      backgroundColor: theme.components.table.hoverBackground,
    },
  },
}))

interface Props {
  onRefresh?: (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => void
}

const RefreshButton = ({ onRefresh }: Props) => {
  const classes = useStyles({})
  return (
    <Text
      data-testid={generateTestId('refresh')}
      noWrap
      onClick={onRefresh}
      component="div"
      className={classes.button}
    >
      <FontAwesomeIcon>sync-alt</FontAwesomeIcon>
      Refresh
    </Text>
  )
}

export default RefreshButton
