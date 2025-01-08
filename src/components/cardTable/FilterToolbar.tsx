import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import AsyncDropdown from '../../elements/dropdown/AsyncDropdown'
import Theme from '../../theme-manager/themes/model'
import SearchBar from '../SearchBar'
import RefreshButton from '../buttons/RefreshButton'

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
  className?: string
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
  className,
}: Props) {
  const classes = useStyles()
  return (
    <div className={clsx(classes.toolbar, className)}>
      <div className={clsx(classes.controls, 'controls')}>
        {onRefresh && <RefreshButton onRefresh={onRefresh} />}
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      </div>
      <div className={clsx(classes.filters, 'filters')}>
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
