import React, { useMemo, PropsWithChildren, ReactNode } from 'react'
import { makeStyles, styled } from '@material-ui/styles'
import { isNumeric } from 'src/utils/misc'
import generateTestId from 'src/utils/test-helpers'
import clsx from 'clsx'
import Theme from 'src/theme-manager/themes/model'
import Text, { TextVariant } from 'src/elements/Text'
import FontAwesomeIcon from '../FontAwesomeIcon'
import Tooltip from 'src/elements/tooltip'

interface InfoModel {
  title: string
  children: ReactNode
}

interface Props {
  title: string
  className?: string
  link?: ReactNode
  step?: number
  info?: string | InfoModel
  errorMessage?: string | ReactNode
  textVariant?: TextVariant
}

export default function FormFieldSection({
  title,
  className,
  link = undefined,
  info = undefined,
  step = undefined,
  children,
  errorMessage,
  textVariant = 'subtitle2',
}: PropsWithChildren<Props>) {
  const hasInfo = !!info
  const hasLink = !!link
  const classes = useStyles({})
  const infoTitle = useMemo(() => {
    if (!info) return null
    if (typeof info === 'string') return <div className={classes.infoTooltip}>{info}</div>
    return (
      <div className={classes.infoTooltip}>
        <span className={classes.infoTooltipTitle}>{info?.title}</span>
        {info?.children}
      </div>
    )
  }, [info])
  const infoComponent = hasInfo ? (
    <Tooltip message={infoTitle}>
      <FontAwesomeIcon>info-circle</FontAwesomeIcon>
    </Tooltip>
  ) : null
  return (
    <fieldset className={clsx(classes.formFieldSection, className)}>
      <legend className={classes.titleLegend}>
        {isNumeric(step) && (
          <Text component="figure" variant="caption1" className={classes.figureStep}>
            {step}
          </Text>
        )}
        <Text
          data-testid={generateTestId(title)}
          component="label"
          variant={textVariant}
          className={classes.title}
        >
          {title} {infoComponent}
        </Text>
      </legend>
      <div className={classes.spacer}>{hasLink && link}</div>
      <div className={clsx('content', classes.content)}>{children}</div>
      {errorMessage && <Warning>{errorMessage}</Warning>}
    </fieldset>
  )
}
const Warning = styled(({ children, className }) => (
  <Text variant="body1" className={className}>
    {children}
  </Text>
))<Theme>(({ theme }) => ({
  color: theme.components.graph.error,
}))

export const useStyles = makeStyles<Theme>((theme) => ({
  formFieldSection: {
    marginBottom: '32px',
    border: 'none',
    padding: 0,
  },
  titleLegend: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
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
  title: {
    margin: 0,
    display: 'inline-grid',
    gridAutoFlow: 'column',
    gap: 8,
  },
  spacer: {
    marginTop: 2,
    marginBottom: 14,
    marginLeft: 24,
  },
  content: {
    marginLeft: 24,
    display: 'grid',
    gap: 16,
    gridAutoRows: 'max-content',
  },
  infoTooltip: {
    padding: '8px',
    // ...theme.typography.body2,
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    fontStretch: theme.typography.body2.fontStretch,
    fontStyle: theme.typography.body2.fontStyle,
    lineHeight: theme.typography.body2.lineHeight,
    letterSpacing: theme.typography.body2.letterSpacing,
  },
  infoTooltipTitle: {
    ...theme.typography.caption1,
  },
}))
