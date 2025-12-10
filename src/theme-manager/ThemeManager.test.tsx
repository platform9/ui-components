import React from 'react'
import { render } from '../test-utils'
import ThemeManager, { useCustomTheme, withCustomTheme } from './ThemeManager'

describe('ThemeManager', () => {
    it('renders correctly', () => {
        const mockThemeActions = {
            updateTheme: jest.fn()
        }
        render(
            <ThemeManager themeActions={mockThemeActions}>
                <div>Test content</div>
            </ThemeManager>
        )
    })
})
