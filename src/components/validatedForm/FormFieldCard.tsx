import React, { PropsWithChildren } from 'react'
import Text from 'src/elements/Text'
import Card from 'src/elements/card'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import clsx from 'clsx'
import generateTestId from 'src/utils/test-helpers'
import CardHeader from 'src/elements/card/CardHeader'

interface ContainerProps {
  title?: string | JSX.Element
  link?: JSX.Element
  topContent?: JSX.Element
  className?: string
  maxWidth?: number | string
  step?: number
  middleHeader?: JSX.Element
}
const defaultMaxWidth = 932

export const useStyles = makeStyles<Theme, ContainerProps>((theme) => ({
  root: {
    maxWidth: ({ maxWidth = defaultMaxWidth }) => maxWidth,
  },
  requirementsTitle: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-between',
    gridTemplateColumns: '1fr max-content',
  },
  title: {
    display: 'flex',
  },
  titleRight: {
    display: 'grid',
    gridTemplateColumns: '1fr max-content',
    gridGap: theme.spacing(1),
  },
  figureStep: {
    backgroundColor: theme.components.wizard.multiStep.bubbleBackground,
    border: `1px solid ${theme.components.wizard.multiStep.bubbleBorder}`,
    boxSizing: 'border-box',
    borderRadius: '100%',
    width: 24,
    height: 24,
    display: 'inline-grid',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    marginRight: 12,
    paddingBottom: 1,
  },
}))

export const FormFieldCard: React.FC<PropsWithChildren<ContainerProps>> = (props) => {
  const { title, topContent, middleHeader, step, link, className, children } = props
  const classes = useStyles(props)
  return (
    <Card
      className={clsx(classes.root, className)}
      title={
        (title || link) && (
          <CardHeader className={`form-field-card-requirementsTitle ${classes.requirementsTitle}`}>
            <div data-testid={generateTestId(title)} className={classes.title}>
              {!!step && (
                <Text component="figure" variant="caption1" className={classes.figureStep}>
                  {step}
                </Text>
              )}
              {!!title && <Text variant="subtitle2">{title}</Text>}
            </div>
            <div className={classes.titleRight}>
              <div>{!!middleHeader && middleHeader}</div>
              <div>{!!link && link}</div>
            </div>
          </CardHeader>
        )
      }
    >
      {topContent}
      {children}
    </Card>
  )
}
