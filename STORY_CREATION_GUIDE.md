# Storybook Creation Guide

This guide outlines the best practices for creating new stories in this codebase, based on the reference implementation in `src/stories/elements/button.stories.tsx`.

## Core Principles

1.  **CSF 3.0 Format**: Use the Component Story Format (CSF) 3.0 with TypeScript (`Meta` and `StoryObj`).
2.  **Explicit ArgTypes**: Define `argTypes` thoroughly to populate the Storybook controls panel and documentation tables.
3.  **Base Arguments**: Define a `baseArgs` object to avoid repetition across stories.
4.  **Gallery Pattern**: Include a `Gallery` story that visually renders multiple states or variations at once (useful for visual regression testing).
5.  **Interactive Controls**: Ensure `control`, `description`, and `defaultValue` are set for props to make the UI interactive.

## Template

Copy this template when creating a new story file (e.g., `src/stories/elements/MyComponent.stories.tsx`).

```tsx
import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

// Import the component
import MyComponent from '../../elements/MyComponent'
// Import container helpers if needed
import { Column, Row, ThemedContainer } from '../containers'

// 1. Define metadata and ArgTypes
const meta: Meta<typeof MyComponent> = {
  title: 'Elements/MyComponent', // Naming convention: 'Elements/Name' or 'Components/Name'
  component: MyComponent,
  // Detailed configuration for controls and docs
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The primary text content',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disables user interaction',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
}

export default meta

type Story = StoryObj<typeof MyComponent>

// 2. Define Base Args (Common defaults)
const baseArgs = {
  label: 'Default Text',
  variant: 'primary',
  isDisabled: false,
}

// 3. Individual Stories
export const Primary: Story = {
  args: {
    ...baseArgs,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    ...baseArgs,
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    ...baseArgs,
    isDisabled: true,
  },
}

// 4. Gallery Story (Optional but Recommended)
// Useful for seeing many states at once without clicking controls.
const VARIANTS = ['primary', 'secondary', 'tertiary']

export const Gallery: Story = {
  args: {
    ...baseArgs,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: '16px' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
            <strong>{variant}: </strong>
            <MyComponent {...args} variant={variant} />
        </div>
      ))}
      <div>
        <strong>Disabled: </strong>
        <MyComponent {...args} isDisabled={true} />
      </div>
    </div>
  ),
}
```

## Checklist for High-Quality Stories

- [ ] **Component Analysis**: Did you read the component source code to identify all props, variants, and conditional rendering states?
- [ ] **Title**: Does the title match the folder structure (e.g., `Elements/Card`)?
- [ ] **Descriptions**: Did you add a `description` string to every `argType`? This populates the "Docs" tab.
- [ ] **Controls**: Are the controls correct? (e.g., use `select` or `radio` for enums, `boolean` for flags).
- [ ] **Actions**: Are event handlers like `onClick`, `onChange`, `onClose` mapped to `action: 'event-name'`?
- [ ] **Clean Code**: Are imports organized? Is unused code removed?
- [ ] **Clean Code**: Are imports organized? Is unused code removed?
