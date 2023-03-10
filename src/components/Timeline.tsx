import { makeStyles } from '@material-ui/core/styles'
import Theme from 'src/theme-manager/themes/model'
import Text from 'src/elements/Text'
import React from 'react'
import { hexToRgbaCss } from 'src/utils/colorHelpers'
import clsx from 'clsx'

interface Props {
  items: string[]
  activeStep?: number // Indexing starts at 1
  className?: string
}

const TimelineItem = ({ label, active }) => {
  const classes = useStyles({ active })
  return (
    <div className={classes.timelineItem}>
      <div className={classes.timelineItemContent}>
        <Text variant="body2">{label}</Text>
      </div>
    </div>
  )
}

export default function Timeline({ items, activeStep = 0, className }: Props) {
  const numItems = items.length
  const timelineElementWidth = 1 / numItems
  const progressBarWidth =
    activeStep === numItems
      ? 100
      : (timelineElementWidth * activeStep - timelineElementWidth / 2) * 100
  const classes = useStyles({ progressBarWidth })

  return (
    <div className={clsx(classes.timelineContainer, className)}>
      {items.map((label, idx) => (
        <TimelineItem key={label} label={label} active={idx <= activeStep - 1} />
      ))}
      <div className={classes.progressBar}></div>
      <i className={classes.arrow}></i>
    </div>
  )
}

interface StyleProps {
  progressBarWidth?: number
  active?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  timelineContainer: {
    display: 'flex',
    position: 'relative',
    margin: '25px 0',
    '&::after': {
      // Timeline line
      background: `repeating-linear-gradient(to right,${theme.palette.grey['500']} 0,${theme.palette.grey['500']} 10px,transparent 10px,transparent 12px)`,
      content: `''`,
      position: 'absolute',
      width: '100%',
      height: '1px',
      bottom: 0,
    },
  },
  progressBar: {
    position: 'absolute',
    width: ({ progressBarWidth }) => `${progressBarWidth}%`,
    height: '1px',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    bottom: 0,
  },
  timelineItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    '&::after': {
      // Circle
      content: `''`,
      width: '10px',
      height: '10px',
      backgroundColor: ({ active }) =>
        active ? theme.palette.primary.main : hexToRgbaCss(theme.components.frame.background, 0.75),
      border: ({ active }) =>
        active
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey['500']}`,
      borderRadius: '50%',
      zIndex: 3,
      position: 'absolute',
      bottom: '-4px',
    },
  },
  timelineItemContent: {
    marginBottom: theme.spacing(2),
  },
  arrow: {
    transform: 'rotate(-45deg)',
    borderColor: ({ progressBarWidth }) =>
      progressBarWidth === 100 ? theme.palette.primary.main : theme.palette.grey['500'],
    borderStyle: 'solid',
    borderWidth: '0 1px 1px 0',
    padding: '3px',
    position: 'absolute',
    right: '0px',
    bottom: '-3px',
  },
}))
