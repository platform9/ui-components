import ValidatedForm from 'src/components/validatedForm/ValidatedForm'
import React, { PropsWithChildren, useMemo, useRef } from 'react'
import Modal, { ModalProps } from './Modal'
import Button from '../button'
import useReactRouter from 'use-react-router'

import Progress from 'src/components/progress/Progress'
import Alert from 'src/components/Alert'
import { Route } from 'src/misc/route'

interface BaseModalFormProps extends Omit<ModalProps, 'open'> {
  submitTitle?: string
  onSubmit?: any
  disableSubmit?: boolean
  fieldSetter?: any
  error?: {
    title?: string
    message?: string
  }
  customErrorComponent?: React.ReactNode
  loading?: boolean
  loadingMessage?: string
  submitting?: boolean
  initialValues?: Record<string, unknown>
  withAddonManager?: boolean
  clearOnSubmit?: boolean
}

interface PropsWithOpenRoute extends BaseModalFormProps {
  open?: undefined
  route: Route
}
interface PropsWithOpenFlag extends BaseModalFormProps {
  open: boolean
  route?: undefined
}

// Either route or open is required but not both
type ModalFormProps = PropsWithOpenRoute | PropsWithOpenFlag

export default function ModalForm({
  children,
  onSubmit,
  disableSubmit = false,
  submitTitle = 'Submit',
  fieldSetter = null,
  submitting = false,
  loading = false,
  loadingMessage = 'Loading',
  error,
  customErrorComponent,
  route,
  open,
  withAddonManager,
  initialValues = {},
  ...props
}: PropsWithChildren<ModalFormProps>) {
  const submitFuncRef = useRef(null)
  const { match } = useReactRouter()

  const setSubmitFuncRef = (handleSubmit) => {
    submitFuncRef.current = { handleSubmit }
  }

  const handleSubmit = () => {
    submitFuncRef.current.handleSubmit()
  }

  const toOpen = useMemo(() => (route ? route.pattern.match(match.url) : open), [match.url, open])

  return (
    <Modal
      open={toOpen}
      footer={
        <>
          <Button variant="secondary" onClick={props.onClose} disabled={submitting}>
            Cancel
          </Button>
          {onSubmit && (
            <Button onClick={handleSubmit} loading={submitting} disabled={disableSubmit}>
              {submitTitle}
            </Button>
          )}
        </>
      }
      {...props}
    >
      {!!error && <Alert variant="error" title={error?.title} message={error?.message} />}
      {customErrorComponent && customErrorComponent}
      <Progress loading={loading} message={loadingMessage} renderContentOnMount={!!toOpen}>
        {/* On EditGroupPage, even though still loading, initialValues were populated
          Is adding this conditional better, or would reading updates to initialValues
          be better? */}
        {!loading && (
          <ValidatedForm
            onSubmit={onSubmit}
            triggerSubmit={setSubmitFuncRef}
            elevated={false}
            fieldSetter={fieldSetter}
            initialValues={initialValues}
            withAddonManager={withAddonManager}
            clearOnSubmit={props.clearOnSubmit}
          >
            {children}
          </ValidatedForm>
        )}
      </Progress>
    </Modal>
  )
}