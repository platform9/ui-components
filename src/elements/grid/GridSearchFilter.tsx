import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { debounce } from 'src/utils/async'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import Input from 'src/elements/input/Input'

export interface GridSearchFilterProps {
  value: string
  onChange: (value: string) => void
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  searchBar: {
    outline: 'none',
    border: 0,
    margin: 0,
    marginRight: theme.spacing(1),
    '& > .inputFrame': {
      maxWidth: 120,
      padding: 0,
      backgroundColor: 'inherit',
      color: 'inherit',
    },
    '& .label, & .input, & .icon': {
      backgroundColor: 'inherit',
      color: 'inherit',
    },
  },
  clearIcon: {
    color: theme.palette.grey[700],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.grey[900],
    },
    '&:active': {
      color: theme.palette.grey[700],
    },
  },
}))

export default function GridSearchFilter({ value: initialValue, onChange }: GridSearchFilterProps) {
  const classes = useStyles({})
  const [value, setValue] = useState<string>(initialValue)
  const debouncedUpdateFilterValue = useMemo(() => debounce<[string], void>(onChange), [])
  const handleOnChange = useCallback(async ({ target: { value } }) => {
    setValue(value)
    return debouncedUpdateFilterValue(value)
  }, [])
  useEffect(() => {
    return () => {
      debouncedUpdateFilterValue.cancel()
    }
  }, [])

  const handleClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    //TODO: Add two icons here after Input is updated
    <Input
      compact
      icon="search"
      placeholder="Search"
      className={classes.searchBar}
      value={value !== undefined ? value : ''}
      onChange={handleOnChange}
      type="search"
    />

    // <TextField
    //   variant="outlined"
    //   placeholder="Search"
    //   className={classes.searchBar}
    //   value={value !== undefined ? value : ''}
    //   onChange={handleOnChange}
    //   type="search"
    //   InputProps={{
    //     classes: pick(['root', 'adornedStart', 'adornedEnd'], classes),
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <FontAwesomeIcon className={`${classes.searchIcon} searchIcon`}>search</FontAwesomeIcon>
    //       </InputAdornment>
    //     ),
    //     endAdornment: (
    //       <InputAdornment
    //         position="end"
    //         style={{ visibility: value?.length > 0 ? 'visible' : 'hidden' }}
    //       >
    //         <ClearIcon className={classes.clearIcon} color="action" onClick={handleClear} />
    //       </InputAdornment>
    //     ),
    //   }}
    // />
  )
}
