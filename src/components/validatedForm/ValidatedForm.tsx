import { withStyles } from '@material-ui/styles'
import { assocPathStr, dissocPathStr, pathEqStr, pathStr } from '../../utils/fp'
import clsx from 'clsx'
import FormFieldSection from '../../components/validatedForm/FormFieldSection'
import { parseValidator } from '../../utils/fieldValidators'
import { assocPath, dissocPath, identity, pipe, toPairs } from 'ramda'
import React, { ComponentType, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { memoize } from '../../utils/misc'
import ValidatedFormDebug from './ValidatedFormDebug'

export const ValidatedFormContext = React.createContext<any>({})

export const ValidatedFormConsumer = ValidatedFormContext.Consumer
export const ValidatedFormProvider = ValidatedFormContext.Provider

interface Props {
  clearOnSubmit?: boolean
  debug?: boolean
  initialValues?: any
  onSubmit?: any
  triggerSubmit?: any
  showErrorsOnBlur?: boolean
  maxWidth?: number
  title?: string
  link?: React.ReactNode
  topContent?: React.ReactNode
  formActions?: React.ReactNode
  inputsWidth?: number
  elevated?: boolean
  afterSubmit?: any
  classes?: any
  className?: string
  id?: string
  children?: React.ReactNode | ((props: any) => any)
  fieldSetter?: any

  // If withAddonManager is set to true, ClusterAddonManager and AddonDetailCards components must be passed
  // in a props
  withAddonManager?: boolean
  ClusterAddonManager?: ComponentType<any>
  AddonDetailCards?: ComponentType<any>
}

// TODO: Convert ValidatedForm to a functional component so we can use makeStylesWithTheme
// Right now, our custom theme is not injected into the styles fn

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
    marginBottom: '8px',
    // marginBottom: theme.spacing(1),
    '& .MuiFormControl-root.validatedFormInput': {
      width: '100%',
      maxWidth: '400px',
      marginTop: '12px',
      // marginTop: theme.spacing(1.5),
      marginBottom: '12px',
      // marginBottom: theme.spacing(1.5),
    },
    '& .tooltip-container': {
      maxWidth: '400px',
    },
  },
  formActions: {
    display: 'flex',
    marginLeft: '16px',
    // marginLeft: theme.spacing(2),
  },
})

/**
 * ValidatedForm is a HOC wrapper for forms.  The child components define the
 * data value schema and the validations.
 */
@withRouter
// @ts-ignore
@withStyles(styles)
class ValidatedForm extends PureComponent<Props, any> {
  constructor(props) {
    super(props)
    if (props.triggerSubmit) {
      props.triggerSubmit(this.handleSubmit)
    }
    if (props.fieldSetter) {
      props.fieldSetter(this.setFieldValue)
    }
  }

  /**
   * This stores the specification of the field, to be used for validation down the line.
   * This function will be called by the child components when they are initialized.
   */
  defineField = memoize((field) => (spec) => {
    this.setState(
      // Store the fields in a plain key-value map to be able to iterate over
      // them easily when performing the validations
      assocPath(['fields', field], spec),
      () => {
        if (this.state.showingErrors) {
          this.validateField(field)()
        }
      },
    )
  })

  removeField = (field) => {
    this.setState(pipe(dissocPath(['fields', field]), dissocPathStr(`errors.${field}`)))
  }

  setValues = (values) => {
    this.setState(
      (state) => {
        return { values: { ...state.values, ...values } }
      },
      () => {
        if (this.state.showingErrors || this.props.showErrorsOnBlur) {
          this.validateForm()
        }
      },
    )
  }

  /**
   * Child components invoke this from their 'onChange' (or equivalent).
   * Note: many components use event.target.value, but we only need value here.
   * Note: values can be passed up to parent component by supplying a setContext function prop
   */
  setFieldValue = memoize((field) => {
    const valuePath = `values.${field}`
    const hasErrPath = `errors.${field}.hasError`
    return (value, validateAll) => {
      this.setState(assocPathStr(valuePath, value), () => {
        if (
          this.state.showingErrors ||
          (this.props.showErrorsOnBlur && pathEqStr(hasErrPath, true, this.state))
        ) {
          if (validateAll) {
            this.validateForm()
          } else {
            this.validateField(field)()
          }
        }
      })
    }
  })

  /**
   * This can be used to update a field value using an updaterFn instead of assigning a value directly
   */
  updateFieldValue = memoize((field) => {
    const valuePath = `values.${field}`
    const hasErrPath = `errors.${field}.hasError`

    return (updaterFn, validateAll) => {
      this.setState(
        (state) => assocPathStr(valuePath, updaterFn(pathStr(valuePath, state)), state),
        () => {
          if (
            this.state.showingErrors ||
            (this.props.showErrorsOnBlur && pathEqStr(hasErrPath, true, this.state))
          ) {
            if (validateAll) {
              this.validateForm()
            } else {
              this.validateField(field)()
            }
          }
        },
      )
    }
  })

  getFieldValue = memoize((field) => (getterFn = identity) => {
    return getterFn(pathStr(`values.${field}`, this.state))
  })

  /**
   *  Validate the field and return false on error, true otherwise
   */
  validateField = memoize((fieldPath) => () => {
    const { fields, values } = this.state
    // Skip validation if the field has not been defined yet
    if (!fields.hasOwnProperty(fieldPath)) {
      return true
    }
    const { validations } = fields[fieldPath]
    const fieldValue = pathStr(fieldPath, values)

    const validationsArray = Array.isArray(validations)
      ? validations
      : toPairs(validations).map(([validationKey, validationSpec]) =>
          parseValidator(validationKey, validationSpec),
        )
    const failedValidation = validationsArray.find(
      (validator) => !validator.validate(fieldValue, values, fieldPath),
    )
    if (failedValidation) {
      this.showFieldErrors(
        fieldPath,
        typeof failedValidation.errorMessage === 'function'
          ? failedValidation.errorMessage(fieldValue, values, fieldPath)
          : failedValidation.errorMessage,
      )
      return false
    }
    this.clearFieldErrors(fieldPath)
    return true
  })

  /**
   * Store the error state of the field, which will be accessed by child components
   */
  showFieldErrors = (field, errorMessage) => {
    this.setState(
      assocPathStr(`errors.${field}`, {
        errorMessage,
        hasError: true,
      }),
    )
  }

  clearFieldErrors = (field) => {
    this.setState(assocPathStr(`errors.${field}`, { hasError: false }))
  }

  state = {
    initialValues: { ...(this.props.initialValues || {}) },
    values: { ...(this.props.initialValues || {}) },
    fields: {},
    errors: {},
    setFieldValue: this.setFieldValue,
    setValues: this.setValues,
    updateFieldValue: this.updateFieldValue,
    getFieldValue: this.getFieldValue,
    defineField: this.defineField,
    removeField: this.removeField,
    validateField: this.validateField,
    showingErrors: false,
    showErrorsOnBlur: this.props.showErrorsOnBlur,
  }

  /**
   * Validate all fields and return false if any error is found, true otherwise
   */
  validateForm = () => {
    const { fields } = this.state
    const results = Object.keys(fields).map((fieldPath) => this.validateField(fieldPath)())
    return !results.includes(false)
  }

  handleSubmit = async (event) => {
    const { clearOnSubmit = false, onSubmit } = this.props
    const { initialValues, values, showingErrors, fields } = this.state

    if (event) {
      event.preventDefault()
    }
    if (!this.validateForm()) {
      if (!showingErrors) {
        this.setState((prevState) => ({ ...prevState, showingErrors: true }))
      }
      return false
    }
    if (onSubmit) {
      // Only send the values from the fields defined in the form
      const formDefinedValues = Object.keys(fields).reduce(
        (acc, fieldPath) => assocPathStr(fieldPath, pathStr(fieldPath, values), acc),
        {},
      )
      await onSubmit(formDefinedValues)
    }

    if (clearOnSubmit) {
      this.setState({ values: initialValues })
    }
    return true
  }

  render() {
    const {
      children,
      classes,
      debug = false,
      id,
      title,
      link,
      className,
      topContent,
      formActions,
      elevated = true,
      withAddonManager,
      ClusterAddonManager,
      AddonDetailCards,
    } = this.props
    const inputs = children instanceof Function ? children(this.state) : children
    const { values } = this.state
    const contents = (
      <>
        {debug && <ValidatedFormDebug />}
        {!elevated ? (
          inputs
        ) : (
          <FormFieldSection title={title} link={link} className={className}>
            {topContent}
            {inputs}
          </FormFieldSection>
        )}
      </>
    )
    return (
      <form onSubmit={this.handleSubmit} className={classes.root} id={id}>
        <ValidatedFormProvider value={this.state}>
          {withAddonManager && ClusterAddonManager && AddonDetailCards ? (
            <ClusterAddonManager>
              {contents}
              <AddonDetailCards
                values={values}
                setValues={this.setValues}
                setFieldValue={this.setFieldValue}
                defineField={this.defineField}
              />
            </ClusterAddonManager>
          ) : (
            contents
          )}
        </ValidatedFormProvider>
        {formActions ? (
          <div className={clsx('formActions', classes.formActions)}>{formActions}</div>
        ) : null}
      </form>
    )
  }
}

export default ValidatedForm
