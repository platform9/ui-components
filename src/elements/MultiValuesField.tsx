import React, { useEffect, useState } from 'react'
import withFormContext from '../components/validatedForm/withFormContext'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import uuid from 'uuid'
import { isNilOrEmpty } from '../utils/fp'
import clsx from 'clsx'
import Text from './Text'
import Tooltip from './tooltip'
import { topMiddle } from './menu/defaults'
import Input from './input'

interface Props {
  label: string
  items?: string[]
  addLabel: string
  info?: string
  placeholderText?: string
  onChange: (value: string[]) => void
  inputProperties?: Record<string, any>
}

const useStyles = makeStyles<Theme, Partial<Props>>((theme) => ({
  multiValuesField: {
    maxWidth: '400px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  entries: {
    display: 'grid',
    gridTemplateColumns: '356px 32px',
    gridTemplateRows: '55px',
    gridGap: '12px',
    justifyItems: 'start',
    alignItems: 'center',
  },
  label: {
    color: theme.components.input.label.color,
  },
  minus: {
    fontWeight: 900,
    color: theme.palette.blue.main,
    justifySelf: 'end',
  },
  addNewEntry: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    marginTop: theme.spacing(2),
    alignItems: 'center',
  },
  plus: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(2),
    fontWeight: 900,
  },
  hint: {
    cursor: 'help',
    transition: 'color .2s ease',
    color: theme.components.input.label.hint,
    '& i': {
      cursor: 'help',
      marginRight: 8,
      transition: 'color .2s ease',
      color: theme.components.input.label.hint,
    },
  },
}))

const createNewEntry = () => ({ id: uuid.v4(), value: '' })

const getInitialEntries = (values) => {
  if (isNilOrEmpty(values)) return [createNewEntry()]
  return values.map((value) => ({
    id: uuid.v4(),
    value,
  }))
}

const removeEmptyValuesAndStripId = (entries) => {
  const values = []
  entries.forEach(({ value }) => {
    if (!values) return
    values.push(value)
  })
  return values
}

const MultiValuesField = ({
  label,
  items: values,
  addLabel,
  placeholderText,
  onChange,
  info = '',
  inputProperties = {},
}: Props) => {
  const classes = useStyles({ info })
  const [entries, setEntries] = useState(getInitialEntries(values))

  useEffect(() => {
    onChange && onChange(removeEmptyValuesAndStripId(entries))
  }, [entries])

  const handleChange = (updatedEntryId) => (event) =>
    setEntries(
      entries.map((entry) =>
        entry.id === updatedEntryId ? { id: entry.id, value: event.target.value } : entry,
      ),
    )

  const addBlankEntry = () => setEntries([...entries, createNewEntry()])

  const deleteEntry = (id) => () => setEntries(entries.filter((x) => x.id !== id))

  return (
    <div className={classes.multiValuesField}>
      <div className={classes.header}>
        {label && (
          <Text variant="inputLabel" className={clsx(classes.label, 'label')}>
            {label}
          </Text>
        )}
        {info && (
          <Tooltip
            message={info || label}
            align={topMiddle.align}
            offset={topMiddle.offset}
            origin="right center"
            className={classes.info}
          >
            <Text variant="inputLabel" className={classes.hint}>
              <FontAwesomeIcon>question-circle</FontAwesomeIcon>Hint
            </Text>
          </Tooltip>
        )}
      </div>
      {entries.map(({ id, value }) => (
        <div key={id} className={classes.entries}>
          <Input
            {...inputProperties}
            placeholder={placeholderText}
            value={value}
            onChange={handleChange(id)}
          />
          <FontAwesomeIcon className={classes.minus} onClick={deleteEntry(id)}>
            minus-circle
          </FontAwesomeIcon>
        </div>
      ))}
      <div className={classes.addNewEntry}>
        <FontAwesomeIcon className={classes.plus} onClick={addBlankEntry} size="lg">
          plus-circle
        </FontAwesomeIcon>
        <Text variant="body2">{addLabel}</Text>
      </div>
    </div>
  )
}

export default withFormContext(MultiValuesField)
