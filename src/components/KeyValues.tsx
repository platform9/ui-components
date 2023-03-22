import React, { useEffect, useState, useCallback, useRef } from 'react'
import Theme from '../theme-manager/themes/model'
import AutocompleteBase from '../components/AutocompleteBase'
import uuid from 'uuid'
import { assoc, omit } from 'ramda'
import { makeStyles } from '@material-ui/styles'
import FontAwesomeIcon from '../components/FontAwesomeIcon'
import Text from '../elements/Text'
import withTooltip from '../elements/tooltip/withTooltip'

export interface EntryShape {
  key: string
  value: string
}

interface KeyValuesProps {
  entries: EntryShape[]
  onChange: any
  keySuggestions?: string[]
  valueSuggestions?: string[]
  blacklistedTags?: string[]
  allowMultipleValues?: boolean
  addLabel?: string
  keyLabel?: string
  valueLabel?: string
  additionalFields?: AdditionalField[]
}

interface AdditionalField {
  id: string
  label: string
  Component: React.ComponentType<any>
  props?: any
}

const useKeyValueStyles = makeStyles<Theme, { showDeleteButton: boolean }>((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: ({ showDeleteButton }) =>
      showDeleteButton ? '172px 6px 172px 32px' : '185px 6px 185px',
    gridTemplateRows: '55px',
    gridGap: '12px',
    justifyItems: 'start',
    alignItems: 'center',
  },
  autocomplete: {
    width: '100%',

    '& .MuiFormControl-root': {
      marginTop: 0,
      marginBottom: 0,
      width: '100%',
    },
  },
  minus: {
    fontWeight: 900,
    color: theme.palette.blue.main,
    justifySelf: 'end',
  },
  additionalFields: {
    margin: theme.spacing(2, 0),
    width: '100%',
  },
}))

interface KeyValueProps {
  entry?: EntryShape
  onChange: any
  onDelete: any
  keySuggestions?: string[]
  valueSuggestions?: string[]
  keyLabel?: string
  valueLabel?: string
  showDeleteButton?: boolean
  additionalFields?: AdditionalField[]
}

const KeyValue = ({
  entry = {} as EntryShape,
  onChange,
  onDelete,
  keySuggestions = [],
  valueSuggestions = [],
  keyLabel = 'Key',
  valueLabel = 'Value',
  showDeleteButton = true,
  additionalFields = [],
}: KeyValueProps) => {
  const classes = useKeyValueStyles({ showDeleteButton })
  const handleChange = useCallback(
    (field) => (value) => onChange(assoc(field, value, entry)),
    [entry, onChange],
  )
  return (
    <>
      <div className={classes.root}>
        <AutocompleteBase
          inputProps={{ size: 14 }}
          fullWidth
          label={keyLabel}
          value={entry.key}
          onChange={handleChange('key')}
          suggestions={keySuggestions}
          className={classes.autocomplete}
        />
        <Text variant="body2">-</Text>
        <AutocompleteBase
          inputProps={{ size: 14 }}
          fullWidth
          label={valueLabel}
          value={entry.value}
          onChange={handleChange('value')}
          suggestions={valueSuggestions}
          className={classes.autocomplete}
        />
        {showDeleteButton && (
          <FontAwesomeIcon className={classes.minus} onClick={onDelete}>
            minus-circle
          </FontAwesomeIcon>
        )}
      </div>
      {additionalFields.map(({ id, label, Component, props }) => (
        <div key={id} className={classes.additionalFields}>
          <Component
            id={id}
            label={label}
            value={entry[id] || ''}
            onChange={handleChange(id)}
            {...props}
          />
        </div>
      ))}
    </>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex-start',
    maxWidth: '100%',
  },
  addNewEntryContainer: {
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
}))

const newEntry = () => ({ id: uuid.v4(), key: '', value: '' })

const initialEntry = newEntry()

// Unfortunately React forces us to use `key` for each item in an
// array and we can't use the index because that will break
// functionality if we delete anything in the middle of the array.
// This forces us to inject an id field into every entry and then
// filter it out before submitting. :(
const addId = (entry) => ({ ...entry, id: uuid.v4() })

const KeyValues = ({
  entries: incomingEntries,
  onChange,
  keySuggestions = undefined,
  valueSuggestions = undefined,
  blacklistedTags = [],
  addLabel = 'Add',
  keyLabel = 'Key',
  valueLabel = 'Value',
  allowMultipleValues = true,
  additionalFields = [],
}: KeyValuesProps) => {
  const classes = useStyles({})
  const initialEntriesLoaded = useRef(false)
  const [entries, setEntries] = useState([initialEntry])

  const addBlankEntry = () => setEntries([...entries, newEntry()])
  const deleteEntry = (id) => () => setEntries(entries.filter((x) => x.id !== id))
  const handleChange = useCallback(
    (entry) => {
      setEntries(entries.map((x) => (x.id === entry.id ? entry : x)))
    },
    [entries],
  )

  useEffect(() => {
    // Load initial entries
    if (initialEntriesLoaded.current || incomingEntries === undefined) return
    initialEntriesLoaded.current = true
    const incomingEntriesWithIds = incomingEntries.map(addId)
    allowMultipleValues
      ? setEntries([...incomingEntriesWithIds, ...entries])
      : incomingEntriesWithIds?.length
      ? setEntries([...incomingEntriesWithIds])
      : setEntries([...entries])
  }, [incomingEntries, entries])

  useEffect(() => {
    // Remove empty entries and strip out id
    const noEmptyKeys = (x) => x.key.length > 0
    const removeId = (entry) => omit(['id'], entry)
    const sanitized = (entries || []).filter(noEmptyKeys).map(removeId)
    onChange && onChange(sanitized)
  }, [entries])

  const filteredEntries = entries.filter((entry) => !blacklistedTags.includes(entry.key))

  return (
    <div className={classes.root}>
      {filteredEntries.map((entry) => (
        <KeyValue
          key={entry.id}
          keySuggestions={keySuggestions}
          valueSuggestions={valueSuggestions}
          entry={entry}
          onChange={handleChange}
          onDelete={deleteEntry(entry.id)}
          keyLabel={keyLabel}
          valueLabel={valueLabel}
          showDeleteButton={allowMultipleValues}
          additionalFields={additionalFields}
        />
      ))}
      {allowMultipleValues && (
        <div className={classes.addNewEntryContainer}>
          <FontAwesomeIcon className={classes.plus} onClick={addBlankEntry} size="lg">
            plus-circle
          </FontAwesomeIcon>
          <Text variant="body2">{addLabel}</Text>
        </div>
      )}
    </div>
  )
}

export default withTooltip(KeyValues)
