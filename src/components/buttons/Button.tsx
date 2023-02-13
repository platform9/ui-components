import React from 'react'

// TEMP component for testing

export interface ButtonProps {
  label: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({
  onClick = () => alert('clicked'),
  label = 'Click Me',
}: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  )
}
