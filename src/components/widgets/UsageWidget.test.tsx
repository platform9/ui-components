import React from 'react'
import { render } from '../../test-utils'
import UsageWidget from './UsageWidget'

describe('UsageWidget', () => {
    it('renders title and used/available values', () => {
        const { container } = render(
            <UsageWidget
                title="CPU"
                units="%"
                stats={{ current: 10, max: 100, percent: 10 }}
                precision={0}
                usedText="used"
            />,
        )

        expect(container).toHaveTextContent('CPU')
        expect(container).toHaveTextContent('10%')
        expect(container).toHaveTextContent('100%')
        expect(container).toHaveTextContent('used')
        expect(container).toHaveTextContent('available')
    })
})
