import { discoverText, getLogs, LogColors } from './helpers'

describe('log-viewer/helpers', () => {
  describe('getLogs', () => {
    it('splits string logs by newline', () => {
      expect(getLogs('a\nb\n')).toEqual(['a', 'b', ''])
    })

    it('returns non-string logs as-is', () => {
      const logs = ['a', 'b']
      expect(getLogs(logs)).toBe(logs)
    })
  })

  describe('discoverText', () => {
    it('returns CodeBlue for first line when it contains a date', () => {
      expect(discoverText('01/02/2024 something', 0)).toBe(LogColors.CodeBlue)
    })

    it('returns Default for first line when it does not contain a date', () => {
      expect(discoverText('not a date', 0)).toBe(LogColors.Default)
    })

    it('returns Default for non-first lines even if it contains a date', () => {
      expect(discoverText('01-02-2024 something', 1)).toBe(LogColors.Default)
    })
  })
})
