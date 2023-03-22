import React, { FC } from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import Text from '../elements/Text'
import clsx from 'clsx'
import { path } from 'ramda'
import HelpContainer from './HelpContainer'
import Theme from '../theme-manager/themes/model'

export interface IDetailFields<T> {
  id: string
  title: string
  required?: boolean
  helpMessage?: string | React.ReactNode
  condition?: (cluster: T) => boolean
  render?: (value: any, item: any) => string | React.ReactNode
  renderExtraContent?: (value: any, item: any) => React.ReactNode
}

interface FieldValue {
  value?: string | React.ReactNode
  helpMessage?: string | React.ReactNode
  extraContent?: React.ReactNode
}
export interface FieldsForCardsProps {
  [title: string]: FieldValue
}

const useStyles = makeStyles<Theme>((theme) => ({
  rowHelp: {
    width: 24,
  },
  rowHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  rowValue: {
    marginLeft: theme.spacing(0.5),
    wordBreak: 'break-all',
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const DetailRow: FC<{
  label: string
  value: string | React.ReactNode
  helpMessage?: string
}> = ({ label, value, helpMessage }) => {
  const { rowHeader, rowValue, rowHelp } = useStyles({})
  return (
    <tr>
      <td>
        <Text className={rowHeader} variant="caption1" component="span">
          {label}:
        </Text>
      </td>
      <td>
        <Text
          className={rowValue}
          variant="body2"
          component={typeof value === 'string' ? 'span' : 'div'}
        >
          {value}
        </Text>
      </td>
      <td className={rowHelp}>
        {!!helpMessage && <HelpContainer title={helpMessage} color="black" />}
      </td>
    </tr>
  )
}

/**
 * Gets fields for the InfoPanel component
 *
 * Ex. getFieldsForCard(fields, cluster)
 */
export function getFieldsForCard<T>(fields: Array<IDetailFields<T>>, item: T): FieldsForCardsProps {
  const fieldsToDisplay = {}
  fields.forEach((field) => {
    const {
      id,
      title,
      required = false,
      condition,
      render,
      helpMessage,
      renderExtraContent,
    } = field
    const value = path<string | boolean>(id.split('.'), item)
    const hasValue = !!value || value === false
    const shouldRender = condition ? condition(item) : required || hasValue
    if (shouldRender && (required || hasValue)) {
      fieldsToDisplay[title] = {
        value: render ? render(value, item) : value,
        helpMessage,
        extraContent: renderExtraContent ? renderExtraContent(value, item) : null,
      }
    }
  })
  return fieldsToDisplay
}

const styles = (theme) => ({
  root: {},
  row: {
    width: '100%',
  },
  half: {
    display: 'inline-block',
    width: '50%',
  },
  cardContent: {
    margin: theme.spacing(0, 2, 1),
  },
  card: {
    maxWidth: 607,
    width: 'max-content',
    border: `solid 1px ${theme.components.card.border}`,
    borderRadius: 4,
    background: theme.components.card.background,
  },
  title: {
    color: theme.components.card.text,
    padding: theme.spacing(1, 2),
    borderBottom: `solid 1px ${theme.components.card.border}`,
  },
})

interface DetailRowProps {
  classes?: any
  items: any[]
}

// @ts-ignore
const DetailRowDiv = withStyles(styles)(({ classes, items }: DetailRowProps) => {
  return Object.entries(items).map(([name, { value, helpMessage }]) => (
    <DetailRow key={name} label={name} value={value} helpMessage={helpMessage} />
  ))
})

// @ts-ignore
const renderDetailRow = (items) => <DetailRowDiv items={items} />

const InfoPanel = withStyles(styles)(
  ({
    classes,
    items = [],
    customBody = undefined,
    className = undefined,
    title,
  }: InfoPanelProps) => (
    <div className={clsx(classes.card, className)}>
      <Text variant="subtitle2" component="h3" className={classes.title}>
        {title}
      </Text>
      {customBody && <div className={classes.cardContent}>{customBody}</div>}
      {!customBody && (
        <table className={classes.cardContent}>
          <tbody>
            {Array.isArray(items) ? items.map(renderDetailRow) : renderDetailRow(items)}
          </tbody>
        </table>
      )}
    </div>
  ),
)

interface InfoPanelProps {
  title: string
  classes?: any
  items?: any
  customBody?: JSX.Element | React.ReactNode
  className?: string
}

export default InfoPanel
