import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useRef, useState } from 'react'
import Theme from 'src/theme-manager/themes/model'
import Button from './Button'

interface Props {
  copyText: string
  disabled?: boolean
  className?: string
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  copyButton: {
    width: 'max-content',
  },
  textArea: {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
  },
}))

const CopyButton: FunctionComponent<Props> = ({ className, copyText, disabled = false }) => {
  const [isCopySuccessful, setIsCopySuccessful] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const classes = useStyles()

  // Copied over from CopyToClipboard.tsx
  const handleCopy = (e) => {
    e.stopPropagation()
    try {
      const selected =
        document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
      textAreaRef.current.select()
      const success = document.execCommand('copy')

      if (!success) {
        throw new Error('Unable to copy text')
      }

      if (selected) {
        document.getSelection().removeAllRanges()
        document.getSelection().addRange(selected)
      }

      setIsCopySuccessful(true)
      setTimeout(() => {
        setIsCopySuccessful(false)
      }, 2000)
    } catch (e) {
      console.log('Unable to copy text')
    }
  }

  // readOnly is needed in textarea to silence React warning about missing onChange
  return (
    <div onClick={handleCopy} className={classes.copyButton}>
      <textarea ref={textAreaRef} value={copyText} className={classes.textArea} readOnly />
      <Button
        variant="primary"
        className={className}
        icon={isCopySuccessful ? 'check' : 'copy'}
        disabled={disabled}
      >
        {isCopySuccessful ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}

export default CopyButton
