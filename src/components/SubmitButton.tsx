import React, { FC, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'

import Button from 'src/elements/button'
import Theme from 'src/theme-manager/themes/model'
import generateTestId from 'src/utils/test-helpers'

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}))

interface Props {
  className?: string
  form?: any
}

const SubmitButton: FC<PropsWithChildren<Props>> = ({ className, children, form }) => {
  const classes = useStyles({})
  return (
    <Button
      data-testid={generateTestId(children)}
      className={clsx(classes.root, className)}
      type="submit"
      variant="primary"
      size="large"
      form={form}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
