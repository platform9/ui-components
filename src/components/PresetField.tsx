import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from 'src/elements/Text'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '10px',
    marginLeft: theme.spacing(1),
  },
  label: {
    flexGrow: 0,
    fontWeight: 'bold',
    minWidth: '150px',
  },
}))

interface Props {
  label: string
  value: string | number
}

const PresetField = ({ label, value }: Props) => {
  const classes = useStyles({})

  return (
    <Text className={classes.root} variant="body2">
      <label className={classes.label}>{label}</label>
      <span>{value}</span>
    </Text>
  )
}

export default PresetField
