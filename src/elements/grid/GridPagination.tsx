import React, { FC, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import Text from '../../elements/Text'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import { GridPaginationProps } from './hooks/useGridPagination'
import Dropdown from '../../elements/dropdown'
import { range } from 'ramda'
import clsx from 'clsx'

export const useStyles = makeStyles<Theme>((theme) => ({
  navigation: {
    color: theme.components.typography.passive,
    fontSize: 14,
    display: 'flex',
    gridAutoFlow: 'column',
    justifyContent: 'space-between',
    padding: '8px 8px 8px 16px',
    minHeight: 36,
    gap: 16,
    left: 0,
  },
  pageCount: {
    width: '33%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'left',
    alignItems: 'center',
  },
  perPage: {
    width: '33%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'right',
    alignItems: 'center',
  },
  controls: {
    width: '33%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  dropdown: {
    display: 'inline-flex',
    flexFlow: 'row nowrap',
    justifyContent: 'right',
    alignItems: 'center',
    '& .inputFrame': {
      borderWidth: 1,
      marginRight: theme.spacing(1),
    },
    '& .placeholder': {
      fontWeight: 400,
    },
    '& .dropdownMenu': {
      minWidth: 50,
    },
  },
  nav: {
    textAlign: 'center',
    margin: theme.spacing(0, 2),
    fontWeight: 400,
  },
  navBtn: {
    width: 24,
    height: 24,
    borderRadius: 4,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 150ms ease',
    '&:hover': {
      backgroundColor: theme.components.table.hoverBackground,
    },
  },
  pageInput: {
    width: 20,
    margin: theme.spacing(0, 0.75),
    textAlign: 'center',
    border: `1px solid ${theme.components.table.border}`,
    color: theme.components.typography.passive,
    borderRadius: 3,
    padding: theme.spacing(0.5, 1),
    backgroundColor: 'inherit',
  },
}))

const pageSizeOptions = [5, 10, 25, 50, 100].map((value) => ({ value }))

const GridPagination: FC<GridPaginationProps> = ({
  paginationDisabled,
  rowsPerPage,
  currentPage,
  currentPageItemsCount,
  pagesCount,
  itemsCount,
  updateRowsPerPage,
  goToPage,
  goPrevPage,
  goNextPage,
  showResultsPerPageDropdown = true,
}) => {
  const classes = useStyles({})
  const pageOptions = useMemo(
    () => range(1, pagesCount + 1).map((value) => ({ value })),
    [pagesCount],
  )
  const currentItemNum = (currentPage - 1) * rowsPerPage

  if (paginationDisabled) {
    return null
  }

  return (
    <div className={classes.navigation}>
      <div className={classes.pageCount}>
        {currentItemNum + 1}-{currentItemNum + currentPageItemsCount} of {itemsCount} items
      </div>
      <div className={clsx(classes.controls, 'paginationControls')}>
        <FontAwesomeIcon
          disabled={currentPage === 1}
          aria-hidden="true"
          className={classes.navBtn}
          onClick={goPrevPage}
        >
          angle-left
        </FontAwesomeIcon>
        <Text component="div" variant="inputLabel" className={classes.nav}>
          <Dropdown
            className={classes.dropdown}
            label="Page"
            compact
            items={pageOptions}
            value={currentPage}
            onChange={goToPage}
          />
          of {pagesCount}
        </Text>

        <FontAwesomeIcon
          disabled={currentPage === pagesCount}
          aria-hidden="true"
          className={classes.navBtn}
          onClick={goNextPage}
        >
          angle-right
        </FontAwesomeIcon>
      </div>

      {showResultsPerPageDropdown && (
        <div className={classes.perPage}>
          <Dropdown
            className={classes.dropdown}
            label="Results per page"
            compact
            items={pageSizeOptions}
            value={rowsPerPage}
            onChange={updateRowsPerPage}
          />
        </div>
      )}
    </div>
  )
}

export default GridPagination
