import { fireEvent, render, screen } from '../../test-utils'
import GridRow from './GridRow'

describe('GridRow', () => {
    it('renders cell content and toggles selection on row click', () => {
        const toggleSelect = jest.fn()
        const CellComponent = ({ children }: any) => <span>{children}</span>
        render(
            <table>
                <tbody>
                    <GridRow
                        item={{ name: 'Alice' }}
                        getCells={() => [
                            {
                                key: 'name',
                                CellComponent,
                                value: 'Alice',
                                getFormattedValue: () => 'Alice',
                                width: 0
                            },
                        ]}
                        className=""
                        tdClassName=""
                        cellClassName=""
                        isSelectable={true}
                        isSelected={false}
                        multiSelection={true}
                        toggleSelect={toggleSelect}
                        expandedRowsById={{}}
                        rowMenuItems={[]}
                        rowMenuDisabled
                        rowMenuOffset={{}}
                    />
                </tbody>
            </table>
        )

        expect(screen.getByTestId('name')).toHaveTextContent('Alice')
        fireEvent.click(screen.getByText('Alice'))
        expect(toggleSelect).toHaveBeenCalledTimes(1)
    })
})
