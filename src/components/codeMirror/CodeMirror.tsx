import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { createRef, useCallback, useEffect, useState } from 'react'
import { Controlled as BaseCodeMirror, ICodeMirror } from 'react-codemirror2'
import CopyButton from 'src/elements/button/CopyButton'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import Progress from '../../components/progress/Progress'
import { ErrorMessage } from '../../components/validatedForm/ErrorMessage'
import Text from '../../elements/Text'
import Button from '../../elements/button'
import { ButtonProps } from '../../elements/button/Button'
import Card from '../../elements/card'
import CardHeader from '../../elements/card/CardHeader'
import { topLeft, topRight } from '../../elements/menu/defaults'
import Tooltip from '../../elements/tooltip'
import Theme from '../../theme-manager/themes/model'
import SearchBar from '../SearchBar'
import CodeMirrorModal from './CodeMirrorModal'

require('codemirror/mode/yaml/yaml')
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/xml/xml')
require('codemirror/addon/display/autorefresh')
require('codemirror/addon/search/searchcursor')
require('codemirror/addon/mode/simple')

const defaultOptions = {
  lineNumbers: true,
  mode: 'yaml',
  theme: 'default',
  autoRefresh: true,
  extraKeys: {
    Tab: (cm) => {
      const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
      cm.replaceSelection(spaces)
    },
    'Alt-F': 'findPersistent',
  },
  fixedGutter: false,
}

export type AlignVertical = 'top' | 'middle' | 'bottom'
export type AlignHorizontal = 'left' | 'middle' | 'right'

export interface CodeMirrorActionButtonProps extends Omit<ButtonProps, 'children'> {
  // Info tooltip props
  classes?: any
  align?: any
  offset?: any
  info?: string | React.ReactNode
  infoPlacement?: any
}

export interface Props extends ICodeMirror {
  id?: string
  variant?: string
  label?: string | React.ReactNode
  value?: string
  hasError?: boolean
  errorMessage?: string
  onChange?: (val) => void
  options?: any
  info?: string
  align?: { vertical: AlignVertical; horizontal: AlignHorizontal }
  className?: string
  showSearchBar?: boolean
  extraActions?: React.ReactElement
  loading?: boolean
  showCopyButton?: boolean
  showDownloadButton?: boolean
  downloadFileName?: string
  showExpandButton?: boolean
  showCollapseButton?: boolean
  collapseYaml?: boolean
  maxHeight?: number
  downloadButtonProps?: CodeMirrorActionButtonProps
  copyButtonProps?: CodeMirrorActionButtonProps
}

// These styles are to match CodeMirrors. We need to find a good way
// to re-define their styles so we can use common variables

export default function CodeMirror({
  id,
  variant,
  label,
  value,
  hasError,
  errorMessage,
  onChange,
  options = {},
  info,
  align = topRight.align,
  className,
  showSearchBar = false,
  extraActions = null,
  loading = false,
  showCopyButton = false,
  showDownloadButton = false,
  downloadFileName = '',
  showExpandButton = false,
  showCollapseButton = false,
  maxHeight = 350,
  collapseYaml = false,
  downloadButtonProps = {},
  copyButtonProps = {},
  ...restProps
}: Props) {
  const codeMirrorInput = createRef()
  const [height, setHeight] = useState(maxHeight)
  const classes = useStyles({ variant, height })
  const [searchTerm, setSearchTerm] = React.useState('')
  const [editor, setEditor] = React.useState(null)

  const [isModalOpen, setModalOpen] = useState(false)
  const [showCode, setShowCode] = useState(!collapseYaml)

  useEffect(() => {
    setHeight(showCode ? maxHeight : 0)
  }, [showCode, collapseYaml])

  const handleChange = useCallback(
    (editor, data, value) => {
      if (onChange) {
        onChange(value)
      }
    },
    [onChange],
  )

  const combinedOptions = { ...defaultOptions, ...options }

  const search = useCallback(() => {
    if (!editor) return
    const query = new RegExp(searchTerm, 'gi')

    const cursor = editor.getSearchCursor(query)
    let firstMatchLineNumber = null
    while (cursor.findNext()) {
      editor.markText(cursor.from(), cursor.to(), { className: classes.highlight })
      if (!firstMatchLineNumber) {
        firstMatchLineNumber = cursor.pos.from.line
      }
    }
    if (firstMatchLineNumber) {
      editor.scrollIntoView(firstMatchLineNumber)
    }
  }, [editor, searchTerm])

  const clearMarks = useCallback(() => {
    if (!editor) return
    editor.doc.getAllMarks().forEach((marker) => marker.clear())
  }, [editor])

  useEffect(() => {
    clearMarks()
    search()
  }, [searchTerm])

  const downloadFile = () => {
    const element = document.createElement('a')
    const file = new Blob([value], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(file)
    element.download = downloadFileName
    document.body.appendChild(element)
    element.click()
  }

  const toggleYamlCardView = useCallback(() => setShowCode(!showCode), [showCode, setShowCode])

  const renderActionsBar =
    showSearchBar ||
    showCopyButton ||
    showDownloadButton ||
    extraActions ||
    showExpandButton ||
    showCollapseButton

  // @ts-ignore
  return (
    <Card withCustomBody className={classes.card}>
      {(!!label || !!renderActionsBar) && (
        <CardHeader className={classes.cardHeader}>
          <div className={classes.labelContainer}>
            {showCollapseButton && (
              <Tooltip message="Collapse" align={topRight.align}>
                <FontAwesomeIcon
                  regular
                  size="md"
                  className={classes.icon}
                  onClick={toggleYamlCardView}
                >
                  {showCode ? 'chevron-down' : 'chevron-right'}
                </FontAwesomeIcon>
              </Tooltip>
            )}
            {label && (
              <Text className="code-mirror-header" variant="subtitle2">
                {label}
              </Text>
            )}
          </div>
          {renderActionsBar && (
            <div className={`CodeMirror-actionsBar ${classes.actionsBar}`}>
              {showSearchBar && (
                <SearchBar
                  className={classes.searchBar}
                  searchTerm={searchTerm}
                  onSearchChange={(value) => setSearchTerm(value)}
                />
              )}
              {showCopyButton && <CopyButton copyText={value} disabled={!value} />}
              {showDownloadButton && (
                <Button
                  type="button"
                  onClick={downloadFile}
                  icon="download"
                  {...downloadButtonProps}
                >
                  Download
                </Button>
              )}
              {showExpandButton && (
                <Tooltip message="Expand" align={topLeft.align}>
                  <FontAwesomeIcon
                    regular
                    className={classes.icon}
                    onClick={() => setModalOpen(true)}
                  >
                    expand
                  </FontAwesomeIcon>
                </Tooltip>
              )}
              {isModalOpen && (
                <CodeMirrorModal
                  label={label}
                  value={value}
                  open={isModalOpen}
                  onClose={() => setModalOpen(false)}
                />
              )}
              {extraActions && extraActions}
            </div>
          )}
        </CardHeader>
      )}
      <Progress loading={loading} renderContentOnMount overlay className={classes.progressOverlay}>
        <BaseCodeMirror
          {...restProps}
          /*
          // @ts-ignore */
          ref={codeMirrorInput}
          className={clsx(classes.baseCodeMirror, className)}
          onBeforeChange={handleChange}
          value={value}
          options={combinedOptions}
          editorDidMount={(editor) => setEditor(editor)}
          gutters={classes.gutters}
        />
        <ErrorMessage className={classes.errorMsg}>{errorMessage}</ErrorMessage>
      </Progress>
    </Card>
  )
}

const useStyles = makeStyles<Theme, { variant?: string; height?: number }>((theme) => ({
  progressOverlay: {
    maxHeight: '50%',
    boxSizing: 'border-box',
  },
  gutters: {
    width: 64,
  },
  card: {
    '& .progress-root': {
      height: 'max-content',
      minHeight: '0',
    },
  },
  cardHeader: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-between',
    gridAutoFlow: 'column',
    padding: '10px 16px 10px 24px',
  },
  icon: { width: 20 },
  labelContainer: { display: 'flex' },
  actionsBar: {
    display: 'grid',
    gap: theme.spacing(2),
    alignItems: 'center',
    gridAutoFlow: 'column',
  },
  searchBar: {
    gap: 0,
  },
  highlight: {
    backgroundColor: theme.components.graph.fadedWarning,
  },
  baseCodeMirror: {
    '& .CodeMirror': {
      fontFamily: 'SpaceMono',
      fontWeight: 'normal',
      height: 1000, // scrolling doesn't work unless you specify px height?
      maxHeight: ({ height }) => height,
      color: theme.components.card.text,
      direction: 'ltr',
      caretColor: theme.components.card.text,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      fontSize: 14,
      transition: ' max-height 0.3s ease',
    },
    '& .CodeMirror *': { caretColor: `${theme.components.card.text} !important` },
    '& .CodeMirror-lines': { padding: '16px 0', cursor: 'text', minHeight: '1px' },
    '& .CodeMirror pre': {
      padding: '0',
      MozBorderRadius: '0',
      WebkitBorderRadius: '0',
      borderRadius: '0',
      borderWidth: '0',
      background: 'transparent',
      fontFamily: 'SpaceMono',
      fontWeight: 'normal',
      fontSize: 14,
      margin: '0',
      whiteSpace: 'pre',
      wordWrap: 'normal',
      lineHeight: '24px',
      color: 'inherit',
      zIndex: 2,
      position: 'relative',
      overflow: 'visible',
      WebkitTapHighlightColor: 'transparent',
      WebkitFontVariantLigatures: 'contextual',
      fontVariantLigatures: 'none', // Had to change to fix UX-1918
    },
    '& .CodeMirror-scrollbar-filler, & .CodeMirror-gutter-filler': {
      backgroundColor: 'white',
    },
    '& .CodeMirror-gutters': {
      // borderRight: `2px solid ${theme.components.card.border}`,
      backgroundColor: 'transparent',
      whiteSpace: 'nowrap',
      position: 'absolute',
      left: '0',
      top: '0',
      minHeight: '100%',
      zIndex: 3,
    },
    '& .CodeMirror-linenumber': {
      padding: '0 32px 0 16px',
      minWidth: '20px',
      textAlign: 'right',
      color: theme.components.card.text,
      whiteSpace: 'nowrap',
    },
    '& .CodeMirror-guttermarker': { color: 'black' },
    '& .CodeMirror-guttermarker-subtle': { color: theme.components.typography.passive },
    '& .CodeMirror-cursor': {
      borderLeft: `1px solid ${theme.components.card.text}`,
      borderRight: 'none',
      width: '0',
      position: 'absolute',
      pointerEvents: 'none',
    },
    '& .CodeMirror div.CodeMirror-secondarycursor': {
      borderLeft: '1px solid silver',
    },
    '& .cm-fat-cursor .CodeMirror-cursor': {
      width: 'auto',
      border: '0 !important',
      background: theme.components.card.text,
    },
    '& .cm-fat-cursor div.CodeMirror-cursors': { zIndex: 1 },
    '& .cm-fat-cursor-mark': {
      backgroundColor: 'rgba(20, 255, 20, 0.5)',
      WebkitAnimation: 'blink 1.06s steps(1) infinite',
      MozAnimation: 'blink 1.06s steps(1) infinite',
      animation: 'blink 1.06s steps(1) infinite',
    },
    '& .cm-animate-fat-cursor': {
      width: 'auto',
      border: '0',
      WebkitAnimation: 'blink 1.06s steps(1) infinite',
      MozAnimation: 'blink 1.06s steps(1) infinite',
      animation: 'blink 1.06s steps(1) infinite',
      backgroundColor: theme.components.card.text,
    },
    '& @keyframes blink': {
      '0%': {},
      '50%': { backgroundColor: 'transparent' },
      '100%': {},
    },
    '& .cm-tab': { display: 'inline-block', textDecoration: 'inherit' },
    '& .CodeMirror-rulers': {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '-50px',
      bottom: '-20px',
      overflow: 'hidden',
    },
    '& .CodeMirror-ruler': {
      borderLeft: `1px solid ${theme.components.card.border}`,
      visibility: 'hidden',
      top: '0',
      bottom: '0',
      position: 'absolute',
    },

    /*
      Text Colors
    */
    '& .cm-s-default .cm-header, & .cm-s-default .cm-string.cm-property': {
      color: theme.components.code.text,
    },
    '& .cm-s-default .cm-quote': { color: theme.components.card.text },
    '& .cm-negative': { color: theme.components.card.text },
    '& .cm-positive': { color: theme.components.card.text },
    '& .cm-header, & .cm-strong': { fontWeight: 'bold' },
    '& .cm-em': { fontStyle: 'italic' },
    '& .cm-link': { textDecoration: 'underline' },
    '& .cm-strikethrough': { textDecoration: 'line-through' },
    '& .cm-s-default .cm-keyword': { color: theme.components.card.text },
    '& .cm-s-default .cm-atom': { color: theme.components.code.text },
    '& .cm-s-default .cm-number': { color: theme.components.card.text },
    '& .cm-s-default .cm-def': { color: theme.components.card.text },
    '& .cm-s-default .cm-variable-2': { color: theme.components.card.text },
    '& .cm-s-default .cm-variable-3, & .cm-s-default .cm-type': {
      color: theme.components.card.text,
    },
    '& .cm-s-default .cm-comment': { color: theme.components.typography.passive },
    '& .cm-s-default .cm-string': { color: theme.components.card.text },
    '& .cm-s-default .cm-string-2': { color: theme.components.card.text },
    '& .cm-s-default .cm-meta': { color: theme.components.card.text },
    '& .cm-s-default .cm-qualifier': { color: theme.components.card.text },
    '& .cm-s-default .cm-builtin': { color: theme.components.card.text },
    '& .cm-s-default .cm-bracket': { color: theme.components.card.text },
    '& .cm-s-default .cm-tag': { color: theme.components.card.text },
    '& .cm-s-default .cm-attribute': { color: theme.components.card.text },
    '& .cm-s-default .cm-hr': { color: theme.components.card.text },
    '& .cm-s-default .cm-link': { color: theme.components.card.text },
    '& .cm-s-default .cm-error': { color: theme.components.card.text },
    '& .cm-invalidchar': { color: theme.components.card.text },
    '& .CodeMirror-composing': { borderBottom: '2px solid' },
    '& div.CodeMirror span.CodeMirror-matchingbracket': { color: theme.components.card.text },
    '& div.CodeMirror span.CodeMirror-nonmatchingbracket': { color: theme.components.card.text },
    '& .CodeMirror-matchingtag': { background: 'rgba(255, 150, 0, 0.3)' },
    '& .CodeMirror-activeline-background': { background: theme.components.card.activeBackground },
    '& .CodeMirror-scroll': {
      overflow: 'scroll !important',
      marginBottom: '-30px',
      marginRight: '-30px',
      paddingBottom: '30px',
      height: '100%',
      width: '100%',
      outline: 'none',
      position: 'relative',
    },
    '& .CodeMirror-sizer': {
      position: 'relative',
      borderRight: '30px solid transparent',
    },
    '& .CodeMirror-vscrollbar, & .CodeMirror-hscrollbar, & .CodeMirror-scrollbar-filler, & .CodeMirror-gutter-filler':
      {
        position: 'absolute',
        zIndex: 6,
        display: 'none',
      },
    '& .CodeMirror-vscrollbar': {
      right: '0',
      top: '0',
      overflowX: 'hidden',
      overflowY: 'scroll',
    },
    '& .CodeMirror-hscrollbar': {
      bottom: '0',
      left: '0',
      overflowY: 'hidden',
      overflowX: 'scroll',
    },
    '& .CodeMirror-scrollbar-filler': { right: '0', bottom: '0' },
    '& .CodeMirror-gutter-filler': { left: '0', bottom: '0' },
    '& .CodeMirror-gutter': {
      whiteSpace: 'normal',
      height: '100%',
      display: 'inline-block',
      verticalAlign: 'top',
      marginBottom: '-30px',
    },
    '& .CodeMirror-gutter-wrapper': {
      position: 'absolute',
      zIndex: 4,
      background: 'none !important',
      border: 'none !important',
    },
    '& .CodeMirror-gutter-background': {
      position: 'absolute',
      top: '0',
      bottom: '0',
      zIndex: 4,
    },
    '& .CodeMirror-gutter-elt': {
      position: 'absolute',
      cursor: 'default',
      zIndex: 4,
    },
    '& .CodeMirror-gutter-wrapper ::selection': { backgroundColor: 'transparent' },
    '& .CodeMirror-gutter-wrapper ::-moz-selection': {
      backgroundColor: 'transparent',
    },
    '& .CodeMirror-wrap pre': {
      wordWrap: 'break-word',
      whiteSpace: 'pre-wrap',
      wordBreak: 'normal',
    },
    '& .CodeMirror-linebackground': {
      position: 'absolute',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      zIndex: 0,
    },
    '& .CodeMirror-linewidget': {
      position: 'relative',
      zIndex: 2,
      padding: '0.1px',
    },
    '& .CodeMirror-rtl pre': { direction: 'rtl' },
    '& .CodeMirror-code': { outline: 'none' },
    '& .CodeMirror-scroll, & .CodeMirror-sizer, & .CodeMirror-gutter, & .CodeMirror-gutters, & .CodeMirror-linenumber':
      {
        MozBoxSizing: 'content-box',
        boxSizing: 'content-box',
      },
    '& .CodeMirror-measure': {
      position: 'absolute',
      width: '100%',
      height: '0',
      overflow: 'hidden',
      visibility: 'hidden',
    },
    '& .CodeMirror-measure pre': { position: 'static' },
    '& div.CodeMirror-cursors': {
      visibility: 'hidden',
      position: 'relative',
      zIndex: 3,
    },
    '& div.CodeMirror-dragcursors': { visibility: 'visible' },
    '& .CodeMirror-focused div.CodeMirror-cursors': { visibility: 'visible' },
    '& .CodeMirror-selected': { background: theme.components.card.activeBackground },
    '& .CodeMirror-focused .CodeMirror-selected': {
      background: theme.components.card.activeBackground,
    },
    '& .CodeMirror-crosshair': { cursor: 'crosshair' },
    '& .CodeMirror-line::selection, & .CodeMirror-line > span::selection, & .CodeMirror-line > span > span::selection':
      {
        background: theme.components.card.activeBackground,
      },
    '& .CodeMirror-line::-moz-selection, & .CodeMirror-line > span::-moz-selection, & .CodeMirror-line > span > span::-moz-selection':
      {
        background: theme.components.card.activeBackground,
      },
    '& .cm-searching': { backgroundColor: theme.components.graph.fadedWarning },
    '& .cm-force-border': { paddingRight: '0.1px' },
    '& @media print': {
      '& .CodeMirror div.CodeMirror-cursors': { visibility: 'hidden' },
    },
    '& .cm-tab-wrap-hack:after': { content: "''" },
    '& span.CodeMirror-selectedtext': { background: 'none' },
  },
  errorMsg: {
    margin: theme.spacing(2),
  },
}))
