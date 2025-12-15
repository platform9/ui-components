import React from 'react'
import { render, screen } from '../../test-utils'
import CardTable from './CardTable'

describe('CardTable', () => {
    it('renders the emptyItemsMessage when there is no data and not loading', () => {
        render(
            <CardTable
                data={[]}
                searchTarget="name"
                loading={false}
                handleRefresh={() => {}}
                emptyItemsMessage={<div>No items</div>}
            />,
        )

        expect(screen.getByText('No items')).toBeInTheDocument()
    })

    it('renders children for each item when data is present', () => {
        render(
            <CardTable
                data={[{ name: 'Alpha' }, { name: 'Beta' }]}
                searchTarget="name"
                loading={false}
                handleRefresh={() => {}}
            >
                {(item: { name: string }) => <div key={item.name}>{item.name}</div>}
            </CardTable>,
        )

        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('Beta')).toBeInTheDocument()
    })
})
