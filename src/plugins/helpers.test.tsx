import { parseNavItem, initData, getSections } from './helpers'

describe('helpers', () => {
    describe('parseNavItem', () => {
        it('should parse nav item with base path', () => {
            const parser = parseNavItem('/base')
            const result = parser({
                name: 'Test',
                link: { path: '/test' }
            })
            expect(result.link.path).toBe('/base/test')
        })
    })

    describe('initData', () => {
        it('should initialize data structure', () => {
            const data = initData()
            expect(data.components).toEqual([])
            expect(data.routes).toEqual([])
            expect(data.navItems).toEqual([])
        })
    })

    describe('getSections', () => {
        it('should return empty array for empty plugins', () => {
            const result = getSections({})
            expect(result).toEqual([])
        })
    })
})
