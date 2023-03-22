import React, { PureComponent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { withStyles } from '@material-ui/styles'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Input from '../elements/input'
import clsx from 'clsx'
import Theme from '../theme-manager/themes/model'

interface AutocompleteBaseProps {
  suggestions?: string[]
  onChange: any
  initialValue?: string
  classes?: any
  className?: string
  label?: string
  id?: string
  inputProps?: any
  fullWidth?: boolean
  value: string
}

const styles = (theme: Theme) => ({
  dropdownButton: { cursor: 'pointer' },
  absolute: { position: 'absolute', zIndex: '9999' },
  relative: { position: 'relative' },
})

// @ts-ignore
@withStyles(styles)
class AutocompleteBase extends PureComponent<AutocompleteBaseProps> {
  state = {
    value: this.props.initialValue || '',
    open: this.props.initialValue && this.props.initialValue.length > 0,
  }

  matchedSuggestions = () => {
    const { suggestions } = this.props
    const { value } = this.state
    if (value.length === 0) {
      return suggestions
    }
    const r = new RegExp(value)
    const matched = (suggestions || []).filter((x) => r.test(x))
    return matched
  }

  propogateChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  handleChange = (event) => {
    if (!event || !event.target) {
      return
    }
    const value = event.target.value
    this.setState({ value, open: true }, this.propogateChange)
  }

  // Note: that we are using `onMouseDown` instead of `onClick` to trigger this.
  // The reason is that the Textfield's `onBlur` is firing before the `onClick`
  // and deleting the suggestions when then makes it behave as if the suggestion
  // was never clicked.  `onBlur` does not happen until `onMouseUp` so this seems
  // to work.  Not sure about tap events.
  handleClick = (item) => () => {
    this.setState({ value: item, open: false }, this.propogateChange)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  toggleOpen = () => {
    this.setState((state: any) => ({ open: !state.open }))
  }

  renderSuggestions = (suggestions) => {
    const { open } = this.state
    const { classes } = this.props
    if (!open || !suggestions || suggestions.length === 0) {
      return null
    }
    return (
      <Paper className={`${classes.container} ${classes.absolute}`}>
        <MenuList className={classes.container}>
          {suggestions.map((item) => (
            <MenuItem key={item} onMouseDown={this.handleClick(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Paper>
    )
  }

  render() {
    const matched = this.matchedSuggestions()
    const { value } = this.state
    const { className, classes, suggestions, onChange, initialValue, label, id, ...other } =
      this.props
    const DropdownIcon = <ArrowDropDownIcon className={classes.dropdownButton} />

    return (
      <div className={clsx(classes.relative, className)}>
        <FormControl className={classes.container} onMouseDown={this.toggleOpen}>
          <Input
            id={id}
            placeholder={label}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleClose}
            // endadornment={suggestions && DropdownIcon}
            {...other}
          ></Input>
        </FormControl>
        {this.renderSuggestions(matched)}
      </div>
    )
  }
}

export default AutocompleteBase
