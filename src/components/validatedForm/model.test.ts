import type { ValidatedFormProps } from './model'

describe('validatedForm/model', () => {
  it('exports ValidatedFormProps type', () => {
    const props: ValidatedFormProps = {
      id: 'my-form',
      validations: [],
      required: true,
      initialValues: { a: 1 },
    }

    expect(props.id).toBe('my-form')
    expect(props.required).toBe(true)
  })
})
