import React from 'react'
import { fireEvent, render, screen } from '../../test-utils'
import GridPagination from './GridPagination'

describe('GridPagination', () => {
    it('renders current range and calls goNextPage when next is clicked', () => {
        const goNextPage = jest.fn()
        const { container } = render(
            <GridPagination
                paginationDisabled={false}
                rowsPerPage={10}
                currentPage={1}
                currentPageItemsCount={10}
                pagesCount={2}
                itemsCount={20}
                goToPage={() => { }}
                goPrevPage={() => { }}
                goNextPage={goNextPage}
                updateRowsPerPage={() => { }}
            />,
        )

        expect(screen.getByText('1-10 of 20 items')).toBeInTheDocument()

        const nextIcon = container.querySelector('i.fa-angle-right')
        expect(nextIcon).not.toBeNull()
        fireEvent.click(nextIcon as Element)
        expect(goNextPage).toHaveBeenCalledTimes(1)
    })
})
