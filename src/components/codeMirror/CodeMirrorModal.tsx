import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Theme from '../../theme-manager/themes/model'
import Modal from '../../elements/modal'
import CodeMirror from './CodeMirror'
import Button from '../../elements/button'

export default function CodeMirrorModal({
  label,
  value,
  open = false,
  onClose,
  showOverlay = true,
  showCopyButton = true,
  showSearchBar = true,
  showDownloadButton = false,
}) {
  const classes = useStyles({})
  return (
    <Modal
      panel="dialog"
      open={open}
      onClose={onClose}
      title={label}
      maxWidth={1000}
      className={classes.modal}
      showOverlay={showOverlay}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </>
      }
    >
      {open && (
        <CodeMirror
          className={classes.codeMirror}
          id={`YamlTemplateBlock-${label}`}
          value={value}
          showCopyButton={showCopyButton}
          showSearchBar={showSearchBar}
          showDownloadButton={showDownloadButton}
          maxHeight={700}
        ></CodeMirror>
      )}
    </Modal>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  modal: {
    '& .modal-body': {
      padding: 0,
      overflow: 'hidden',
    },
  },
  codeMirror: {
    '& .CodeMirror': {
      maxWidth: 1000,
      width: 1000,
    },
  },
}))
