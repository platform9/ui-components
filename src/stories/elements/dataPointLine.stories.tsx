import React from 'react'
import DataPointLine from '../../components/dataPointLine/DataPointLine'
import DataPoint from '../../components/dataPointLine/DataPoint'
import { Meta } from '@storybook/react'

const gradientLineColor = 'linear-gradient(to right, red, orange, yellow, green)'

export const GradientDataPointLine = ({ lineColor = gradientLineColor, arrowColor = 'green' }) => {
  return (
    <DataPointLine lineColor={lineColor} arrowColor={arrowColor}>
      <DataPoint description="0%" percent={0} circleColor="red" />
      <DataPoint description="20%" percent={20} circleColor={'#ff6400'} />
      <DataPoint description="50%" percent={50} circleColor={'#ffd700'} />
      <DataPoint description="80%" percent={80} circleColor={'#73b500'} />
    </DataPointLine>
  )
}

const DataPointLineStory: Meta = {
  title: 'Elements/DataPointLine',
  component: DataPointLine,
}

export default DataPointLineStory
