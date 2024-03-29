/* eslint-disable no-restricted-globals */
import React from 'react'
import { Meta } from '@storybook/react'
import Stepper from '../../components/stepper/Stepper'

const steps = [
  {
    label: 'Select campaign settings',
    content: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    content: 'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    content: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]

export const DefaultStepper = (args) => {
  return <Stepper {...args} activeStep={2} steps={steps} />
}

const StepperStories: Meta = {
  title: 'Elements/Stepper',
  component: Stepper,
}

export default StepperStories
