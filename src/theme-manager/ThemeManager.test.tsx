import React from 'react'
import { render, screen } from '@testing-library/react'
import ThemeManager, { useCustomTheme } from './ThemeManager'

jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn(),
}))

const { useSelector } = jest.requireMock('react-redux')

describe('ThemeManager', () => {
    it('renders loading state when theme is not available', () => {
        useSelector.mockReturnValueOnce(null)
        render(
            <ThemeManager themeActions={{ updateTheme: jest.fn() }}>
                <div>Test content</div>
            </ThemeManager>,
        )
        expect(screen.getByText('Loading theme...')).toBeInTheDocument()
    })

    it('renders children and provides theme via useCustomTheme when theme is available', () => {
        useSelector.mockReturnValueOnce({ palette: {}, typography: {}, components: {} })

        const Child = () => {
            const [theme] = useCustomTheme()
            return <div>{theme ? 'has-theme' : 'no-theme'}</div>
        }

        render(
            <ThemeManager themeActions={{ updateTheme: jest.fn() }}>
                <Child />
            </ThemeManager>,
        )

        expect(screen.getByText('has-theme')).toBeInTheDocument()
    })
})
