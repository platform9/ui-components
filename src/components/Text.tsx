import React, { forwardRef } from 'react'
import typography from '../theme-manager/themes/base/typography'

import clsx from 'clsx'
import useStylesWithTheme from '../theme-manager/useStylesWithTheme'

export type TextVariant = keyof typeof typography

interface TextProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string
  variant?: TextVariant
  component?: React.ElementType
  noWrap?: boolean
  lineClamp?: number
  maxWidth?: number
}

const variantMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle1: 'h5',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
}

// forwardRef required for mask from Input component to work
// const Text = forwardRef<HTMLElement, TextProps>((props, ref) => {
//   const {
//     className,
//     variant = 'body1',
//     component = variantMap[variant] || 'span',
//     noWrap = false,
//     lineClamp = undefined,
//     maxWidth,
//     children,
//     ...rest
//   } = props
//   const classes = useStylesWithTheme(styleCreator, { variant, lineClamp, maxWidth })

//   return React.createElement(
//     component,
//     {
//       variant: variant,
//       className: clsx(classes.text, className, {
//         [classes.noWrap]: noWrap,
//         [classes.lineClamp]: lineClamp,
//       }),
//       ref: ref,
//       ...rest,
//     },
//     children,
//   )
// })

const Text = (props: TextProps) => {
  const {
    className,
    variant = 'body1',
    component = variantMap[variant] || 'span',
    noWrap = false,
    lineClamp = undefined,
    maxWidth,
    children,
    ...rest
  } = props
  const classes = useStylesWithTheme(styleCreator, { variant, lineClamp, maxWidth })
  return React.createElement(
    component,
    {
      variant: variant,
      className: clsx(classes.text, className, {
        [classes.noWrap]: noWrap,
        [classes.lineClamp]: lineClamp,
      }),
      ...rest,
    },
    children,
  )
}

export default Text

interface StyleProps {
  lineClamp?: number
  variant: TextVariant
  maxWidth?: number
}
const styleCreator = (theme) => ({
  lineClamp: {
    display: '-webkit-box',
    '-webkit-line-clamp': ({ lineClamp }) => lineClamp,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    wordBreak: 'break-word',
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  text: {
    // these need to use optional chaining as the theme isn't loaded on first render.
    // this would throw an exception
    fontFamily: ({ variant }) => theme?.typography?.[variant]?.fontFamily,
    fontSize: ({ variant }) => theme?.typography?.[variant]?.fontSize,
    fontWeight: ({ variant }) => theme?.typography?.[variant]?.fontWeight,
    fontStretch: ({ variant }) => theme?.typography?.[variant]?.fontStretch,
    fontStyle: ({ variant }) => theme?.typography?.[variant]?.fontStyle,
    lineHeight: ({ variant }) => theme?.typography?.[variant]?.lineHeight,
    letterSpacing: ({ variant }) => theme?.typography?.[variant]?.letterSpacing,
    textAlign: ({ variant }) => theme?.typography?.[variant]?.textAlign,
    color: theme?.components?.typography?.default,
    margin: 0,
    maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
  },
})
// const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
//   lineClamp: {
//     display: '-webkit-box',
//     '-webkit-line-clamp': ({ lineClamp }) => lineClamp,
//     '-webkit-box-orient': 'vertical',
//     overflow: 'hidden',
//     wordBreak: 'break-word',
//   },
//   noWrap: {
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     whiteSpace: 'nowrap',
//   },
//   text: {
//     // these need to use optional chaining as the theme isn't loaded on first render.
//     // this would throw an exception
//     fontFamily: ({ variant }) => theme?.typography?.[variant]?.fontFamily,
//     fontSize: ({ variant }) => theme?.typography?.[variant]?.fontSize,
//     fontWeight: ({ variant }) => theme?.typography?.[variant]?.fontWeight,
//     fontStretch: ({ variant }) => theme?.typography?.[variant]?.fontStretch,
//     fontStyle: ({ variant }) => theme?.typography?.[variant]?.fontStyle,
//     lineHeight: ({ variant }) => theme?.typography?.[variant]?.lineHeight,
//     letterSpacing: ({ variant }) => theme?.typography?.[variant]?.letterSpacing,
//     textAlign: ({ variant }) => theme?.typography?.[variant]?.textAlign,
//     color: theme?.components?.typography?.default,
//     margin: 0,
//     maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
//   },
// }))
