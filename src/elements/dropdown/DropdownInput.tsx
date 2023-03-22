import React from 'react'
import { styled } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import clsx from 'clsx'

type DropdownInputProps = {
  className?: string
}
export default styled(
  React.forwardRef<HTMLInputElement, DropdownInputProps>(
    ({ className, ...rest }: DropdownInputProps, ref) => (
      <div className={clsx(className, 'input')}>
        <FontAwesomeIcon solid size="sm">
          magnifying-glass
        </FontAwesomeIcon>
        <input {...rest} ref={ref} />
      </div>
    ),
  ),
)<Theme>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  color: theme.components.input.frame.color,
  padding: '0 8px',
  '& > input': {
    margin: '2px 10px 0 0',
    transition: 'color .2s ease',
    outline: 0,
    flexGrow: 1,
    caretColor: theme.components.input.frame.color,
    background: 'transparent',
    color: 'inherit',
    boxSizing: 'border-box',
    border: 'none',
    lineHeight: 2.4,
    display: 'inline-block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  '& > i': {
    color: theme.components.input.frame.placeholder,
    marginRight: 8,
  },
}))
