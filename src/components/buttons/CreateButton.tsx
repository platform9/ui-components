import React from 'react'
import Button from '../../elements/button'
import generateTestId from '../../utils/test-helpers'

export default function CreateButton({ children, ...rest }) {
  return (
    <Button data-testid={generateTestId(children)} variant="primary" icon="plus" {...rest}>
      {children}
    </Button>
  )
}
