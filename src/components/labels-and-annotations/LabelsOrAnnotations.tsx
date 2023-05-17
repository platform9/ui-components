import React from 'react'
import { memoize } from '../../utils/misc'
import { LabelProps, AnnotationProps } from './model'
import Badges from '../../elements/badge/Badges'
// import { Taint } from 'app/plugins/infrastructure/components/clusters/capi/configs/model'

const getReadableName = (key, value, _separator, entityType) => {
  const separator = (key && value && (_separator || getDefaultSeparator(entityType))) || ''
  return `${key}${separator}${value}`
}
// const getTaintsText = ({ key, value, effect }: Taint, separator = '=') => {
//   return { text: `${key}${separator}${value}`, effect }
// }

const getDefaultSeparator = memoize((entityType) => (entityType === 'annotations' ? ': ' : '='))

export function Labels({ labels: values, separator, ...props }: LabelProps) {
  if (!values) return null
  const labels = Object.entries(values).map(([key, value]) => {
    const text = getReadableName(key, value, separator, 'labels')
    return { text, tooltipText: text }
  })
  return <Badges values={labels} {...props} entityType="labels" />
}

// export function Taints({ taints: values, ...props }: TaintsProps) {
//   if (!values || !Array.isArray(values)) return null
//   const taints = values.map((taint) => {
//     const { text, effect: additionalText } = getTaintsText(taint)
//     return { text, tooltipText: text, additionalText }
//   })
//   return <Badges values={taints} ellipsisAt={100} {...props} entityType="labels" />
// }

export function Annotations({ annotations: values, separator, ...props }: AnnotationProps) {
  if (!values) return null
  const annotations = Object.entries(values).map(([key, value]) => {
    const text = getReadableName(key, value, separator, 'annotations')
    return {
      text,
      tooltipText: text,
    }
  })
  return <Badges values={annotations} {...props} entityType="annotations" />
}
