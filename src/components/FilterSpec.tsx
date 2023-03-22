import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import React, { useEffect } from 'react'
import useReactRouter from 'use-react-router'
import Picklist from '../elements/dropdown/AsyncDropdown'
import SearchBar from './SearchBar'
import { allKey } from '../constants'

interface Props<T> {
  data: T[]
  setFilteredData: Function
  filters?: FilterSpec[]
  searchTarget: string
  extraFilters?: JSX.Element[]
}

export interface FilterSpec {
  name: string
  label: string
  options: string[]
  target: string
}

const useStyles = makeStyles<Theme>((theme) => ({
  filtersContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    '> .wrapper': {
      maxWidth: '100%',
    },
  },
  filters: {
    marginBottom: theme.spacing(1),
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'end',
  },
}))

export default function Filter<T>({
  data,
  setFilteredData,
  filters,
  searchTarget,
  extraFilters = [],
}: Props<T>) {
  const classes = useStyles({})
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterProperties, setFilterProperties] = React.useState({})

  const { history, location } = useReactRouter()
  const urlParams = new URLSearchParams(location.search)

  useEffect(() => {
    const searchTerm = urlParams.get('search')
    if (searchTerm) {
      setSearchTerm(searchTerm)
    }

    filters.map((filter) => {
      const param = urlParams.get(filter.target)
      if (param) {
        filterProperties[filter.target] = param
        setFilterProperties(Object.assign({}, filterProperties))
      }
    })
  }, [data])

  useEffect(() => {
    setFilteredData(getFilteredData(data))
    updateUrlWithParams()
  }, [searchTerm, filterProperties])

  const getFilteredData = (data) => {
    return filterByProperty(filterBySearch(data))
  }

  const updateUrlWithParams = () => {
    const params = {} as any
    // Add in all other params in the URL
    const hasFilterProperties = Object.entries(filterProperties).length > 0
    urlParams.forEach((value, key) => {
      if (key !== 'search' && hasFilterProperties && !filterProperties.hasOwnProperty(key)) {
        params[key] = value
      }
    })

    Object.assign(params, filterProperties)
    if (searchTerm) {
      params.search = searchTerm
    }

    const searchParams = new URLSearchParams(params)
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    })
  }

  const filterBySearch = (items) => {
    return items.filter((item) => item[searchTarget].match(new RegExp(searchTerm, 'i')) !== null)
  }

  const filterByProperty = (data) => {
    let filteredData = data
    Object.entries(filterProperties).map(([property, targetValue]) => {
      filteredData = filteredData.filter((data) => {
        return data[property] === targetValue
      })
    })
    return filteredData
  }

  const handleFilterUpdate = (target) => (selectedValue) => {
    if (selectedValue === allKey) {
      delete filterProperties[target]
    } else {
      filterProperties[target] = selectedValue
    }
    setFilterProperties(Object.assign({}, filterProperties))
  }

  return (
    <div className={classes.filtersContainer}>
      <div className={classes.filters}>
        {extraFilters}
        {filters.map(({ name, label, options, target }) => (
          <Picklist
            key={name}
            name={name}
            label={label}
            items={options.map((value) => ({ value }))}
            onChange={handleFilterUpdate(target)}
            value={filterProperties[target]}
          />
        ))}
      </div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
    </div>
  )
}
