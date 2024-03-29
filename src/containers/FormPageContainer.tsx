import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from '../theme-manager/themes/model'
import Text from '../elements/Text'

interface ContainerProps {
  fullPane: boolean
}

const useStyles = makeStyles<Theme, Partial<ContainerProps>>((theme) => ({
  page: {
    minWidth: '100vw',
    minHeight: '100vh',
    boxSizing: 'border-box',
    backgroundColor: theme?.components?.frame?.background,
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',

    '@media (max-width:992px)': {
      '& .form-page-footer': {
        maxWidth: 250,
      },
    },
  },
  container: {
    width: 1120,
    minHeight: 600,
    borderRadius: 16,
    border: `solid 1px ${theme?.components?.card?.border}`,
    display: 'grid',
    gridTemplateColumns: ({ fullPane }) => (fullPane ? '100%' : '50% 50%'),
    overflow: 'hidden',

    '@media (max-width:1200px)': {
      width: 912,
      '& .left-pane': {
        padding: '0 58px',
      },
      '& .right-pane': {
        paddingLeft: 48,
        paddingRight: 48,
      },
    },
    '@media (max-width:992px)': {
      gridTemplateColumns: 'unset',
      maxWidth: 400,
      minHeight: 475,
      width: '100%',
      '& .left-pane': {
        display: 'none',
      },
    },
    '@media (max-width:480px)': {
      maxWidth: 360,
      '& .right-pane': {
        paddingLeft: 24,
        paddingRight: 24,
      },
    },
  },
  managementPlane: {
    backgroundColor: theme?.components?.frame?.accentBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 80px',
    borderRight: `solid 1px ${theme?.components?.card?.border}`,
  },
  formPane: {
    position: 'relative',
    padding: '48px 24px',
    backgroundColor: theme?.components?.card?.background,
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gridGap: theme.spacing(2),
  },
  img: {
    maxWidth: '100%',
  },
  logo: {
    width: 240,
    marginBottom: theme.spacing(6),
  },
  footer: {
    marginTop: 16,
  },
}))

const FormPageContainer = ({
  children,
  className = undefined,
  footer = undefined,
  logoUrl = undefined,
  logoText = undefined,
  primayImgUrl,
  fullPane = false,
}) => {
  const classes = useStyles({ fullPane })
  return (
    <section
      id={clsx('form-page-container', className)}
      className={clsx('form-page-container', classes.page)}
    >
      {!logoUrl && !!logoText && (
        <Text className="form-logo" variant="subtitle1">
          {logoText}
        </Text>
      )}
      {!!logoUrl && (
        <img src={logoUrl} alt="Platform9 Logo" className={clsx('form-logo', classes.logo)} />
      )}
      <article className={classes.container}>
        {!fullPane && (
          <div className={clsx('left-pane', classes.managementPlane)}>
            <img alt="Platform9 Management Plane" src={primayImgUrl} className={classes.img} />
          </div>
        )}
        <div className={clsx('right-pane', classes.formPane)}>{children}</div>
      </article>
      {footer && <footer className={clsx('form-page-footer', classes.footer)}>{footer}</footer>}
    </section>
  )
}

export default FormPageContainer
