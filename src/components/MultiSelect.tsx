import React, { useCallback, useState, useMemo, ReactNode } from 'react'
import { makeStyles, createStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import SearchIcon from '@material-ui/icons/Search'
import Fuse from 'fuse.js'
import { FormHelperText } from '@material-ui/core'
import { emptyArr } from '../utils/fp'
import clsx from 'clsx'
import Text from '../elements/Text'
import Theme from '../theme-manager/themes/model'
import { IndeterminateCheckBox } from '@material-ui/icons'
import generateTestId from '../utils/test-helpers'
import Progress from '../components/progress/Progress'
import withTooltip from '../elements/tooltip/withTooltip'

const FUSE_OPTIONS = {
  keys: ['value', 'label'],
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(4, 1.5, 1.5),
      border: `1px solid ${theme.components.card.border}`,
      maxHeight: '350px',
    },
    label: {
      position: 'absolute',
      top: 4,
      backgroundColor: theme.components.card.background,
      padding: 4,
    },
    searchInputWrapper: {
      marginBottom: theme.spacing(1),
    },
    notchedOutline: {
      borderRadius: 0,
    },
    input: {
      boxSizing: 'border-box',
      height: 28,
      padding: 6,
      fontSize: 13,
    },
    adornedStart: {
      paddingLeft: 8,
    },
    searchIcon: {
      color: '#BABABA',
    },
    positionStart: {
      marginRight: 0,
    },
    formControlLabelRoot: {
      marginLeft: -6,
      margin: '2px 0',
      color: theme.components.typography.default,
    },
    checkbox: {
      padding: 4,
      color: theme.components.checkbox.color,
    },
    checkboxSize: {
      fontSize: 16,
    },
    selectDeselectCheckbox: {
      padding: theme.spacing(0, 2, 0, 0),
      justifySelf: 'flex-start',
    },
    options: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    optionLabel: {
      fontSize: 13,
    },
    controls: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: '40px',
    },
  }),
)

type Option = {
  value: string
  label: string
}

interface Props {
  id: string
  label?: string
  options: Option[]
  hasError?: boolean
  required?: boolean
  errorMessage?: string
  value?: string[]
  onChange: (selectedItems: string[]) => void
  maxOptions?: number
  sortSelectedFirst?: boolean
  className?: string
  showSelectDeselectAllOption?: boolean
  maxHeight?: number
  loading?: boolean
  tooltip?: string | ReactNode
}

const getOptionsHeight = (maxOptions) => maxOptions * 28

// @deprecated Please use MultiDropdown instead
export default withTooltip<Props>(function MultiSelect({
  id,
  label,
  hasError,
  required,
  errorMessage,
  options,
  value: selectedValues = emptyArr as string[],
  onChange,
  maxOptions,
  maxHeight,
  sortSelectedFirst,
  className,
  showSelectDeselectAllOption,
  loading,
}) {
  const classes = useStyles({})

  const [term, setTerm] = useState('')
  const fuse = useMemo(() => new Fuse(options, FUSE_OPTIONS), [options])

  // Change visibleOptions when we receive async changes to options.
  // `options` is originally `[]` during most async data loading.
  const sortedOptions = useMemo<Option[]>(() => {
    const visibleOptions = term ? fuse.search(term) : options
    const sortBySelected = (a: Option, b: Option) =>
      selectedValues.includes(b.value) && selectedValues.includes(a.value) ? 1 : -1
    return sortSelectedFirst ? visibleOptions.sort(sortBySelected) : visibleOptions
  }, [term, fuse, selectedValues, sortSelectedFirst])

  const toggleOption = useCallback(
    (value) => {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((currentValue) => currentValue !== value)
        : [...selectedValues, value]
      onChange(updatedValues)
    },
    [selectedValues],
  )

  const onHitEnter = () => {
    if (sortedOptions.length === 1) {
      toggleOption(sortedOptions[0].value)
    }
  }

  const handleSelectDeselectChange = () => {
    if (selectedValues.length > 0) {
      // Deselect All
      onChange(emptyArr as string[])
    } else {
      // Select All
      onChange(sortedOptions.map((option) => option.value))
    }
  }

  const controls = showSelectDeselectAllOption ? (
    <div className={classes.controls}>
      {showSelectDeselectAllOption && (
        <Checkbox
          color="primary"
          className={classes.selectDeselectCheckbox}
          icon={<CheckBoxOutlineBlankIcon className={classes.checkboxSize} />}
          checked={selectedValues.length > 0}
          checkedIcon={<IndeterminateCheckBox className={classes.checkboxSize} />}
          onChange={handleSelectDeselectChange}
        />
      )}
      <SearchField classes={classes} term={term} onSearchChange={setTerm} onHitEnter={onHitEnter} />
    </div>
  ) : (
    <SearchField classes={classes} term={term} onSearchChange={setTerm} onHitEnter={onHitEnter} />
  )

  return (
    <Progress loading={loading} className={clsx('MuiFormControl-root', className)}>
      <FormControl
        className={classes.container}
        id={id}
        error={hasError}
        style={{ maxHeight: maxHeight || 350 }}
      >
        {label && (
          <Text className={classes.label} variant="caption1">
            {required ? `${label} *` : label}
          </Text>
        )}
        {controls}
        <Box
          className={classes.options}
          style={{ height: maxOptions ? getOptionsHeight(maxOptions) : 'initial' }}
        >
          {sortedOptions.map((option) => (
            <Option
              classes={classes}
              key={option.value}
              label={option.label}
              value={option.value}
              checked={selectedValues?.includes(option.value)}
              onChange={() => toggleOption(option.value)}
            />
          ))}
        </Box>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Progress>
  )
})

const SearchField = ({ classes, term, onSearchChange, onHitEnter }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onHitEnter()
    } else if (event.key === 'Escape') {
      onSearchChange('')
    }
  }

  return (
    <FormControl className={classes.searchInputWrapper}>
      <OutlinedInput
        value={term}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={handleKeyDown}
        startAdornment={
          <InputAdornment position="start" classes={{ positionStart: classes.positionStart }}>
            <SearchIcon className={classes.searchIcon} />
          </InputAdornment>
        }
        classes={{
          notchedOutline: classes.notchedOutline,
          input: classes.input,
          adornedStart: classes.adornedStart,
        }}
      />
    </FormControl>
  )
}

const Option = ({ classes, label, onChange, ...checkboxProps }) => (
  <FormControlLabel
    data-testid={generateTestId('multi', 'select')}
    label={label}
    onClick={onChange}
    control={
      <Checkbox
        color="primary"
        className={classes.checkbox}
        icon={<CheckBoxOutlineBlankIcon className={classes.checkboxSize} />}
        checkedIcon={<CheckBoxIcon className={classes.checkboxSize} />}
        {...checkboxProps}
      />
    }
    classes={{ root: classes.formControlLabelRoot, label: classes.optionLabel }}
  />
)
