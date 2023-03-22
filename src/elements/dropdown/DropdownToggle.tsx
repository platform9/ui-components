import { styled } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'

export default styled('button')<Theme>(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 28,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  color: theme.palette.grey[500],
  '& i': {
    cursor: 'pointer',
    position: 'relative',
    top: 1,
    color: theme.palette.grey[500],
  },
}))
