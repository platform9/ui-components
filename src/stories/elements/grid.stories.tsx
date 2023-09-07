/* eslint-disable no-restricted-globals */
import React, { useCallback, useState, useEffect, useMemo, Reducer, useReducer } from 'react'
import { Meta } from '@storybook/react'
import data, { Movie } from '../data/movies-list'
import { equals, reverse, sort, uniq, without } from 'ramda'
import {
  defaultSortingState,
  defaultSortWith,
  SortingState,
} from '../../elements/grid/hooks/useGridSorting'
import { isNilOrEmpty } from '../../utils/fp'
import Grid from '../../elements/grid'
import { GridProps, GridViewColumn } from '../../elements/grid/Grid'
import { GridFilterSpec, GridGlobalFilterSpec } from '../../elements/grid/hooks/useGridFiltering'
import GridDefaultDeleteButton from '../../elements/grid/buttons/GridDefaultDeleteButton'
import GridSearchFilter from '../../elements/grid/GridSearchFilter'
import { GridBatchActionSpec } from '../../elements/grid/hooks/useGridSelectableRows'
import { ThemedContainer } from '../containers'
import Dropdown from '../../elements/dropdown'
import GridDefaultActionButton from '../../elements/grid/buttons/GridDefaultActionButton'
import { GridRowMenuItemSpec } from '../../elements/grid/hooks/useGridRowMenu'
import Button from '../../elements/button/Button'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  expandedRow: {
    padding: '32px',
    display: 'grid',
    gap: '16px',
  },
}))

type GlobalFilters = { search: string }

type Filters = {
  year: string
  genre: string
}

const sortNumbers = (valA: number, valB: number) => valA - valB
const columns: Array<GridViewColumn<Movie>> = [
  {
    key: 'id',
    label: 'ID',
    display: false,
  },
  {
    key: 'title',
    label: 'Title',
    tooltip: 'The title of the movie',
  },
  {
    key: 'director',
    label: 'Director',
    width: 'small',
  },
  {
    key: 'actors',
    label: 'Actors',
    width: 'medium',
  },
  {
    key: 'year',
    label: 'Year',
    sortFn: sortNumbers,
    width: 'small',
  },
  {
    key: 'runtime',
    label: 'Runtime',
    accessor: (item) => item.runtime, // We could access a nested property here
    sortFn: sortNumbers,
    formatFn: (val: string) => `${val} min`,
    width: 'small',
  },
  {
    key: 'genres',
    label: 'Genres',
    width: 'medium',
    formatFn: (value) => value.join(', '),
    sortFn: (genresA: string[], genresB: string[]) =>
      genresA.join('-').localeCompare(genresB.join('-')),
    // Explicitly typing the column gives strongly typed arguments
  } as GridViewColumn<Movie, 'genres'>,
  {
    key: 'plot',
    label: 'Plot',
    disableSorting: true,
    width: 'large',
  },
]

const ExpandCell = ({ expandRow, rowIsExpanded }) => {
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        expandRow()
      }}
    >
      {rowIsExpanded ? 'Shrink' : 'Expand'}
    </Button>
  )
}

const expandableGridColumns = [
  ...columns,
  {
    key: 'key',
    label: 'Actions',
    disableSorting: true,
    CellComponent: ExpandCell,
  },
]

const rowMenuItems: Array<GridRowMenuItemSpec<Movie>> = [
  {
    cond: () => true,
    label: 'Foo Action',
    icon: 'edit',
    handleClick: () => alert('Action triggered'),
    refreshAfterSuccess: true,
    onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
  },
  {
    cond: () => true,
    label: 'Bar Action',
    icon: 'level-up',
    handleClick: () => alert('Action triggered'),
    refreshAfterSuccess: true,
    onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
  },
  {
    cond: (item) => false,
    label: 'Disabled Action',
    icon: 'trash',
    handleClick: () => alert('Action triggered'),
    refreshAfterSuccess: true,
    onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
  },
]

const globalFilters: Array<GridGlobalFilterSpec<Movie, GlobalFilters>> = [
  {
    key: 'search',
    equalityComparerFn: (item, value: string) => {
      return (
        item.director.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      )
    },
    FilterComponent: GridSearchFilter,
  },
]
const years = uniq(data.map(({ year }) => +year).sort((a, b) => a - b)).map((year) => ({
  value: year,
}))
const YearFilter = (props) => {
  return <Dropdown {...props} label="Years:" compact showAll allKey="" items={years} />
}

const genres = uniq(data.map(({ genres }) => genres).flat()).map((genre) => ({
  value: genre,
}))
const GenreFilter = (props) => {
  return <Dropdown {...props} label="Genres:" compact showAll allKey="" items={genres} />
}

const filters: GridFilterSpec<Movie, Filters>[] = [
  {
    columnKey: 'year',
    FilterComponent: YearFilter,
  } as GridFilterSpec<Movie, Filters, 'year'>,
  {
    columnKey: 'genres',
    FilterComponent: GenreFilter,
    equalityComparerFn: (itemValue, value) => itemValue.includes(value),
  } as GridFilterSpec<Movie, Filters, 'genres', 'genre'>,
]
const itemActionsReducer: Reducer<
  Movie[],
  {
    type: 'remove' | 'refresh'
    payload: { selectedItems?: Movie[] }
  }
> = (items, { type, payload: { selectedItems } }) => {
  switch (type) {
    case 'refresh':
      return data
    case 'remove':
    default:
      return without(selectedItems, items)
  }
}

export const UncontrolledGrid = (args: Partial<GridProps<Movie, GlobalFilters, Filters>>) => {
  const [items, dispatch] = useReducer(itemActionsReducer, data)
  const batchActions = useMemo<GridBatchActionSpec<Movie>[]>(
    () => [
      {
        handleAction: (selectedItems) => {
          if (confirm('Are you sure?')) {
            dispatch({ type: 'remove', payload: { selectedItems } })
            return true
          }
          return false
        },
        BatchActionButton: GridDefaultDeleteButton,
      },
    ],
    [],
  )
  return (
    <ThemedContainer>
      <Grid
        {...args}
        extraToolbarContent={
          <GridDefaultActionButton onClick={() => alert('Add Dialog placeholder')}>
            Add Movie
          </GridDefaultActionButton>
        }
        label="Label"
        uniqueIdentifier="id"
        columns={columns}
        data={items}
        globalFilters={globalFilters}
        filters={filters}
        multiSelection
        batchActions={batchActions}
        rowMenuItems={rowMenuItems}
        onRefresh={() => dispatch({ type: 'refresh', payload: {} })}
      />
    </ThemedContainer>
  )
}

async function awaitSeconds<T>(seconds = 1): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

const rowsPerPage = 10
export const AsyncGrid = (args: Partial<GridProps<Movie, GlobalFilters, Filters>>) => {
  const [loadingCount, setLoadingCount] = useState(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(rowsPerPage)
  const [filterValues, setFilterValues] = useState<{ [key: string]: any }>({
    search: null,
    year: null,
    genres: null,
  })
  const [{ orderBy, orderDirection }, setSorting] = useState<SortingState>(defaultSortingState)
  const [loading, setLoading] = useState<boolean>(false)
  const [items, dispatch] = useReducer(itemActionsReducer, data)

  const batchActions = useMemo<GridBatchActionSpec<Movie>[]>(
    () => [
      {
        handleAction: async (selectedItems) => {
          if (confirm('Are you sure?')) {
            dispatch({ type: 'remove', payload: { selectedItems } })
            await dummyLoadDataAsync()
            return true
          }
          return false
        },
        BatchActionButton: GridDefaultDeleteButton,
      },
    ],
    [],
  )

  const dummyLoadDataAsync = useCallback(async () => {
    setLoading(true)
    await awaitSeconds()
    setLoading(false)
    setLoadingCount(loadingCount + 1)
  }, [loadingCount])

  const handleRefresh = useCallback(async () => {
    dispatch({ type: 'refresh', payload: {} })
    await dummyLoadDataAsync()
  }, [])

  const asyncGlobalFilters: Array<GridGlobalFilterSpec<Movie, GlobalFilters>> = useMemo(
    () => [
      {
        key: 'search',
        initialValue: '',
        controlled: true,
        equalityComparerFn: (item, value: string) => {
          return (
            item.director.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
          )
        },
        FilterComponent: GridSearchFilter,
        onChange: (search: string) => {
          setFilterValues({ ...filterValues, search })
        },
      },
    ],
    [filterValues],
  )
  const asyncFilters: GridFilterSpec<Movie, Filters>[] = useMemo(
    () => [
      {
        columnKey: 'year',
        initialValue: '',
        FilterComponent: YearFilter,
        controlled: true,
        onChange: (year) => {
          setFilterValues({ ...filterValues, year })
        },
      } as GridFilterSpec<Movie, Filters, 'year'>,
      {
        columnKey: 'genres',
        initialValue: '',
        FilterComponent: GenreFilter,
        controlled: true,
        equalityComparerFn: (itemValue, value) => itemValue.includes(value),
        onChange: (genres) => {
          setFilterValues({ ...filterValues, genres })
        },
      } as GridFilterSpec<Movie, Filters, 'genres', 'genre'>,
    ],
    [filterValues],
  )
  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      setCurrentPage(page)
      setPageSize(pageSize)
    },
    [currentPage, pageSize],
  )

  const handleSortBy = useCallback((sortedBy, sortedDirection) => {
    setSorting({ orderBy: sortedBy, orderDirection: sortedDirection })
  }, [])

  const getParsedData = useCallback(() => {
    const globalFilteredItems = asyncGlobalFilters.reduce(
      (items, { key, equalityComparerFn = equals }) => {
        if (!isNilOrEmpty(filterValues[key])) {
          return items.filter((item) => equalityComparerFn(item, filterValues[key]))
        }
        return items
      },
      items,
    )
    const filteredItems = asyncFilters.reduce(
      (items, { columnKey, equalityComparerFn = equals }) => {
        if (!isNilOrEmpty(filterValues[columnKey])) {
          return items.filter((item) =>
            equalityComparerFn(item[columnKey], filterValues[columnKey]),
          )
        }
        return items
      },
      globalFilteredItems,
    )
    const sortedItems = ((items) => {
      if (!orderBy) {
        return items
      }
      const sortByColumn = columns.find(({ key }) => key === orderBy)
      const { disableSorting = false, sortFn = defaultSortWith } = sortByColumn
      const sortedItemsTmp = disableSorting
        ? items
        : sort((a, b) => sortFn(b[orderBy], a[orderBy]), items)
      return orderDirection === 'desc' ? reverse(sortedItemsTmp) : sortedItemsTmp
    })(filteredItems)

    const startIdx = (currentPage - 1) * pageSize
    const endIdx = startIdx + pageSize
    return sortedItems.slice(startIdx, endIdx)
  }, [items, filterValues, orderBy, orderDirection, currentPage, pageSize])

  const parsedData = useMemo(() => {
    if (!loadingCount) {
      return []
    }
    return getParsedData()
  }, [loadingCount, items])

  useEffect(() => {
    dummyLoadDataAsync()
  }, [])
  useEffect(() => {
    dummyLoadDataAsync()
  }, [filterValues, currentPage, pageSize, orderBy, orderDirection])

  return (
    <ThemedContainer>
      <Grid
        {...args}
        extraToolbarContent={
          <GridDefaultActionButton onClick={() => alert('Add Dialog placeholder')}>
            Add Movie
          </GridDefaultActionButton>
        }
        label="Label"
        totalItems={items.length}
        rowsPerPage={rowsPerPage}
        loading={loading}
        controlledPagination
        controlledSorting
        onPageChange={handlePageChange}
        onSortChange={handleSortBy}
        uniqueIdentifier="id"
        columns={columns}
        data={parsedData}
        globalFilters={asyncGlobalFilters}
        filters={asyncFilters}
        batchActions={batchActions}
        rowMenuItems={rowMenuItems}
        onRefresh={handleRefresh}
        multiSelection
      />
    </ThemedContainer>
  )
}

export const ExpandableRowGrid = (args: Partial<GridProps<Movie, GlobalFilters, Filters>>) => {
  const classes = useStyles()
  const [items, dispatch] = useReducer(itemActionsReducer, data)
  const batchActions = useMemo<GridBatchActionSpec<Movie>[]>(
    () => [
      {
        handleAction: (selectedItems) => {
          if (confirm('Are you sure?')) {
            dispatch({ type: 'remove', payload: { selectedItems } })
            return true
          }
          return false
        },
        BatchActionButton: GridDefaultDeleteButton,
      },
    ],
    [],
  )
  const rowMenuItems: Array<GridRowMenuItemSpec<Movie>> = [
    {
      icon: 'edit',
      label: 'Edit',
      handleClick: (item, onRowExpand) => alert(`Edit ${item?.title}`),
    },
    {
      icon: 'up-right-and-down-left-from-center',
      label: 'Expand/Shrink Row',
      handleClick: (item, onRowExpand) => onRowExpand(),
    },
  ]

  return (
    <ThemedContainer>
      <Grid
        {...args}
        extraToolbarContent={
          <GridDefaultActionButton onClick={() => alert('Add Dialog placeholder')}>
            Add Movie
          </GridDefaultActionButton>
        }
        label="Label"
        uniqueIdentifier="id"
        columns={expandableGridColumns}
        data={items}
        globalFilters={globalFilters}
        filters={filters}
        multiSelection
        batchActions={batchActions}
        rowMenuItems={rowMenuItems}
        onRefresh={() => dispatch({ type: 'refresh', payload: {} })}
        disableToolbar
        expandableRow={(item, onRowExpand) => (
          <div className={classes.expandedRow}>
            <div>Expanded Row {item?.title}</div>
            <div>
              <Button onClick={onRowExpand}>Shrink Row</Button>
            </div>
          </div>
        )}
        expandedByDefault={(item) => item?.title === 'Beetlejuice'}
      />
    </ThemedContainer>
  )
}

UncontrolledGrid.parameters = {
  docs: {
    source: {
      code: `
  import Grid from 'core/elements/grid'

  const DefaultGrid = () => (
    <Grid columns={columns} data={data} />
  )
`,
    },
  },
}

UncontrolledGrid.args = {
  size: 'large',
}

const GridStories: Meta = {
  title: 'Elements/Grid',
  component: Grid,
  argTypes: {
    onBeforePageChange: {
      action: 'beforePageChange',
    },
  },
}

export default GridStories
