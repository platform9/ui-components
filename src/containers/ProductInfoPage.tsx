import React, { useEffect, PropsWithChildren } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'

import Text from 'src/elements/Text'
interface Props {
  title: string
  icon: React.ReactNode
  actions: React.ReactNode[]
  footerTitle?: string
  className?: string
  componentDidMountFn?: any
  componentWillUnmountFn?: any
}

export default function ProductInfoPage({
  title,
  footerTitle = undefined,
  className,
  children,
  icon,
  actions = [],
  componentDidMountFn,
  componentWillUnmountFn,
}: PropsWithChildren<Props>) {
  const classes = useStyles()
  //   const dispatch = useDispatch()
  useEffect(() => {
    componentDidMountFn && componentDidMountFn()
    return () => {
      componentWillUnmountFn && componentWillUnmountFn()
    }
  }, [])
  //   useEffect(() => {
  //     dispatch(clientActions.setSidebarState('collapsed'))
  //     return () => {
  //       dispatch(clientActions.setSidebarState('expanded'))
  //     }
  //   }, [])
  return (
    <div className={classes.productInfoPage}>
      <article className={clsx(classes.productInfoContent, className)}>
        <Text
          variant="h2"
          component="header"
          className={clsx('product-info-title', classes.productInfoTitle)}
        >
          {title}
        </Text>
        <div className={clsx('product-info-body', classes.productInfoBody)}>{children}</div>
        <figure className={clsx('product-info-figure', classes.productInfoFigure)}>{icon}</figure>
        <footer className={clsx('product-info-footer', classes.productInfoFooter)}>
          {footerTitle ? (
            <Text variant="caption2" className={classes.productInfoFooterTitle}>
              {footerTitle}
            </Text>
          ) : null}
          {actions}
        </footer>
      </article>
    </div>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  '@global': {
    'html .content-main': {
      gridAutoRows: '1fr',
    },
  },
  productInfoPage: {
    display: 'grid',
    alignItems: 'center',
  },
  productInfoContent: {
    width: '100%',
    maxWidth: 1250,
    display: 'grid',
    gridTemplateAreas: `
      "product-info-title product-info-figure"
      "product-info-body product-info-figure"
      "product-info-footer product-info-figure"
    `,
    marginBottom: 40,
    gridTemplateColumns: '1fr max-content',
    gridTemplateRows: 'max-content max-content 1fr',
    justifySelf: 'center',
    gap: 32,

    '@media (max-width:1440px)': {
      maxWidth: 895,
      '& > .product-info-body, & > .product-info-title, & > .product-info-footer': {
        maxWidth: 480,
      },
      '& > .product-info-figure': {
        width: 320,
        height: 320,

        '& svg': {
          width: 180,
          height: 180,
        },
      },
    },

    '@media (max-width:992px)': {
      maxWidth: 'max-content',
      gridTemplateAreas: `
        "product-info-figure"
        "product-info-title"
        "product-info-body"
        "product-info-footer"
      `,
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'repeat(4, max-content)',
      '& > .product-info-title': {
        marginTop: 0,
        display: 'grid',
        alignItems: 'center',
      },
      '& > .product-info-figure': {
        width: 160,
        height: 160,

        '& svg': {
          width: 88,
          height: 88,
        },
      },
    },
  },
  productInfoTitle: {
    maxWidth: 520,
    gridArea: 'product-info-title',
    marginTop: 16,
  },
  productInfoBody: {
    maxWidth: 575,
    gridArea: 'product-info-body',
    display: 'grid',
    gridAutoRows: 'max-content',
    gap: '16px',
    justifyItems: 'start',
  },
  productInfoFigure: {
    backgroundColor: theme.components.iconButton.background,
    border: `1px solid ${theme.components.iconButton.border}`,
    borderRadius: '100%',
    margin: 0,
    padding: 0,
    gridArea: 'product-info-figure',
    width: 400,
    height: 400,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  productInfoFooter: {
    maxWidth: 575,
    marginTop: 16,
    display: 'grid',
    gridArea: 'product-info-footer',
    gap: 16,
  },
  productInfoFooterTitle: {
    color: theme.components.typography.passive,
    textTransform: 'uppercase',
  },
}))
