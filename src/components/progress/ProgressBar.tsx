import React, { FC } from 'react'
import { ensureFunction } from '../../utils/fp'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'

type LabelRenderProp = (value: string) => string

interface Props {
  percent: number | string
  animated?: boolean
  width?: string | number
  height?: string | number
  containedPercent?: boolean
  label?: string | JSX.Element | LabelRenderProp
  variant?: 'progress' | 'health'
  color?: 'error' | 'success' | 'primary'
  showPercent?: boolean
}

const useStyles = makeStyles<Theme, Props>((theme) => ({
  root: {
    height: ({ height }) => height,
    display: 'flex',
    width: ({ width }) => width,
    flexFlow: 'row nowrap',
    alignItems: 'center',
  },
  label: {
    whiteSpace: 'nowrap',
    height: '100%',
    width: 30,
    paddingLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progressContainer: {
    flexGrow: 1,
    height: '100%',
    minHeight: '100%',
    backgroundColor: theme.components.table.border,
    borderRadius: 3,
  },
  '@keyframes stripes': {
    from: {
      backgroundPosition: '40px 0',
    },
    to: {
      backgroundPosition: '0 0',
    },
  },
  progress: {
    display: 'flex',
    flexFlow: 'row nowrap',
    fontSize: '12px',
    alignItems: 'center',
    justifyContent: 'center',
    width: ({ percent }) => `${percent}%`,
    textAlign: 'center',
    textOverflow: 'visible',
    height: '100%',
    borderRadius: 2,
    backgroundImage: ({ animated }) =>
      animated
        ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)'
        : null,
    backgroundSize: '40px 40px',
    backgroundColor: ({ animated, percent, variant, color }) => {
      if (color) {
        return theme.palette[color].main
      }
      if (animated) return theme.components.graph.primary
      if (variant === 'health') {
        if (percent >= 90) return theme.components.graph.error
        if (percent >= 80) return theme.components.graph.warning
      }
      return theme.components.graph.success
    },
    animation: '$stripes 2s linear infinite',
    color: '#FFF',
  },
}))

const ProgressBar: FC<Props> = ({
  percent,
  animated = false,
  containedPercent = false,
  width = 145,
  height = 12,
  label = (progress) => `${progress}%`,
  variant = 'progress',
  color = undefined,
  showPercent = true,
}) => {
  const classes = useStyles({ percent, animated, width, height, variant, color })
  return (
    <div className={classes.root}>
      <div className={classes.progressContainer}>
        <div className={classes.progress}>
          {showPercent && (
            <Text variant="body2">{containedPercent ? ensureFunction(label)(percent) : null}</Text>
          )}
        </div>
      </div>
      {showPercent && !containedPercent && (
        <div className={classes.label}>
          <Text variant="body2">{ensureFunction(label)(percent)}</Text>
        </div>
      )}
    </div>
  )
}

export default ProgressBar
