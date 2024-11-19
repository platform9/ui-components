import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Tooltip from 'src/elements/tooltip/Tooltip'
import Theme from 'src/theme-manager/themes/model'
import Text from '../../elements/Text'
import FontAwesomeIcon from '../FontAwesomeIcon'
import BaseToggleSwitchField from './ToggleSwitchField'

interface ToggleSwitchFieldProps {
  id: string
  label: string
  value: boolean
  onChange: (value: any) => void
  disabled?: boolean
  tooltipMsg?: string
  info?: string
  customTooltipInfoBody?: React.ReactNode
}

export default function ToggleSwitchField({
  id,
  label,
  value,
  onChange,
  disabled,
  children,
  tooltipMsg,
  info,
  customTooltipInfoBody,
}: React.PropsWithChildren<ToggleSwitchFieldProps>) {
  const classes = useAddonFieldStyles()

  const ToggleComponent = (
    <BaseToggleSwitchField id={id} value={value} onChange={onChange} disabled={disabled} />
  )

  return (
    <div className={classes.configContainer}>
      {tooltipMsg ? (
        <Tooltip message={tooltipMsg}>{ToggleComponent}</Tooltip>
      ) : (
        <>{ToggleComponent}</>
      )}
      <div>
        <div className={classes.label}>
          <Text variant="caption1">{label}</Text>
          {info ||
            (customTooltipInfoBody && (
              <Tooltip customBody={customTooltipInfoBody} message={info}>
                <FontAwesomeIcon>circle-info</FontAwesomeIcon>
              </Tooltip>
            ))}
        </div>
      </div>
      <div className={classes.desciptionAndOptions}>{children}</div>
    </div>
  )
}

const useAddonFieldStyles = makeStyles<Theme>((theme) => ({
  configContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content 187px 1fr',
    gridGap: theme.spacing(3),
    alignItems: 'start',
  },
  desciptionAndOptions: {
    display: 'grid',
    gridAutoFlow: 'row',
    gridGap: theme.spacing(3),
  },
  label: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: theme.spacing(1),
  },
}))
