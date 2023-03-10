import React, { FC } from 'react'
import Text from 'src/elements/Text'
import { makeStyles } from '@material-ui/styles'
import { identity } from 'ramda'
import Theme from 'src/theme-manager/themes/model'
import clsx from 'clsx'
import generateTestId from 'src/utils/test-helpers'
import { pathStrOr } from 'src/utils/fp'
import Divider from 'src/elements/Divider'

const useStyles = makeStyles<Theme>((theme) => ({
  reviewTable: {
    borderSpacing: '8px',
    tableLayout: 'fixed',
  },
  divider: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  disabledText: {
    color: theme.components.typography.passive,
  },
  rowValue: {
    color: theme.components.typography.default,
  },
  rowLabel: {
    display: 'flex',
    width: 360,
  },
  header: {
    display: 'flex',
    gap: theme.spacing(0.5),
    marginTop: theme.spacing(3.5),
  },
  bold: {
    fontWeight: 600,
  },

  subHeader: {
    fontWeight: 'normal',
  },
}))

const DataRow = ({
  label,
  value,
  data,
  renderArray = false,
  render = identity,
  key,
  jointRender = undefined,
}) => {
  const classes = useStyles({})
  return (
    <tr data-testid={generateTestId(label, 'row')}>
      <td data-testid={generateTestId(label, 'fieldname')} className={classes.rowLabel}>
        <Text variant="body2" component="span">
          {label}
        </Text>
      </td>
      <td data-testid={generateTestId(label, 'fieldvalue')}>
        <Text
          variant="caption1"
          className={clsx(classes.rowValue, value === 'Not Enabled' && classes.disabledText)}
          component="span"
          key={key}
        >
          {!renderArray && Array.isArray(value)
            ? value.map((val, idx) => (
                <Text key={idx} variant="caption1">
                  {jointRender
                    ? jointRender(val, data)
                    : render(val || val === false || val === 0 ? `${val} ` : '-')}
                  &nbsp;
                </Text>
              ))
            : jointRender
            ? jointRender(value, data)
            : render(value || value === false || value === 0 ? value : '-')}
        </Text>
      </td>
    </tr>
  )
}

interface ReviewRow<T> {
  id: keyof T
  label: string
  title?: string
  subHeader?: string
  header?: string
  render?: (value) => any
  jointRender?: (value, data) => any
  insertDivider?: boolean
  renderArray?: boolean
  hide?: (value) => any
  RowComponent?: FC<{ value: any }>
}

type GenericObject = Record<string, any>

interface Props<T = GenericObject> {
  data: T
  columns: Array<ReviewRow<T>>
  className?: string
}

const FormReviewTable: FC<Props> = ({ data, columns, className }) => {
  const classes = useStyles({})
  const elems: JSX.Element[] = []

  if (!data) return null

  for (const column of columns) {
    const { id, hide, title, insertDivider, RowComponent, header, subHeader } = column
    if (hide && hide(data)) {
      continue
    }
    const value = pathStrOr('-', id, data)
    if (header) {
      elems.push(
        <th data-testid={generateTestId(id, 'title')} className={classes.header}>
          <Text component="span" className={classes.bold}>
            {header}
          </Text>
          <Text component="span" className={classes.subHeader}>
            {subHeader}
          </Text>
        </th>,
      )
    }
    if (insertDivider) {
      // We have a new section, insert a divider
      elems.push(
        <tr data-testid={generateTestId(column.id, 'divider')} key={`${column.id}-divider`}>
          <td colSpan={2}>
            <Divider className={classes.divider} />
          </td>
        </tr>,
      )
    }

    if (column.title) {
      elems.push(
        <th data-testid={generateTestId(column.id, 'title')} className={classes.rowLabel}>
          <Text variant="caption1">{column.title}</Text>
        </th>,
      )
    }

    elems.push(
      RowComponent ? (
        <RowComponent key={`row-${id}-${value}`} {...column} value={value} />
      ) : (
        <DataRow key={`row-${id}-${value}`} {...column} value={value} data={data} />
      ),
    )
  }

  return (
    <table className={clsx(className, classes.reviewTable)}>
      <tbody>{elems}</tbody>
    </table>
  )
}

export default FormReviewTable
