import React, { FC, PropsWithChildren } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Text from '../elements/Text'

const useStyles = makeStyles((theme: Theme) => ({
  column: {
    margin: theme.spacing(2, 0),
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    margin: theme.spacing(1, 0),
  },
  step: {
    color: theme.palette.secondary.contrastText,
    marginRight: theme.spacing(2),
    flex: `0 0 ${theme.spacing(5)}px`,
    width: theme.spacing(5),
    height: theme.spacing(5),
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100%',
  },
}))

const NumberedSteps: FC<PropsWithChildren<NumberedStepProps>> = ({
  step,
  title,
  description,
  children,
}): JSX.Element => {
  const classes = useStyles({})
  return (
    <div className={classes.column}>
      {title && <Text variant="subtitle2">{title}</Text>}
      <div className={classes.row}>
        <Text variant="body1" className={classes.step}>
          {step}
        </Text>
        {typeof description === 'string' ? <Text variant="body1">{description}</Text> : description}
        {children}
      </div>
    </div>
  )
}

interface NumberedStepProps {
  step: number
  title?: string
  description: string | JSX.Element
}

export default NumberedSteps
