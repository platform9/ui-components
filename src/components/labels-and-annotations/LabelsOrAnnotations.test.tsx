import React from 'react'
import { render, screen } from '../../test-utils'
import { Labels, Annotations } from './LabelsOrAnnotations'

describe('Labels', () => {
    it('renders labels correctly', () => {
        render(<Labels labels={{ app: 'test', env: 'dev' }} />)
        expect(screen.getByText('app=test')).toBeInTheDocument()
        expect(screen.getByText('env=dev')).toBeInTheDocument()
    })

    it('renders null when labels are not provided', () => {
        const { container } = render(<Labels labels={undefined} />)
        expect(container.firstChild).toBeNull()
    })
})

describe('Annotations', () => {
    it('renders annotations correctly', () => {
        render(<Annotations annotations={{ description: 'A test annotation' }} />)
        expect(screen.getByText('description: A test annotation')).toBeInTheDocument()
    })

    it('renders null when annotations are not provided', () => {
        const { container } = render(<Annotations annotations={undefined} />)
        expect(container.firstChild).toBeNull()
    })
})
