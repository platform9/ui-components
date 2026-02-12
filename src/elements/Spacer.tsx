import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import React from 'react'

interface SpacerProps {
  className?: string
  height?: number
}

const StyledSpacer = styled('div')<{ height: number }>(({ height }) => ({
  height,
}))

export default function Spacer({ className, height = 16 }: SpacerProps) {
  return <StyledSpacer height={height} className={className} />
}
