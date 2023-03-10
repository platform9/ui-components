import React, { FC } from 'react'
import Progress, { ProgressProps } from './Progress'

export type PropsWithProgress<P> = {
  loading?: boolean
  loadingProps?: Omit<ProgressProps, 'loading'>
} & P

export default function withProgress<P>(
  Component: FC<P>,
  defaultProgressProps: Omit<ProgressProps, 'loading'> = {},
): FC<PropsWithProgress<P>> {
  return (props) => {
    const { loading, loadingProps = defaultProgressProps, ...rest } = props
    return (
      <Progress loading={loading} {...loadingProps}>
        <Component {...(rest as P)} />
      </Progress>
    )
  }
}
