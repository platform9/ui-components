import React from 'react'
import { render, screen } from '../../test-utils'
import CardTable from './CardTable'

describe('CardTable', () => {
    it('renders correctly', () => {
        render(
            <CardTable
                data={[]}
                searchTarget="name"
                loading={false}
                handleRefresh={() => { }}
            />
        )
    })
})
