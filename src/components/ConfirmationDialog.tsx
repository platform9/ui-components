import React from 'react'
import Button from '../elements/button'
import Alert from './Alert'
import Modal from '../elements/modal'
import Text from '../elements/Text'

interface IConfirmationDialog {
  loading?: boolean
  open: boolean
  title?: string
  text?: JSX.Element | string
  error?: {
    title?: string
    message?: string
  }
  cancelText?: string
  confirmText?: string
  onCancel?: () => void
  onConfirm?: () => void
  customFooterActions?: JSX.Element
}

class ConfirmationDialog extends React.PureComponent<IConfirmationDialog> {
  handleCancel = () => {
    this.props.onCancel && this.props.onCancel()
  }

  handleConfirm = () => {
    this.props.onConfirm && this.props.onConfirm()
  }

  render() {
    const {
      open,
      error,
      title = 'Are you sure?',
      text = 'Are you sure?',
      cancelText = 'Cancel',
      confirmText = 'Confirm',
      loading,
      customFooterActions,
    } = this.props

    return (
      <Modal
        panel="dialog"
        open={open}
        onClose={this.handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        title={title}
        footer={
          customFooterActions || (
            <>
              <Button onClick={this.handleCancel} variant="secondary">
                {cancelText}
              </Button>
              <Button onClick={this.handleConfirm} variant="primary" loading={loading} autoFocus>
                {confirmText}
              </Button>
            </>
          )
        }
      >
        {!!error && <Alert variant="error" title={error?.title} message={error?.message} />}
        <Text variant="body1" component="div">
          {text}
        </Text>
      </Modal>
    )
  }
}

export default ConfirmationDialog
