import React from 'react'
import { propSatisfies } from 'ramda'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import MenuItem from 'src/elements/menu/MenuItem'
import Alert from 'src/components/Alert'

import {
  hasOneSpecialChar,
  hasOneNumber,
  hasOneUpperChar,
  hasOneLowerChar,
  hasMinLength,
} from 'src/utils/fieldValidators'

interface IValidator {
  displayText: string
  validator: (value: string | number) => boolean
}

const passwordValidatorList: IValidator[] = [
  {
    displayText: 'At least 8 characters long',
    validator: hasMinLength(8),
  },
  {
    displayText: '1 Lowercase letter',
    validator: hasOneLowerChar,
  },
  {
    displayText: '1 Uppercase letter',
    validator: hasOneUpperChar,
  },
  {
    displayText: '1 Number',
    validator: hasOneNumber,
  },
  {
    displayText: '1 Special character - !@#$%^&*()?',
    validator: hasOneSpecialChar,
  },
]

export default function PasswordValidationDisplay({ values }) {
  const classes = useStyles({})
  return (
    <Alert title="Password must contain the following:">
      <ul className={classes.validationList}>
        {passwordValidatorList.map((record: IValidator) => (
          <MenuItem
            className={classes.validationItem}
            key={record.displayText}
            icon={propSatisfies(record.validator, 'newPassword', values) ? 'check' : 'times'}
            readonly
          >
            {record.displayText}
          </MenuItem>
        ))}
      </ul>
    </Alert>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  validationList: {
    margin: 0,
    padding: 0,
    display: 'grid',
    gap: 6,
  },
  validationItem: {
    lineHeight: '20px',
    minHeight: 'unset',
    gap: 8,
  },
}))
