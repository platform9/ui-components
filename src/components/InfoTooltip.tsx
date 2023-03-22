import Tooltip from '../elements/tooltip'
import React, { PropsWithChildren, PureComponent } from 'react'
import { memoize } from '../utils/misc'

interface Props {
  classes?: any
  align: any
  offset: any
  info: string | React.ReactNode
  infoPlacement?: any
}

class InfoTooltip extends PureComponent<PropsWithChildren<Props>> {
  // for some reason the styles are not propagating to the info tooltip
  renderTitle = memoize((info) => <span>{info}</span>)

  render() {
    const { info, classes = {}, align, offset, children } = this.props

    return info ? (
      <Tooltip align={align} offset={offset} message={this.renderTitle(info)}>
        {children}
      </Tooltip>
    ) : (
      children
    )
  }
}

// We need to use `forwardRef` as a workaround of an issue with material-ui Tooltip https://github.com/gregnb/mui-datatables/issues/595
const withInfoTooltip = (Component) =>
  React.forwardRef(({ info, infoPlacement, ...props }: Props, ref) => (
    <InfoTooltip info={info} align={infoPlacement?.align} offset={infoPlacement?.offset}>
      <Component {...props} info={info} ref={ref} />
    </InfoTooltip>
  ))

export { withInfoTooltip }

export default InfoTooltip
