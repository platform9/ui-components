import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { PropsWithChildren, ReactNode } from 'react'
import Theme from '../../theme-manager/themes/model'
import generateTestId from '../../utils/test-helpers'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import CardHeader from './CardHeader'

export interface CardProps {
  title?: string | ReactNode
  footer?: string | ReactNode
  withCustomBody?: boolean
  withCustomFooter?: boolean
  className?: string
  dataTestId?: string
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
  dataTestId = 'card',
}: PropsWithChildren<CardProps>) {
  const classes = useStyles({})
  const titleComponent = getTitleComponent(title)
  const BodyComponent = withCustomBody ? React.Fragment : CardBody
  const FooterComponent = withCustomFooter ? React.Fragment : CardFooter
  return (
    <article data-testid={generateTestId(dataTestId)} className={clsx(classes.card, className)}>
      {!!titleComponent && titleComponent}
      <BodyComponent>{children}</BodyComponent>
      {footer && <FooterComponent>{footer}</FooterComponent>}
    </article>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  card: {
    backgroundColor: theme.components.card.background,
    borderRadius: '4px 4px 2px 2px',
    border: `1px solid ${theme.components.card.border}`,
  },
}))

export default Card
