import React from 'react'
import Step from './Step'
import CircleStepIcon from './CircleStepIcon'
import { TextVariant } from '../../elements/Text'

interface StepperProps {
  activeStep: number
  steps: StepDetails[]

  // Customizations
  className?: string
  lineColor?: string
  labelTextVariant?: TextVariant
}

interface StepDetails {
  label: string
  content?: string | JSX.Element
  stepIcon?: JSX.Element
}

export default function Stepper({
  activeStep,
  steps,
  className,
  lineColor,
  labelTextVariant,
}: StepperProps) {
  const numSteps = steps.length
  return (
    <div>
      {steps.map(({ label, content, stepIcon }, idx) => {
        const stepNumber = idx + 1
        const isActiveStep = activeStep === stepNumber
        const isCompleted = stepNumber < activeStep

        return (
          <Step
            key={label}
            className={className}
            label={label}
            content={content}
            stepIcon={
              stepIcon ? (
                stepIcon
              ) : (
                <CircleStepIcon
                  stepNumber={stepNumber}
                  icon={isCompleted ? 'check' : null}
                  inactiveStep={!isActiveStep && !isCompleted}
                />
              )
            }
            isLastStep={idx === numSteps - 1}
            lineColor={lineColor}
            labelTextVariant={labelTextVariant}
          />
        )
      })}
    </div>
  )
}
