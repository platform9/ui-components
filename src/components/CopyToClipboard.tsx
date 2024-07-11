import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent, useRef, useState } from 'react'
// import useParams from '../hooks/useParams'
import clsx from 'clsx'
import Theme from '../theme-manager/themes/model'
import FontAwesomeIcon from './FontAwesomeIcon'

interface Props {
  className?: string
  copyText: string
  children?: any
  inline?: boolean
  codeBlock?: boolean
  header?: string
  // fill property for if you want the copy to clipboard container to fill
  // the entire width of the parent, but still want the copy to clipboard
  // icon inline
  fill?: boolean
  copyIcon?: any
  triggerWithChild?: boolean
}

interface StyleProps {
  codeBlock?: boolean
  inline?: boolean
  fill?: boolean
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  textArea: {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
  },
  copyButton: {
    padding: '0 0 0 2px',
  },
  copyContainer: {
    display: ({ fill, inline }) => (fill ? 'flex' : inline ? 'inline-flex' : 'flex'),
    flexDirection: ({ inline }) => (inline ? 'row' : 'column'),

    '& pre': {
      borderRadius: ({ codeBlock }) => (codeBlock ? '4px 0 0 4px' : 4),
    },
  },
  copyIconContainer: {
    padding: '0 8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    background: ({ codeBlock }) => (codeBlock ? theme.components.code.background : 'transparent'),
    borderRadius: ({ codeBlock }) => (codeBlock ? '0 4px 4px 0' : 0),
    left: ({ codeBlock }) => (codeBlock ? -2 : 0),
  },
  copyIcon: {
    width: 22,
    height: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  done: {
    fontWeight: 400,
    color: theme.palette.green.main,
  },
  copy: {
    fontWeight: 400,
    color: ({ codeBlock }) => (codeBlock ? theme.components.code.text : theme.palette.primary.main),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.components.code.text,
    padding: theme.spacing(0, 2),
    position: 'relative',
    '& > p': {
      fontFamily: theme.typography.subtitle2.fontFamily,
      fontSize: theme.typography.subtitle2.fontSize,
      fontStretch: theme.typography.subtitle2.fontStretch,
      fontStyle: theme.typography.subtitle2.fontStyle,
      lineHeight: theme.typography.subtitle2.lineHeight,
      letterSpacing: theme.typography.subtitle2.letterSpacing,
      fontWeight: 'bold',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: theme.spacing(),
      right: theme.spacing(),
      height: 2,
      background: ({ codeBlock }) => (codeBlock ? theme.components.code.text : 'transparent'),
    },
  },
}))

const CopyToClipboard: FunctionComponent<Props> = ({
  className,
  children,
  copyText,
  inline = true,
  codeBlock = true,
  header = undefined,
  fill = false,
  triggerWithChild = false,
  copyIcon = 'clipboard',
}) => {
  // const { params, updateParams } = useParams<State>(defaultParams)
  const [isCopySuccessful, setIsCopySuccessful] = useState<boolean>(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const classes = useStyles({ codeBlock, inline, fill })

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
  const copyActionElems = (
    <div className={classes.copyIconContainer} onClick={handleCopy}>
      <FontAwesomeIcon
        size="md"
        className={clsx(classes.copyIcon, isCopySuccessful ? classes.done : classes.copy)}
      >
        {isCopySuccessful ? 'check' : copyIcon}
      </FontAwesomeIcon>
    </div>
  )

  // readOnly is needed in textarea to silence React warning about missing onChange
  return triggerWithChild ? (
    <div onClick={handleCopy}>
      <textarea ref={textAreaRef} value={copyText} className={classes.textArea} readOnly />
      {children}
    </div>
  ) : (
    <div className={clsx(classes.copyContainer, className)}>
      <textarea ref={textAreaRef} value={copyText} className={classes.textArea} readOnly />
      {!!header && (
        <div className={classes.header}>
          <p>{header}</p>
          {!inline && copyActionElems}
        </div>
      )}
      {children}
      {inline && copyActionElems}
    </div>
  )
}

export default CopyToClipboard
