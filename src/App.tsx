import React, { Reducer, useReducer, useMemo } from 'react'
import { Provider } from 'react-redux'
import store, { themeActions } from './store'
import ThemeManager from './theme-manager/ThemeManager'
import Grid, { GridViewColumn } from './elements/grid/Grid'
import data, { Movie } from './stories/data/movies-list'
import { without } from 'ramda'
import { GridBatchActionSpec } from './elements/grid/hooks/useGridSelectableRows'
import GridDefaultDeleteButton from './elements/grid/buttons/GridDefaultDeleteButton'
import { GridRowMenuHeader, GridRowMenuItemSpec } from './elements/grid/hooks/useGridRowMenu'

// For testing purposes only. This is just to simulate what the
// app consuming this plugin would look like

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
    key: 'plot',
    label: 'Plot',
    disableSorting: true,
    width: 'large',
  },
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

const App = () => {
  const [items, dispatch] = useReducer(itemActionsReducer, data)
  const batchActions = useMemo<GridBatchActionSpec<Movie>[]>(
    () => [
      {
        handleAction: (selectedItems) => {
          // eslint-disable-next-line no-restricted-globals
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
  const rowMenuItems: Array<GridRowMenuHeader | GridRowMenuItemSpec<Movie>> = [
    { title: 'Basic Actions' },
    {
      cond: () => true,
      label: 'Edit',
      icon: 'edit',
      handleClick: () => alert('Action triggered'),
      refreshAfterSuccess: true,
      onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },

    {
      cond: (item) => false,
      label: 'Delete',
      icon: 'trash',
      handleClick: () => alert('Action triggered'),
      refreshAfterSuccess: true,
      onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },
    { title: 'Advanced Actions' },
    {
      cond: () => true,
      label: 'Upgrade',
      icon: 'level-up',
      handleClick: () => alert('Action triggered'),
      refreshAfterSuccess: true,
      onComplete: (success) => alert(success ? 'Success!' : 'Failure'),
    },
  ]
  return (
    <Provider store={store}>
      <ThemeManager themeActions={themeActions}>
        {/* Render components here for testing */}
        <Grid
          label="Label"
          uniqueIdentifier="id"
          columns={columns}
          data={items}
          multiSelection
          batchActions={batchActions}
          onRefresh={() => dispatch({ type: 'refresh', payload: {} })}
          rowMenuItems={rowMenuItems}
        />
      </ThemeManager>
    </Provider>
  )
}

export default App
