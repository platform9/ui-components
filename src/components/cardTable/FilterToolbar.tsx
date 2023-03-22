import React from 'react'
import Theme from '../../theme-manager/themes/model'
import { makeStyles } from '@material-ui/styles'
import SearchBar from '../SearchBar'
import RefreshButton from '../buttons/RefreshButton'
import AsyncDropdown from '../../elements/dropdown/AsyncDropdown'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '32px',
  },
  filters: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifySelf: 'start',
  },
  controls: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'baseline',
    gap: '16px',
    justifySelf: 'end',
  },
}))

interface Props {
  filters?: JSX.Element
  showSortOption?: boolean
  sortOptions?: any
  onSortChange?: (value) => void
  sortBy?: string
  searchTerm: string
  onSearchChange: (value) => any
  onRefresh: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export default function FilterToolbar({
  filters,
  showSortOption = false,
  sortOptions = [],
  onSortChange,
  sortBy,
  searchTerm,
  onSearchChange,
  onRefresh,
}: Props) {
  const classes = useStyles({})
  return (
    <div className={classes.toolbar}>
      <div className={classes.controls}>
        {onRefresh && <RefreshButton onRefresh={onRefresh} />}
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      <div className={classes.filters}>
        {filters}
        {showSortOption && (
          <AsyncDropdown
            onChange={onSortChange}
            items={sortOptions}
            value={sortBy}
            name="sort"
            label="Sort"
            showAll={false}
            compact
            selectFirst
          />
        )}
      </div>
    </div>
  )
}
