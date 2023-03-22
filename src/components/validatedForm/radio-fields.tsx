import React, { FC, useCallback } from 'react'
import Radio from '../../elements/input/Radio'
import { makeStyles } from '@material-ui/styles'
import { withInfoTooltip } from '../../components/InfoTooltip'
import { compose } from '../../utils/fp'
import withFormContext from '../../components/validatedForm/withFormContext'
import { ValidatedFormProps } from './model'
import generateTestId from '../../utils/test-helpers'
import Text from '../../elements/Text'
import Theme from '../../theme-manager/themes/model'
export enum Orientation {
  Row = 'row',
  Column = 'column',
}
interface StyleProps {
  orientation: Orientation
}
const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  radioFieldsContainer: {
    display: 'grid',
    gridAutoFlow: ({ orientation }: StyleProps) => orientation,
    gridAutoColumns: 'max-content',
    gridAutoRows: 'minmax(min-content, 50px)',
    alignItems: 'center',
    gridGap: theme.spacing(1),
  },
  error: {
    color: theme.components.graph.error,
  },
}))
export interface OptionType {
  value: string | number
  label: string
  info?: string
  infoPlacement?: string
  disabled?: boolean
  extraContent?: React.ReactNode
}
interface FormProps {
  id: string
  value: string
  options: OptionType[]
  info?: string
  title?: string
  hasError?: boolean
  orientation?: Orientation
  errorMessage?: string
  onChange: (value: OptionType['value']) => void
  disabled?: boolean
  className?: string
}
interface Props extends FormProps, ValidatedFormProps {}

const RadioFields: FC<Props> = (props) => {
  const {
    value,
    title,
    hasError,
    onChange,
    errorMessage,
    options,
    className,
    orientation = Orientation.Column,
  } = props
  const classes = useStyles({ orientation })
  const handleChange = useCallback(
    (radioValue: OptionType['value']) => () => {
      if (onChange) {
        onChange(radioValue)
      }
    },
    [onChange],
  )

  return (
    <div>
      {title && <Text variant="caption1">{title}</Text>}
      <div
        className={className || classes.radioFieldsContainer}
        data-testid={generateTestId('radio', 'form', 'label')}
      >
        {options.map(
          ({ label, value: optionValue, info, infoPlacement, disabled = false, extraContent }) => (
            <div key={optionValue}>
              <Radio
                className={classes.radio}
                textWeight="light"
                data-testid={generateTestId(optionValue)}
                data-testvalue={optionValue}
                label={label}
                info={info}
                checked={optionValue === value}
                onChange={handleChange(optionValue)}
                disabled={props.disabled || disabled}
              />
              {extraContent}
            </div>
          ),
        )}
      </div>
      {errorMessage && (
        <Text variant="caption2" className={classes.error}>
          {errorMessage}
        </Text>
      )}
    </div>
  )
}

export default compose(
  withInfoTooltip, // This HoC causes unnecessary re-renders if declared after withFormContext
  withFormContext,
)(RadioFields) as FC<FormProps>
