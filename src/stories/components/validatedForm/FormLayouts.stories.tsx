import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ValidatedForm from '../../../components/validatedForm/ValidatedForm'
import { FormFieldCard } from '../../../components/validatedForm/FormFieldCard'
import FormFieldSection from '../../../components/validatedForm/FormFieldSection'
import TextField from '../../../components/validatedForm/TextField'
import Text from '../../../elements/Text'
import Button from '../../../elements/button'
import { MemoryRouter } from 'react-router-dom'

const meta: Meta = {
  title: 'Components/ValidatedForm/Layouts',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

const Wrapper = ({ children }) => (
    <ValidatedForm initialValues={{}} onSubmit={() => {}}>
        {children}
    </ValidatedForm>
)

export const Sections: StoryObj = {
    render: () => (
        <Wrapper>
            <FormFieldSection title="Section 1: Basic Info" step={1}>
                <TextField id="f1" label="Field 1" />
                <TextField id="f2" label="Field 2" />
            </FormFieldSection>
            <FormFieldSection title="Section 2: Details" step={2} info="This section has an info tooltip">
                <TextField id="f3" label="Field 3" />
            </FormFieldSection>
        </Wrapper>
    )
}

export const Cards: StoryObj = {
    render: () => (
        <div style={{ backgroundColor: '#f5f5f5', padding: 20 }}>
            <Wrapper>
                <FormFieldCard title="Card 1" step={1} topContent={<Text variant="body2" style={{marginBottom: 16}}>Some description content inside the card.</Text>}>
                    <TextField id="c1" label="Card Field 1" />
                </FormFieldCard>
                <br />
                <FormFieldCard title="Card 2" step={2} link={<Button variant="secondary">Action</Button>}>
                    <TextField id="c2" label="Card Field 2" />
                </FormFieldCard>
            </Wrapper>
        </div>
    )
}
