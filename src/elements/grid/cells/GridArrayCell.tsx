import React from 'react'
import { GridCellProps } from 'src/elements/grid/hooks/useGridRows'
import Text from 'src/elements/Text'

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

interface BaseGridArrayCellProps<K extends unknown[]> {
  nameFn: (item: ArrayElement<K>) => string
}
interface GridArrayCellProps<T, K extends unknown[] = []>
  extends GridCellProps<T, K>,
    BaseGridArrayCellProps<K> {}

export default function GridArrayCell<T, K extends unknown[]>({
  value: items = [] as K,
  nameFn,
}: GridArrayCellProps<T, K>) {
  return (
    <Text lineClamp={2} variant="body2">
      {items.map((item: ArrayElement<K>) => {
        const name = nameFn(item)
        return <span key={name}>{name}</span>
      })}
    </Text>
  )
}

export function createGridArrayCell<T, K extends unknown[]>({ nameFn }: BaseGridArrayCellProps<K>) {
  return (props: GridCellProps<T, K>) => {
    return <GridArrayCell {...props} nameFn={nameFn} />
  }
}
