import React, { PropsWithChildren } from 'react'
import SimpleLink, { Props as SimpleLinkProps } from '../components/SimpleLink'

interface Props extends SimpleLinkProps {
  // This should be an external link that includes the http(s) and the FQDN.
  url: string
  // Should this link open a new window (default: true)
  newWindow?: boolean
}

const ExternalLink = ({ url, children, newWindow = true, ...rest }: PropsWithChildren<Props>) => {
  const targetBlankProps = newWindow ? { target: '_blank', rel: 'noopener' } : {}
  return (
    <SimpleLink src={url} {...targetBlankProps} {...rest}>
      {children || url}
    </SimpleLink>
  )
}

export default ExternalLink
