import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import Theme from 'src/theme-manager/themes/model'
import { memoize } from 'src/utils/misc'
import clsx from 'clsx'
import { LoadingGifs } from 'src/constants'
import Text from 'src/elements/Text'

import BlueLightTiles from './loader-svgs/BlueLightTiles'
import BlueDarkTiles from './loader-svgs/BlueDarkTiles'

import BluePinkLightTiles from './loader-svgs/BluePinkLightTiles'
import BluePinkDarkTiles from './loader-svgs/BluePinkDarkTiles'
import Ellipsis from './loader-svgs/Ellipsis'

const defaultLoaderHeight = 80
export interface ProgressProps {
  loading: boolean
  overlay?: boolean
  inline?: boolean
  renderLoadingImage?: boolean
  renderContentOnMount?: boolean
  message?: string
  loadingImage?: LoadingGifs
  inlineClassName?: string
  loadingImageHeight?: number
  className?: string
}

const imageMap = {
  [LoadingGifs.BluePinkTiles]: {
    light: BluePinkLightTiles,
    dark: BluePinkDarkTiles,
  },
  [LoadingGifs.BlueTiles]: {
    light: BlueLightTiles,
    dark: BlueDarkTiles,
  },
  [LoadingGifs.Ellipsis]: Ellipsis,
}

const getLoadingImage = memoize((inline, imageType, themeType) => {
  if (inline) {
    return imageMap[LoadingGifs.Ellipsis]
  }
  return imageMap[imageType][themeType]
})

// TODO: Make this component accept custom loading gifs, not just the pf9 ones

export default function Progress({ children, ...props }: PropsWithChildren<ProgressProps>) {
  const {
    loading = false,
    overlay = false,
    inline = false,
    renderLoadingImage = true,
    renderContentOnMount = true,
    message = 'Loading',
    loadingImage = LoadingGifs.BlueTiles,
    loadingImageHeight = defaultLoaderHeight,
    inlineClassName,
    className,
  } = props
  const theme: Theme = useTheme()
  const classes = useStyles(props)
  const [state, setState] = useState({
    loadedOnce: false,
  })

  useEffect(() => {
    if (props.loading) {
      return
    }
    setState({
      loadedOnce: true,
    })
  }, [props.loading])

  const LoadingImageComponent = renderLoadingImage
    ? getLoadingImage(inline, loadingImage, theme.palette.type)
    : React.Fragment

  const shouldRenderStatus = loading
  const shouldNotRenderContent = !children || (!renderContentOnMount && !state.loadedOnce)

  return (
    <div
      className={clsx(classes.root, 'progress-root', {
        [classes.rootInline]: inline,
      })}
    >
      {shouldRenderStatus && (
        <div
          className={clsx(classes.status, 'progress-status', {
            [classes.statusOverlayed]:
              overlay && loading && (renderContentOnMount || state.loadedOnce),
          })}
        >
          {renderLoadingImage && (
            <LoadingImageComponent className={classes.img} height={loadingImageHeight} />
          )}
          {message && (
            <Text
              className={clsx(classes.message, inlineClassName)}
              variant={inline ? 'body2' : 'subtitle2'}
            >
              {message}
            </Text>
          )}
        </div>
      )}
      {!shouldNotRenderContent && (
        <div
          className={clsx(classes.content, className, 'progressContent', {
            loading,
            [classes.hiddenContent]: loading && !overlay,
            [classes.contentLoading]: loading,
          })}
        >
          {children}
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles<Theme, ProgressProps>((theme) => ({
  root: {
    display: 'grid',
    position: 'relative',
    height: '100%',
    minWidth: 350,
    minHeight: ({ inline }) => (!inline ? 135 : 'unset'),
  },
  rootInline: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    position: 'relative',
    minWidth: 60,
  },
  message: {
    order: ({ inline }) => (inline ? -1 : 0),
  },
  img: {
    opacity: ({ inline }) => (inline ? 1 : 1),
  },
  status: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    rowGap: 16,
    gridAutoFlow: ({ inline }) => (inline ? 'column' : 'row'),
    gridAutoRows: 'max-content',
    alignContent: 'center',
    padding: ({ inline }) => (inline ? 'unset' : '32px 0'),
    minHeight: ({ inline, overlay }) => (inline || overlay ? 'unset' : 'max-content'),
  },
  statusOverlayed: {
    position: 'absolute',
    zIndex: 100,
    inset: ({ inline }) => (inline ? 'auto 0 8px 0' : '0 0'),
    minWidth: ({ inline }) => (inline ? 150 : 'unset'),
  },
  content: {
    width: '100%',
    transition: 'opacity .2s ease, filter .2s ease',
  },
  contentLoading: {
    opacity: ({ inline }) => (inline ? 0.6 : 0.35),
    filter: ({ inline }) => (inline ? 'unset' : 'blur(1px)'),
  },
  hiddenContent: {
    visibility: ({ inline }) => (inline ? 'visible' : 'hidden'),
    display: ({ inline }) => (inline ? 'none' : 'inherit'),
  },
}))
