import React, { ReactNode, FC, PropsWithChildren, useMemo } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import Theme, { TypographyModel } from 'src/theme-manager/themes/model'
import { GridFilteringProps } from './hooks/useGridFiltering'
import FontAwesomeIcon from 'src/components/FontAwesomeIcon'
import Text from 'src/elements/Text'
import { GridBatchActionsProps } from './hooks/useGridSelectableRows'
import darkTheme from 'src/theme-manager/themes/modes/dark'
import generateTestId from 'src/utils/test-helpers'
// import { useCustomTheme } from 'core/themes/ThemeManager'
import GridColumnsPopover from './GridColumnsPopover'
import { GridManagedColumnsProps } from './hooks/useGridManagedColumns'
import Tooltip from 'src/elements/tooltip'
import { useCustomTheme } from 'src/theme-manager/ThemeManager'

interface GridToolbarProps<T, GF extends Record<string, unknown>, F extends Record<string, unknown>>
  extends GridFilteringProps<GF, F>,
    GridBatchActionsProps<T>,
    GridManagedColumnsProps {
  compact?: boolean
  label?: string
  onRefresh?: () => void | Promise<void>
  extraToolbarContent?: ReactNode
  ToolbarContainer?: FC<PropsWithChildren<{ className?: string; selectedCount?: number }>>
  showItemsCountInLabel?: boolean
  itemsCount?: number
  tooltip?: ReactNode
}

const useStyles = makeStyles<Theme, { compact?: boolean; selectedCount?: number }>((theme) => ({
  gridToolbar: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: ({ selectedCount }) =>
      selectedCount
        ? theme.components.table.activeToolbarColor
        : theme.components.table.toolbarColor,
    backgroundColor: ({ selectedCount }) =>
      selectedCount ? theme.components.table.activeToolbar : theme.components.table.toolbar,
    transitionTimingFunction: 'ease-in',
    transition: 'background-color .2s ease',
    border: 0,
    borderRadius: '4px 4px 0 0',
    padding: '8px 16px 8px 24px',
    minHeight: 56,
    borderBottom: `1px solid ${theme.components.table.border}`,
    boxSizing: 'border-box',
    '&:last-child td': {
      borderBottom: 0,
    },
  },
  label: {
    ...(theme.typography.subtitle2 as TypographyModel),
    color: 'inherit',
    marginRight: theme.spacing(3),
  },
  selectedCount: {
    color: 'inherit',
  },
  clearBtn: {
    cursor: 'pointer',
    color: theme.components.table.toolbarPassiveColor,
  },
  verticalLine: {
    borderLeft: `1px solid ${theme.components.typography.default}`,
    width: 1,
    height: 34,
    margin: theme.spacing(0, 1),
  },
  batchActions: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 12,
  },
  tools: {
    display: 'grid',
    gridAutoFlow: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gap: 16,
  },
  buttons: {
    display: 'grid',
    gridAutoFlow: 'column',
    marginRight: theme.spacing(1),
  },
  button: {
    ...theme.typography.inputTable,
    display: 'grid',
    gridAutoFlow: 'column',
    cursor: 'pointer',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    gap: 8,
    '&:hover': {
      backgroundColor: theme.components.table.hoverBackground,
    },
  },
  extraContent: {
    marginLeft: theme.spacing(1),
  },
  tooltip: {
    display: 'inline-block',
    marginLeft: 8,
  },
}))

const DefaultToolbarContainer: FC<
  PropsWithChildren<{
    selectedCount?: number
    className?: string
  }>
> = ({ children, selectedCount, ...props }) => {
  const [theme] = useCustomTheme()
  return (
    <ThemeProvider theme={selectedCount ? darkTheme : theme}>
      <div {...props}>{children}</div>
    </ThemeProvider>
  )
}

export default function GridToolbar<
  T,
  GF extends Record<string, unknown>,
  F extends Record<string, unknown>,
>(props: GridToolbarProps<T, GF, F>) {
  const classes = useStyles(props)
  const {
    label,
    columns,
    columnTogglers,
    selectedCount,
    batchActions,
    globalFilters,
    filters,
    onRefresh,
    extraToolbarContent,
    clearSelectedRows,
    multiSelectionEnabled,
    ToolbarContainer = DefaultToolbarContainer,
    columnHidingDisabled,
    showItemsCountInLabel = false,
    itemsCount = undefined,
    tooltip = undefined,
  } = props
  return (
    <ToolbarContainer selectedCount={selectedCount} className={classes.gridToolbar}>
      <div className={classes.batchActions}>
        <Text
          data-testid={generateTestId(label, 'label')}
          className={classes.label}
          variant="subtitle2"
          component="p"
        >
          {showItemsCountInLabel && itemsCount ? `${label} (${itemsCount})` : label}
          {tooltip && (
            <Tooltip className={classes.tooltip} message={tooltip}>
              <FontAwesomeIcon>question-circle</FontAwesomeIcon>
            </Tooltip>
          )}
        </Text>
        {selectedCount ? (
          <>
            {multiSelectionEnabled ? (
              <>
                <Text
                  data-testid={generateTestId('selected')}
                  variant="body2"
                  className={classes.selectedCount}
                  component="p"
                >
                  {`${selectedCount} Selected`}
                </Text>
                <Text
                  data-testid={generateTestId('clear', 'all')}
                  variant="body2"
                  className={classes.clearBtn}
                  component="p"
                  onClick={clearSelectedRows}
                >
                  {`Clear All`}
                </Text>
                <div className={classes.verticalLine} />
              </>
            ) : null}
            {batchActions?.map(({ key, label, triggerAction, BatchActionButton, ...props }) => (
              <BatchActionButton {...props} key={key} onClick={triggerAction}>
                {label}
              </BatchActionButton>
            ))}
          </>
        ) : null}
      </div>
      <div data-testid={generateTestId('search')} className={classes.tools}>
        {globalFilters.map(
          ({ key, filterValue, filterValues, updateFilterValue, FilterComponent, ...rest }) => (
            <FilterComponent
              key={String(key)}
              value={filterValue}
              filterValues={filterValues}
              onChange={updateFilterValue}
              {...rest}
            />
          ),
        )}

        {!selectedCount ? (
          <div className={classes.buttons}>
            {!columnHidingDisabled && (
              <GridColumnsPopover columns={columns} columnTogglers={columnTogglers} />
            )}
            <Text
              data-testid={generateTestId('refresh')}
              noWrap
              onClick={onRefresh}
              component="div"
              className={classes.button}
            >
              <FontAwesomeIcon>sync-alt</FontAwesomeIcon>
              Refresh
            </Text>
          </div>
        ) : null}

        {filters.map(
          ({ key, filterValue, filterValues, updateFilterValue, FilterComponent, ...rest }) => (
            <FilterComponent
              key={String(key)}
              value={filterValue}
              filterValues={filterValues}
              onChange={updateFilterValue}
              {...rest}
            />
          ),
        )}
        {extraToolbarContent ? (
          <div className={classes.extraContent}>{extraToolbarContent}</div>
        ) : null}
      </div>
    </ToolbarContainer>
  )
}
