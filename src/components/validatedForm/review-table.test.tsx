import React from 'react'
import { render, screen } from '../../test-utils'
import ReviewTable from './review-table'

describe('review-table', () => {
    it('renders rows and field values for provided columns', () => {
        render(
            <ReviewTable
                data={{ name: 'Alice', enabled: false }}
                columns={[
                    { id: 'name', label: 'Name' },
                    { id: 'enabled', label: 'Enabled', render: (v) => (v ? 'Yes' : 'No') },
                ]}
            />,
        )

        expect(screen.getByTestId('name-fieldname')).toHaveTextContent('Name')
        expect(screen.getByTestId('name-fieldvalue')).toHaveTextContent('Alice')
        expect(screen.getByTestId('enabled-fieldvalue')).toHaveTextContent('No')
    })
})
