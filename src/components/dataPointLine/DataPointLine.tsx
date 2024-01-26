import React, { ReactNode } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import clsx from 'clsx'

interface DataPointLineProps {
  children: ReactNode

  className?: string
  lineColor?: string
  arrowColor?: string
}

interface DataPointLineProps {
  children: ReactNode

  className?: string
  lineColor?: string
  arrowColor?: string
}

export default function DataPointLine({
  className,
  lineColor,
  arrowColor = lineColor,
  children,
}: React.PropsWithChildren<DataPointLineProps>) {
  const classes = useStyles({ lineColor, arrowColor })

  return (
    <div className={clsx(classes.lineContainer, className)}>
      <div className={clsx(classes.line, 'line')}>
        {children}
        <div className={clsx(classes.arrow, 'arrow')} />
      </div>
    </div>
  )
}

const useStyles = makeStyles<Theme, Partial<DataPointLineProps>>((theme) => ({
  lineContainer: {
    display: 'grid',
    position: 'relative',
    width: '100%',
    padding: theme.spacing(2, 0, 5, 0),
  },
  line: {
    width: '90%',
    justifySelf: 'center',
    position: 'relative',
    height: '4px',
    background: ({ lineColor }) => lineColor || theme.palette.common.black,
  },
  arrow: {
    position: 'absolute',
    right: '-4px' /* Adjust to position the arrow on the right of the line */,
    top: '-6px' /* Adjust to center the arrow on the line */,
    width: '0',
    height: '0',
    borderTop: '8px solid transparent',
    borderBottom: '8px solid transparent',
    borderLeft: ({ arrowColor }) => `8px solid ${arrowColor || theme.palette.common.black}`,
  },
}))
