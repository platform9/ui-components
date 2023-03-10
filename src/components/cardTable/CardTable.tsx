import { makeStyles } from '@material-ui/styles'
import { allKey } from 'src/constants'
import Theme from 'src/theme-manager/themes/model'
import { compose, pathOr } from 'ramda'
import React, { useCallback, useMemo, useState } from 'react'
import { pathStrOr } from 'src/utils/fp'
import Progress from '../progress/Progress'
import FilterToolbar from './FilterToolbar'

const useStyles = makeStyles((theme: Theme) => ({
  appCatalog: {
    width: '100%',
    marginTop: theme.spacing(2),
    minHeight: 300,
  },
  table: {
    minWidth: 800,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  emptyList: {
    textAlign: 'left',
    margin: theme.spacing(1, 4),
  },
  apps: {
    display: 'grid',
    gridTemplateColumns: 'repeat( auto-fill, 368px )',
    gap: '16px',
  },
}))

interface Props {
  data: any[]
  searchTarget: string
  filters?: any
  filterValues?: FilterValues[]
  showSortOption?: boolean
  sortOptions?: SortOptions[]
  onSortChange?: any
  sortBy?: string
  sortTarget?: string
  loading: boolean
  loadingMessage?: string
  handleRefresh: any
  children?: any
  emptyItemsMessage?: string | React.ReactNode
}

interface FilterValues {
  value: string
  target?: string
  customFilterFn?: any
}
interface SortOptions {
  label: string
  value: string
}

const CardTable = ({
  data,
  searchTarget,
  filters,
  filterValues,
  showSortOption = false,
  sortOptions = [],
  onSortChange,
  sortBy = 'asc',
  sortTarget,
  loading,
  loadingMessage,
  handleRefresh,
  children,
  emptyItemsMessage,
}: Props) => {
  const classes = useStyles({})
  const [searchTerm, setSearchTerm] = useState('')

  const filter = useCallback(
    (data) => {
      if (!filters) return data
      let filteredData = data
      filterValues.map(({ value, target, customFilterFn }) => {
        if (value && value !== allKey) {
          filteredData = customFilterFn
            ? customFilterFn(filteredData)
            : filteredData.filter((item) => pathStrOr('', target, item) === value)
        }
      })
      return filteredData
    },
    [filterValues],
  )

  const filterBySearch = useCallback(
    (data) => {
      return data.filter(
        (item) =>
          pathOr('', searchTarget.split('.'), item).match(new RegExp(searchTerm, 'i')) !== null,
      )
    },
    [searchTerm, searchTarget],
  )

  const sort = useCallback(
    (data) => {
      if (!showSortOption || !sortTarget) {
        return data
      }

      const sortedData = data.sort((a, b) => {
        const aValue = pathOr('', sortTarget.split('.'), a)
        const bValue = pathOr('', sortTarget.split('.'), b)
        return aValue.toLowerCase() > bValue.toLowerCase() ? 1 : -1
      })
      return sortBy === 'desc' ? sortedData.reverse() : sortedData
    },
    [showSortOption, sortTarget, sortBy],
  )

  const filteredData = compose(filter, filterBySearch, sort)(data)

  const hasData = useMemo(() => filteredData?.length > 0, [filteredData])

  return (
    <Progress overlay loading={loading} renderContentOnMount message={loadingMessage}>
      <div className={classes.appCatalog}>
        <FilterToolbar
          filters={filters}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showSortOption={showSortOption}
          sortOptions={sortOptions}
          onSortChange={onSortChange}
          sortBy={sortBy}
          onRefresh={handleRefresh}
        />
        {hasData && <div className={classes.apps}>{filteredData.map(children)}</div>}
        {!hasData && !loading && emptyItemsMessage}
      </div>
    </Progress>
  )
}

export default CardTable
