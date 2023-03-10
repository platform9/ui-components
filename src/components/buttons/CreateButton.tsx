import React from 'react'
import Button from 'src/elements/button'
import generateTestId from 'src/utils/test-helpers'

export default function CreateButton({ children, ...rest }) {
  return (
    <Button data-testid={generateTestId(children)} variant="primary" icon="plus" {...rest}>
      {children}
    </Button>
  )
}
