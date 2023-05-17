import React from 'react'
import { styled } from '@material-ui/styles'
import { BadgesProps, RenderLabelParams, LabelParams, AnnotationProps, LabelProps } from './model'
import Text from '../../elements/Text'
import { GridCellProps } from '../../elements/grid/hooks/useGridRows'
import Badge from '../../elements/badge'
import { Annotations, Labels } from './LabelsOrAnnotations'

export const defaultVariant: BadgesProps['variant'] = 'default'

const LabelsAsBadges = styled(({ labels, variant, defaultValue, className }) => {
  if (!labels) return <Text variant="body2">{defaultValue}</Text>
  return (
    <div className={className}>
      {labels.map((label, idx) => (
        <Badge key={idx} text={label} variant={variant} />
      ))}
    </div>
  )
})({
  display: 'grid',
  gridAutoFlow: 'row',
  gap: 8,
})

export const renderLabelsAsBadges =
  ({ variant = defaultVariant, defaultValue = '' }: LabelParams) =>
  (labels: string[]) =>
    <LabelsAsBadges labels={labels} variant={variant} defaultValue={defaultValue} />

export const renderResourceLabels =
  ({ separator, type, variant, ...rest }: RenderLabelParams) =>
  (values) =>
    (
      <Labels
        labels={values}
        variant={variant}
        separator={separator}
        containerType={type}
        {...rest}
      />
    )

export function createResourceLabelsCell<T>({ separator, type, variant }: RenderLabelParams) {
  return (props: GridCellProps<T, LabelProps['labels']>) => {
    return (
      <Labels labels={props?.value} variant={variant} separator={separator} containerType={type} />
    )
  }
}

export function createResourceAnnotationsCell<T>(annotationProps: RenderLabelParams) {
  return (props: GridCellProps<T, AnnotationProps['annotations']>) => {
    return <Annotations annotations={props?.value} {...annotationProps} />
  }
}

export const renderResourceAnnotations = ({ values, ...rest }) => (
  <Annotations annotations={values} {...rest} />
)

// export const renderResourceTaints = (values) => <Taints taints={values} />
