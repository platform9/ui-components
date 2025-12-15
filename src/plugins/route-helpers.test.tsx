import { matchLinkToPath, matchesCurrentPath } from './route-helpers'

describe('route-helpers', () => {
    describe('matchesCurrentPath', () => {
        it('returns null for undefined link', () => {
            const result = matchesCurrentPath('/test', undefined)
            expect(result).toBeFalsy()
        })

        it('matches path correctly', () => {
            const result = matchesCurrentPath('/test', { path: '/test' })
            expect(result).toBeTruthy()
        })
    })

    describe('matchLinkToPath', () => {
        it('returns a function', () => {
            const matcher = matchLinkToPath('/test')
            expect(typeof matcher).toBe('function')
        })
    })
})
