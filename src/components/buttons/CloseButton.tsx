import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import IconButton from 'src/elements/button/IconButton'
import Tooltip from 'src/elements/tooltip'

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'block',
  },
}))

const CloseButton = ({ tooltip = 'Cancel', ...props }) => {
  const classes = useStyles({})
  const icon = <IconButton icon="times-circle" {...props} />

  return (
    <Tooltip message={tooltip}>
      {props.to ? (
        <Link className={classes.link} to={props.to}>
          {icon}
        </Link>
      ) : (
        icon
      )}
    </Tooltip>
  )
}

CloseButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
}

export default CloseButton
