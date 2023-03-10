import React, { forwardRef, useCallback } from 'react'
import Text from 'src/elements/Text'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import { useDropzone } from 'react-dropzone'
import FontAwesomeIcon from 'src/components/FontAwesomeIcon'
import withFormContext from 'src/components/validatedForm/withFormContext'

interface Props {
  onChange: (value: any) => void
  imageUpdater?: (value: any) => void
  value?: string
  imageData?: string
  id?: string
  validations?: any[]
  hasError?: boolean
  errorMessage?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  dropzone: {
    padding: 16,
    background: theme.components.card.background,
    border: `1px dashed ${theme.components.card.passiveText}`,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  uploadIcon: {
    color: theme.components.card.passiveText,
  },
  dropzoneText: {
    marginTop: 8,
  },
  imagePreview: {
    maxHeight: 44,
    maxWidth: 48,
  },
  trash: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: theme.components.card.passiveText,
    cursor: 'pointer',
  },
  errorText: {
    color: theme.components.graph.error,
  },
}))

const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return window.btoa(binary)
}

const Warning = ({ children }) => {
  const classes = useStyles({})
  return (
    <Text variant="body1" className={classes.errorText}>
      {children}
    </Text>
  )
}

const ImageDrop: React.ComponentType<Props> = forwardRef<HTMLElement, Props>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { onChange, imageUpdater, value, imageData, hasError, errorMessage } = props

    const classes = useStyles({})
    const clearFile = (e) => {
      e.stopPropagation()
      imageUpdater('')
      onChange({})
    }

    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0]

      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const buffer = reader.result
        const base64 = arrayBufferToBase64(buffer)
        imageUpdater(base64)
        onChange(file)
      }
      reader.readAsArrayBuffer(file)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/jpeg, image/png',
      maxFiles: 1,
    })

    return (
      <div>
        <div className={classes.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <div>
            {imageData && (
              <>
                <FontAwesomeIcon className={classes.trash} onClick={clearFile} solid>
                  trash-alt
                </FontAwesomeIcon>
                <img className={classes.imagePreview} src={`data:image/png;base64,${imageData}`} />
              </>
            )}
            {!imageData && (
              <>
                <FontAwesomeIcon className={classes.uploadIcon} size="2x" solid>
                  file-upload
                </FontAwesomeIcon>
                <div className={classes.dropzoneText}>
                  <Text variant="body2">
                    <b>Drop</b> file here to upload
                  </Text>
                </div>
              </>
            )}
          </div>
        </div>
        {hasError && <Warning>{errorMessage}</Warning>}
      </div>
    )
  },
)

export default withFormContext(ImageDrop) as React.FC<Props>
