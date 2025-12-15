import useStyles from './useStyles'

describe('dropdown/useStyles', () => {
  it('exports a makeStyles hook', () => {
    expect(typeof useStyles).toBe('function')
  })
})
