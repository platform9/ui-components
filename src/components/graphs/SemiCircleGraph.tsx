import React from 'react'
import PieGraph, { PieGraphProps } from './PieGraph'

export default function SemiCircleGraph({ sideLength = 216, ...props }: PieGraphProps) {
  const height = sideLength / 2 + 20
  return (
    <PieGraph {...props} sideLength={sideLength} startAngle={180} endAngle={0} height={height} />
  )
}
