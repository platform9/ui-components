import React from 'react'
import useReactRouter from 'use-react-router'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Theme from '../../theme-manager/themes/model'
import usePluginRouter from '../../hooks/usePluginRouter'
import { Route as Router } from '../../plugins/route'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'

import Crumb from './Crumb'
import { getCrumbs } from './helpers'

export default function Breadcrumbs({ nameOverrides }) {
  const { currentLink } = usePluginRouter()
  const { match, location } = useReactRouter()
  const classes = useStyles({})
  const currentRoute = Router.getCurrentRoute()
  if (!currentRoute) {
    console.error('[breadcrumbs] no current route found for path', location.pathname)
    return null
  }

  const crumbs = getCrumbs(currentRoute.breadcrumbs, nameOverrides, match.params)

  return (
    <ul
      className={clsx(classes.breadcrumbs, classes.gridContainer, {
        [classes.fourCrumbs]: crumbs.length === 4,
        [classes.fiveCrumbs]: crumbs.length === 5,
      })}
    >
      {crumbs.map((crumb, idx) => (
        <Crumb
          key={crumb.name}
          leftIcon={
            idx === 0 && (
              <FontAwesomeIcon className={clsx(classes.icon, classes.primaryIcon)}>
                {currentLink?.icon}
              </FontAwesomeIcon>
            )
          }
          name={crumb.name}
          path={crumb.path}
          icon="chevron-right"
          active={idx === crumbs.length - 1}
        />
      ))}
    </ul>
  )
}

const useStyles = makeStyles<Theme>((theme) => ({
  gridContainer: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'start',
    gridAutoFlow: 'column',
    gap: 8,
  },
  breadcrumbs: {
    gap: 8,
    padding: 0,
    margin: 0,
  },
  primaryIcon: {
    fontSize: 20,
    color: theme.components.breadcrumb.text,
  },
}))
