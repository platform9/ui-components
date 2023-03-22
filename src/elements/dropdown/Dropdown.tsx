import React, { useRef, useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { isNil } from 'ramda'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import Downshift from 'downshift'
import DropdownCommonProps, { DropdownItemSpec } from './DropdownCommonProps'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'
import DropdownItem from './DropdownItem'
import DropdownInput from './DropdownInput'
import Text from '../Text'
import { dropdownDefaultWidth, defaultAllKey, defaultNoneKey } from './constants'
import useStyles from './useStyles'
import generateTestId from '../../utils/test-helpers'
import { defaultItemToString } from './helpers'

export interface DropdownProps<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>
  extends DropdownCommonProps<V, T> {
  initialValue?: V
  value?: V | '__all__' | '__none__'
  onChange?: (selectedValue: V | '__all__' | '__none__') => void
  noBlankValue?: boolean
  showAll?: boolean
  allLabel?: string
  allKey?: string
  showNone?: boolean
  noneLabel?: string
  noneKey?: string
  showClearButton?: boolean
}

const blankItem = { key: '', label: '', value: null }

export default function Dropdown<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>(
  props: DropdownProps<V, T>,
) {
  const {
    value,
    initialValue,
    itemToString = defaultItemToString,
    onChange,
    items,
    label,
    error,
    name,
    placeholder = 'Select an option',
    enableSearch,
    width = dropdownDefaultWidth,
    noBlankValue,
    className,
    showAll = false,
    allLabel = 'All',
    allKey = defaultAllKey,
    showNone = false,
    noneLabel = 'None',
    noneKey = defaultNoneKey,
    compact,
    showClearButton = enableSearch,
  } = props
  const showAllItem = useMemo<T>(
    () => ({ key: allKey, label: allLabel, value: allKey } as T),
    [allKey, allLabel],
  )
  const showNoneItem = useMemo<T>(
    () => ({ key: noneKey, label: noneLabel, value: noneKey } as T),
    [noneKey, noneLabel],
  )
  const input = useRef(null)
  const classes = useStyles(props)

  const handleChange = useCallback(
    (item: T) => {
      onChange(item?.value)
    },
    [onChange],
  )

  const initialSelectedItem = useMemo<T>(() => {
    if (!isNil(initialValue) && !noBlankValue) {
      return items.find(({ value }) => value === initialValue)
    }
    return noBlankValue && !enableSearch
      ? showAll || showNone
        ? showAll
          ? showAllItem
          : showNoneItem
        : items.length
        ? items[0]
        : (blankItem as T)
      : (blankItem as T)
  }, [])

  const selectedItem = useMemo<T>(() => {
    if (showAll && (isNil(value) || value === allKey)) {
      return showAllItem
    }
    if (showNone && (isNil(value) || value === noneKey)) {
      return showNoneItem
    }
    if (!isNil(value) && !Array.isArray(value)) {
      return items.find(({ value: itemValue }) => itemValue === value) || initialSelectedItem
    }
    return noBlankValue && !enableSearch && items.length ? items[0] : initialSelectedItem
  }, [showAll, showNone, items, value, initialSelectedItem])

  const getFilteredItems = useCallback(
    (inputValue) => {
      const menuItems = []
      if (showAll) {
        menuItems.push(showAllItem)
      }
      if (showNone) {
        menuItems.push(showNoneItem)
      }
      return items.reduce((acc, item) => {
        if (
          enableSearch &&
          inputValue &&
          !item.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        ) {
          return acc
        }
        acc.push(item)
        return acc
      }, menuItems)
    },
    [items, showAll, showNone, showAllItem],
  )

  return (
    <Downshift<T>
      initialSelectedItem={initialSelectedItem}
      selectedItem={onChange ? selectedItem : null}
      onChange={onChange ? handleChange : null}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getToggleButtonProps,
        getMenuProps,
        selectItem,
        isOpen,
        clearSelection,
        inputValue,
        toggleMenu,
        getLabelProps,
      }) => (
        <div className={clsx(classes.dropdownWrapper, 'dropdown-container', className)}>
          {label && (
            <Text
              data-testid={generateTestId(label, 'dropdown', 'label')}
              {...getLabelProps()}
              onClick={() => {
                toggleMenu()
                !isOpen && input.current?.focus()
              }}
              component="label"
              variant="inputLabel"
              className={clsx(classes.label, 'label')}
            >
              {label}
            </Text>
          )}
          <div
            className={clsx(classes.inputFrame, 'inputFrame', {
              [classes.expandedInputFrame]: isOpen,
            })}
          >
            {enableSearch ? (
              <DropdownInput
                {...getInputProps({
                  ref: input,
                  name,
                  placeholder,
                })}
              />
            ) : (
              <div
                data-testid={generateTestId(label, 'dropdown', 'list')}
                {...getToggleButtonProps()}
                className={clsx(classes.placeholder, 'placeholder')}
              >
                {inputValue || placeholder}
              </div>
            )}
            {inputValue && (!noBlankValue || enableSearch) && showClearButton ? (
              <DropdownToggle onClick={() => clearSelection()} aria-label="clear selection">
                <FontAwesomeIcon solid size="sm">
                  xmark
                </FontAwesomeIcon>
              </DropdownToggle>
            ) : (
              <DropdownToggle {...getToggleButtonProps()}>
                <FontAwesomeIcon solid size="sm">
                  {isOpen ? 'caret-up' : 'caret-down'}
                </FontAwesomeIcon>
              </DropdownToggle>
            )}
            <DropdownMenu compact={compact} width={width} isOpen={isOpen} {...getMenuProps()}>
              {isOpen
                ? getFilteredItems(inputValue).map((item) => (
                    <DropdownItem
                      data-testid={generateTestId('dropdown', 'selection', 'value')}
                      key={item.key ?? String(item.value)}
                      onClick={item.disabled ? null : () => selectItem(item)}
                      disabled={item.disabled}
                    >
                      {item.content ?? <span>{itemToString(item)}</span>}
                    </DropdownItem>
                  ))
                : null}
            </DropdownMenu>
          </div>
          {!!error && (
            <Text
              data-testid={generateTestId('dropdown', 'error')}
              variant="body2"
              className={clsx(classes.error, 'error')}
            >
              {error}
            </Text>
          )}
        </div>
      )}
    </Downshift>
  )
}
