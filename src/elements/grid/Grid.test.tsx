import React from 'react'
import { render, screen } from '../../test-utils'
import Grid, { GridViewColumn } from './Grid'

type Row = { id: number; title: string }

const columns: Array<GridViewColumn<Row>> = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
]

const data: Row[] = [{ id: 1, title: 'Row 1' }]

describe('Grid', () => {
  it('renders grid rows', () => {
    render(<Grid<Row> uniqueIdentifier="id" columns={columns} data={data} label="Label" />)
    expect(screen.getByText('Row 1')).toBeInTheDocument()
  })
})
