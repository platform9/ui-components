import { allPass, always, both, complement, cond, is, isEmpty, isNil, test } from 'ramda'
import { isPlainObject, memoize } from '../utils/misc'
import moize from 'moize'
import jsYaml from 'js-yaml'
import { isNilOrEmpty } from '../utils/fp'

export class FieldValidator {
  validate: any
  errorMessage: any
  /**
   * @param validationFn Function
   * @param errorMessage String
   */
  constructor(validationFn, errorMessage) {
    this.validate = validationFn
    this.errorMessage = errorMessage
  }

  withMessage = memoize((message) => new FieldValidator(this.validate, message))
}

// Create a custom inline validator
export const customValidator = (validator, errorMessage = undefined) =>
  new FieldValidator(validator, errorMessage)

const fieldIsUnset = (value) => isNil(value) || isEmpty(value) || value === false
export const hasMinLength = (minLen) => (value) =>
  both(is(String), (val) => val.length >= minLen)(value)
export const hasOneLowerChar = both(is(String), test(/[a-z]/))
export const hasOneUpperChar = both(is(String), test(/[A-Z]/))
export const hasOneNumber = both(is(String), test(/[0-9]/))

export const specialChars = '-+!@#$%^&*()?'
export const hasOneSpecialChar = both(is(String), test(new RegExp(`[${specialChars}]`)))

export const masterNodesLengthErrorMsg = 'You can only have 1, 3 or 5 master nodes'
export const masterNodeLengthValidator = new FieldValidator(
  (nodes) => fieldIsUnset(nodes) || [1, 3, 5].includes(nodes.length),
  masterNodesLengthErrorMsg,
)

export const cloudProviderValidator = new FieldValidator(
  (name) => fieldIsUnset(name) || !/[^a-z0-9.-]/.test(name),
  'Name is invalid, lower case alphanumeric characters, -, and . only',
)

export const namespaceValidator = new FieldValidator(
  (namespace) => fieldIsUnset(namespace) || /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/gi.test(namespace),
  "Namespace is invalid, alphanumeric characters and '-' only",
)

export const emailValidator = new FieldValidator(
  (email) =>
    fieldIsUnset(email) ||
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      email,
    ),
  'Email is invalid',
)

export const requiredValidator = new FieldValidator(
  (value) => !fieldIsUnset(value),
  'Field is required',
)

export const matchFieldValidator = memoize(
  (id) =>
    new FieldValidator((value, formFields) => value === formFields[id], 'Fields do not match'),
)

export const lengthValidator = (minLength, maxLength) =>
  new FieldValidator(
    (value) =>
      fieldIsUnset(value) ||
      (value.toString().length >= minLength && value.toString().length <= maxLength),
    `Length must be between ${minLength} and ${maxLength}`,
  )

export const minLengthValidator = memoize(
  (minLength) =>
    new FieldValidator(
      (value) => fieldIsUnset(value) || value.toString().length >= minLength,
      `Length must be greater than ${minLength}`,
    ),
)

export const maxLengthValidator = memoize(
  (maxLength) =>
    new FieldValidator(
      (value) => fieldIsUnset(value) || value.toString().length <= maxLength,
      `Length must be less than ${maxLength}`,
    ),
)

export const minValueValidator = memoize(
  (min) =>
    new FieldValidator(
      (value) => fieldIsUnset(value) || Number(value) >= min,
      `Value must be greater than or equal to ${min}`,
    ),
)

export const rangeValueValidator = memoize(
  (min, max) =>
    new FieldValidator(
      (value) => fieldIsUnset(value) || (Number(value) >= min && Number(value) <= max),
      `Value must be between ${min} and ${max}`,
    ),
)

export const maxValueValidator = memoize(
  (max) =>
    new FieldValidator(
      (value) => fieldIsUnset(value) || Number(value) <= max,
      `Value must be less than or equal to ${max}`,
    ),
)

export const passwordValidator = new FieldValidator(
  (value) =>
    fieldIsUnset(value) ||
    allPass([hasMinLength(8), hasOneLowerChar, hasOneUpperChar, hasOneNumber, hasOneSpecialChar])(
      value,
    ),
  // Show a different error message depending on the validation error
  (value) =>
    cond([
      [complement(hasMinLength(8)), always('Password must be at least 8 characters long')],
      [complement(hasOneLowerChar), always('Password must contain at least one lowercase letter')],
      [complement(hasOneUpperChar), always('Password must contain at least one uppercase letter')],
      [complement(hasOneNumber), always('Password must contain at least one number')],
      [
        complement(hasOneSpecialChar),
        always(
          `Password must contain at least one special character, valid characters: "${specialChars}"`,
        ),
      ],
    ])(value),
)

export const colorHexValidator = new FieldValidator(
  (hex) => fieldIsUnset(hex) || /^#[a-f0-9]{6}$/i.test(hex),
  'Color is invalid',
)

export const spotMaxPriceValidator = new FieldValidator(
  (price) => fieldIsUnset(price) || parseFloat(price) > 0.001,
  'Minimum value is 0.001',
)

export const validators = {
  email: emailValidator,
  password: passwordValidator,
  required: requiredValidator,
  matchField: matchFieldValidator,
  length: lengthValidator,
  minLength: minLengthValidator,
  maxLength: maxLengthValidator,
  minValue: minValueValidator,
  maxValue: maxValueValidator,
  rangeValue: rangeValueValidator,
}

export const parseValidator = (key, spec) => {
  if (!validators.hasOwnProperty(key)) {
    if (spec instanceof FieldValidator) {
      return spec
    }
    // Custom validator
    if (typeof spec === 'function') {
      return customValidator(spec)
    }
    throw new Error(`Validator with key ${key} does not exist`)
  }
  const validator = validators[key]
  if (spec === true) {
    return validator
  }
  if (isPlainObject(spec)) {
    const { params, message } = spec
    const validatorWithParams = params ? validator(...params) : validator
    if (message) {
      return validatorWithParams.withMessage(message)
    }
    return validatorWithParams
  }
  if (typeof validator === 'function') {
    return validator(...(Array.isArray(spec) ? spec : [spec]))
  }
}

const moizedYamlLoad = moize(jsYaml.load, {
  maxSize: 10,
})

export const yamlValidator = new FieldValidator(
  (yaml) => {
    try {
      if (isNilOrEmpty(yaml)) return true
      const body = moizedYamlLoad(yaml)
      if (typeof body === 'string' || body === undefined || body === null) {
        return false
      }
      return true
    } catch (err) {
      return false
    }
  },
  (yaml) => {
    try {
      moizedYamlLoad(yaml)
    } catch (err) {
      return err?.message ? err.message : 'Provided YAML code is invalid'
    }
    return 'Provided YAML code is invalid'
  },
)

export const jsonValidator = new FieldValidator(
  (json) => {
    try {
      const parseableString = json.replace(/[^\S\r\n]/g, ' ')
      JSON.parse(parseableString)
      return true
    } catch (err) {
      return false
    }
  },
  (json) => {
    try {
      const parseableString = json.replace(/[^\S\r\n]/g, ' ')
      JSON.parse(parseableString)
    } catch (err) {
      return err?.toString() || 'Provided JSON code is invalid'
    }
    return 'Provided JSON code is invalid'
  },
)
