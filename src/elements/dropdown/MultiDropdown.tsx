import React, { ReactNode, useCallback, useMemo, useRef } from 'react'
import DropdownCommonProps, { DropdownItemSpec } from './DropdownCommonProps'
import MultiDownshift from './MultiDownshift'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'
import clsx from 'clsx'
import DropdownItem from './DropdownItem'
import FontAwesomeIcon from '../../components/FontAwesomeIcon'
import DropdownInput from './DropdownInput'
import Text from '../Text'
import useStyles from './useStyles'
import { dropdownDefaultWidth } from './constants'
import { defaultItemToString } from './helpers'
import { pluck, equals } from 'ramda'
import generateTestId from '../../utils/test-helpers'
import { getTypedEmptyArr } from '../../utils/fp'

export interface MultiDropdownProps<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>
  extends DropdownCommonProps<V, T> {
  initialValues?: V[]
  value?: (V | '__all__' | '__none__')[]
  onChange?: (selectedValues: (V | '__all__' | '__none__')[]) => void
  multiline?: boolean
  preventUnselectLast?: boolean
  noCheckboxes?: boolean
  showAll?: boolean
  id?: string
  optionToggleCondition?: (option, isSelected, selectedValues) => boolean
  bottomContent?: ReactNode
}

export default function MultiDropdown<V, T extends DropdownItemSpec<V> = DropdownItemSpec<V>>(
  props: MultiDropdownProps<V, T>,
) {
  const input = useRef(null)
  const classes = useStyles(props)
  const {
    value: selectedValues,
    itemToString = defaultItemToString,
    onChange,
    items,
    label,
    error,
    name,
    placeholder = 'Select an option',
    enableSearch,
    width = dropdownDefaultWidth,
    className,
    multiline,
    noCheckboxes,
    compact,
    id,
    showAll = false,
    optionToggleCondition,
    preventUnselectLast,
    bottomContent,
  } = props
  const maxItems = (width > 240 ? 3 : 2) * (multiline ? 4 : 1)
  const selectedItems = useMemo<T[]>(
    () =>
      selectedValues
        ? items.filter(
            ({ value }) =>
              selectedValues.includes(value) || selectedValues.some((val) => equals(val, value)),
          )
        : getTypedEmptyArr<T>(),
    [selectedValues, items],
  )
  const handleMultiChange = useCallback(
    (items: T[]) => {
      if (!equals(items, selectedItems)) {
        onChange(items?.map(({ value }) => value))
      }
    },
    [onChange, selectedItems],
  )

  return (
    <MultiDownshift<T>
      id={id}
      selectedItems={selectedItems}
      itemToString={itemToString}
      onMultiChange={onChange ? handleMultiChange : null}
    >
      {({
        getRemoveButtonProps,
        toggleItem,
        unselectItem,
        getInputProps,
        getMenuProps,
        isOpen,
        inputValue,
        selectedItems,
        selectAll,
        clear,
        toggleMenu,
        getLabelProps,
      }) => {
        const allSelected = selectedItems?.length === items?.length
        const selectedValues = pluck('value', selectedItems)
        const disableUnselect = preventUnselectLast && selectedItems?.length <= 1
        return (
          <div className={clsx(classes.dropdownWrapper, className)}>
            {label && (
              <Text
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
              {selectedItems.length > 0 ? (
                selectedItems.slice(0, maxItems).map((item) => (
                  <div
                    key={item.key ?? item.label ?? String(item.value)}
                    title={itemToString(item)}
                    className={clsx(classes.selectedItem, 'selected-item')}
                  >
                    <span>{itemToString(item)}</span>
                    {!disableUnselect ? (
                      <DropdownToggle
                        {...getRemoveButtonProps({
                          item,
                          onClick: () => unselectItem(item),
                        })}
                        aria-label="remove item"
                        type="button"
                      >
                        <FontAwesomeIcon solid size="sm">
                          xmark
                        </FontAwesomeIcon>
                      </DropdownToggle>
                    ) : null}
                  </div>
                ))
              ) : (
                <div
                  data-testid={generateTestId(id)}
                  onClick={() => {
                    toggleMenu()
                    !isOpen && input.current?.focus()
                  }}
                  className={clsx(classes.placeholder, 'placeholder')}
                >
                  {placeholder}
                </div>
              )}
              {selectedItems.length > maxItems ? (
                <div
                  className={classes.selectedItem}
                  title={selectedItems
                    .slice(maxItems)
                    .map((item) => itemToString(item))
                    .join('\n')}
                >
                  <span>+{selectedItems.length - maxItems}</span>
                </div>
              ) : null}
              <DropdownToggle
                type="button"
                onClick={() => {
                  toggleMenu()
                  !isOpen && input.current?.focus()
                }}
              >
                <FontAwesomeIcon solid size="sm">
                  {isOpen ? 'caret-up' : 'caret-down'}
                </FontAwesomeIcon>
              </DropdownToggle>
              <DropdownMenu compact={compact} width={width} isOpen={isOpen} {...getMenuProps()}>
                {isOpen && enableSearch ? (
                  <DropdownInput
                    {...getInputProps({
                      ref: input,
                      name,
                      onKeyDown(event) {
                        if (event.key === 'Backspace' && !inputValue) {
                          unselectItem(selectedItems[selectedItems.length - 1])
                        }
                      },
                    })}
                  />
                ) : null}
                {isOpen && showAll && items.length ? (
                  <DropdownItem
                    key="selectAll"
                    onClick={() => (allSelected ? clear() : selectAll(items))}
                    isSelected={allSelected}
                    showCheckbox
                  >
                    Select All
                  </DropdownItem>
                ) : null}
                {isOpen
                  ? items.reduce((acc, item) => {
                      const isSelected =
                        selectedValues.includes(item.value) ||
                        selectedValues.some((val) => equals(val, item.value))
                      if (
                        enableSearch &&
                        inputValue &&
                        !item.label.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
                      ) {
                        return acc
                      }
                      acc.push(
                        <DropdownItem
                          key={item.key ?? item.label ?? String(item.value)}
                          onClick={() => {
                            if (
                              (isSelected && disableUnselect) ||
                              (optionToggleCondition &&
                                !optionToggleCondition(item, isSelected, selectedValues))
                            ) {
                              return
                            }
                            toggleItem(item)
                          }}
                          isSelected={isSelected}
                          disableCheckbox={isSelected && disableUnselect}
                          showCheckbox={!noCheckboxes}
                          disabled={
                            optionToggleCondition &&
                            !optionToggleCondition(item, isSelected, selectedValues)
                          }
                        >
                          {item.content ?? <span>{itemToString(item)}</span>}
                        </DropdownItem>,
                      )
                      return acc
                    }, [])
                  : null}
                {isOpen && bottomContent && (
                  <div className={classes.bottomContent}>{bottomContent}</div>
                )}
              </DropdownMenu>
            </div>
            {!!error && (
              <Text variant="body2" className={clsx(classes.error, 'error')}>
                {error}
              </Text>
            )}
          </div>
        )
      }}
    </MultiDownshift>
  )
}
