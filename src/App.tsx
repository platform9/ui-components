import React, { Reducer, useReducer, useMemo } from 'react'
import { Provider } from 'react-redux'
import store, { themeActions } from './store'
import CardButton from './elements/button/CardButton'
import ThemeManager from './theme-manager/ThemeManager'
import Card from './elements/card'
import Badge from './elements/badge'
import Grid, { GridViewColumn } from './elements/grid/Grid'
import data, { Movie } from 'src/stories/data/movies-list'
import { without } from 'ramda'
import { GridBatchActionSpec } from 'src/elements/grid/hooks/useGridSelectableRows'
import GridDefaultDeleteButton from 'src/elements/grid/buttons/GridDefaultDeleteButton'
import Button from './elements/button/Button'

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
  return (
    <Provider store={store}>
      <ThemeManager themeActions={themeActions}>
        <Card>
          <Button variant="primary">Primary Button</Button>
          <br />
          <Button variant="secondary">Secondary Button</Button>
          <CardButton title="Card Button" icon="plus" />
          <Badge variant="primary" text="This is a badge" />
        </Card>
        <hr />
        <Grid
          label="Label"
          uniqueIdentifier="id"
          columns={columns}
          data={items}
          multiSelection
          batchActions={batchActions}
          onRefresh={() => dispatch({ type: 'refresh', payload: {} })}
        />
      </ThemeManager>
    </Provider>
  )
}

export default App
