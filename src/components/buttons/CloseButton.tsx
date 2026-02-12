import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import IconButton from '../../elements/button/IconButton'
import Tooltip from '../../elements/tooltip'
import { styled } from '@mui/styles'

const StyledLink = styled(Link)({
  display: 'block',
})

const CloseButton = ({ tooltip = 'Cancel', ...props }) => {
  const icon = <IconButton icon="times-circle" {...props} size="lg" />

  return (
    <Tooltip message={tooltip}>
      {props.to ? <StyledLink to={props.to}>{icon}</StyledLink> : icon}
    </Tooltip>
  )
}

CloseButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
}

export default CloseButton
