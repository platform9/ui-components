import React, { useContext, useEffect, useCallback, FC, forwardRef, FocusEvent } from 'react'
import PropTypes from 'prop-types'
import { ValidatedFormContext } from 'src/components/validatedForm/ValidatedForm'
import { requiredValidator } from 'src/utils/fieldValidators'
import { isNil } from 'ramda'
import { memoizedObj } from 'src/utils/misc'
import clsx from 'clsx'
import generateTestId from 'src/utils/test-helpers'
import { pathStr, pathStrOr } from 'src/utils/fp'

// @deprecated
export const ValidatedFormInputPropTypes = {
  required: PropTypes.bool,
  validateFormOnChange: PropTypes.bool,
  validations: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  initialValue: PropTypes.any,
}
interface ChildrenFnParams<T> {
  id: string
  values?: Record<string, unknown>
  value?: T
  className?: string
  onBlur?: (event: FocusEvent<any>) => void
  onChange?: (value: T) => void
  // @todo fix this
  getCurrentValue?: <V, C>(getterFn?: (formContext: C) => V) => V
  updateFieldValue?: (value: T) => void
  setFieldValue?: <T>(key: string) => (value: T) => void
  hasError?: boolean
  errorMessage?: string
  required?: boolean
}

export interface ValidatedFormInputProps<T, P> {
  id: string
  className?: string
  value?: T
  initialValue?: T
  required?: boolean
  error?: string
  validateFormOnChange?: boolean
  validations?: any[] | Record<string, any>
  onBlur?: (event: FocusEvent<any>) => void
  onChange?: (value: T) => void
  children: (params: ChildrenFnParams<T> & P) => JSX.Element
}

/**
 * Wrapper for all the inputs that will require some sort of interaction with
 * the ValidatedForm such as validations and text hints on hover
 */
export function ValidatedFormInput<T, P>({
  id,
  className,
  initialValue,
  validateFormOnChange = false,
  value,
  required = false,
  validations = [],
  onBlur,
  onChange,
  children,
  error,
  ...rest
}: ValidatedFormInputProps<T, P> & P) {
  const {
    initialValues,
    values,
    errors,
    setFieldValue,
    updateFieldValue,
    getFieldValue,
    defineField,
    removeField,
    validateField,
    showErrorsOnBlur,
  } = useContext<any>(ValidatedFormContext as any)
  const defineCurrentField = defineField(id)
  const setCurrentFieldValue = setFieldValue(id)
  const updateCurrentFieldValue = updateFieldValue(id)
  const getCurrentFieldValue = getFieldValue(id)
  const validateCurrentField = validateField(id)
  const currentInitialValue =
    initialValue !== undefined
      ? initialValue
      : id !== undefined
      ? pathStr(id, initialValues)
      : undefined
  const currentValue = isNil(value) ? (id !== undefined ? pathStr(id, values) : undefined) : value
  const hasError = pathStrOr(null, `${id}.hasError`, errors)
  const errorMessage = pathStrOr(error, `${id}.errorMessage`, errors)

  useEffect(() => {
    defineCurrentField({
      validations: required
        ? Array.isArray(validations)
          ? [requiredValidator, ...validations]
          : { required: true, ...validations }
        : validations,
    })
    if (currentInitialValue !== undefined) {
      setCurrentFieldValue(currentInitialValue)
    }
  }, [required, memoizedObj(validations)])

  // Remove the field when component unmounts
  useEffect(() => () => removeField(id), [])

  // Notify value changes to the form when the field is controlled
  useEffect(() => {
    if (!isNil(value)) {
      setCurrentFieldValue(value)
    }
  }, [value])

  const handleBlur = useCallback(
    (e) => {
      if (showErrorsOnBlur) {
        validateCurrentField()
      }
      // Leverage the event to the wrapped input
      if (onBlur) {
        onBlur(e)
      }
    },
    [showErrorsOnBlur, validateCurrentField, onBlur],
  )

  const handleChange = useCallback(
    (value) => {
      setCurrentFieldValue(value, validateFormOnChange)
      // Leverage the event to the wrapped input
      if (onChange) {
        onChange(value)
      }
    },
    [setCurrentFieldValue, onChange],
  )
  // @ts-ignore
  const params: PropsWithFormContext<T, P> = {
    ...rest,
    id,
    values,
    className: clsx(className, 'validatedFormInput'),
    onChange: handleChange,
    onBlur: handleBlur,
    value: currentValue,
    getCurrentValue: getCurrentFieldValue,
    updateFieldValue: updateCurrentFieldValue,
    setFieldValue,
    hasError,
    errorMessage,
    required,
  }
  return children(params)
}

export type PropsWithFormContext<T, P> = ChildrenFnParams<T> & P

/**
 * withFormContext provides access to the form context through props.
 *
 * This pattern is needed because React does not provide access to context within
 * lifecycle methods (componentDidMount).
 *
 * See: https://github.com/facebook/react/issues/12397#issuecomment-375501574
 *
 * @param {Inject the form context into this Component through props.} Input
 */
export default function withFormContext<T, P>(Input: FC<P & ChildrenFnParams<T>>) {
  return forwardRef<HTMLElement, Omit<ValidatedFormInputProps<T, P>, 'children'> & P>(
    (props, ref) => (
      <ValidatedFormInput<T, P> {...props}>
        {(inputProps) => (
          <Input
            {...inputProps}
            ref={ref}
            data-testid={generateTestId(inputProps.id, 'list', 'table', 'field')}
          />
        )}
      </ValidatedFormInput>
    ),
  )
}
