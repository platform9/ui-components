import React, { ReactNode, PropsWithChildren } from 'react'
import makeStylesWithTheme from 'src/theme-manager/makeStylesWithTheme'
import clsx from 'clsx'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import { makeStyles } from '@material-ui/core'
// import generateTestId from 'utils/test-helpers'

export interface CardProps {
  title?: string | ReactNode
  footer?: string | ReactNode
  withCustomBody?: boolean
  withCustomFooter?: boolean
  className?: string
  testId?: string
}

const getTitleComponent = (title) =>
  typeof title === 'string' ? <CardHeader>{title}</CardHeader> : title

function Card({
  title,
  children,
  footer = undefined,
  withCustomBody = false,
  withCustomFooter = false,
  className = undefined,
  testId = '',
}: PropsWithChildren<CardProps>) {
  const classes = useStyles()
  const titleComponent = getTitleComponent(title)
  const BodyComponent = withCustomBody ? React.Fragment : CardBody
  const FooterComponent = withCustomFooter ? React.Fragment : CardFooter
  return (
    <article
      //   data-testid={generateTestId('cluster', 'status')}
      data-testid={testId}
      className={clsx(className, classes.card)}
    >
      {!!titleComponent && titleComponent}
      <BodyComponent>{children}</BodyComponent>
      {footer && <FooterComponent>{footer}</FooterComponent>}
    </article>
  )
}

const useStyles = makeStylesWithTheme((theme) => ({
  card: {
    backgroundColor: theme.components.card.background,
    borderRadius: '4px 4px 2px 2px',
    border: `1px solid ${theme.components.card.border}`,
  },
}))

export default Card
