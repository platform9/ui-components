# Storybook Coverage TODO List

This file tracks components and elements in the codebase that currently lack a corresponding `*.stories.tsx` file.

## `src/elements`

### Root-level Elements
- [x] Divider (`src/elements/Divider.tsx`)
- [x] ImageDrop (`src/elements/ImageDrop.tsx`)
- [x] MultiValuesField (`src/elements/MultiValuesField.tsx`)
- [x] Spacer (`src/elements/Spacer.tsx`)
- [x] Text (`src/elements/Text.tsx`)
- [x] MultiToggleSwitch (`src/elements/MultiToggleSwitch.tsx`)
- [x] ToggleSwitch (`src/elements/ToggleSwitch.tsx`)

### Element Modules (Folders/Barrels)
- [x] **Badge** (`src/elements/badge/` - Badge, Badges)
- [x] **Button** (`src/elements/button/` - Button, CardButton, CopyButton, IconButton)
- [x] **Dropdown** (`src/elements/dropdown/` - AsyncDropdown, Dropdown, DropdownInput, DropdownItem, DropdownLabel, DropdownMenu, DropdownToggle, MultiDownshift, MultiDropdown)
- [x] **Grid** (`src/elements/grid/` - ControlledGrid, Grid, GridColumnsPopover, GridEmptyContent, GridHeader, GridPagination, GridRow, GridRowMenu, GridSearchFilter, GridTableHeading, GridToolbar)
- [x] **Breadcrumbs** (`src/elements/breadcrumbs/`)
- [x] **Card** (`src/elements/card/` - Card, CardBody, CardFooter, CardHeader, CardHeaderWithLink)
- [x] **Modal** (`src/elements/modal/` - Modal, ModalForm)
- [x] **Sidebar** (`src/elements/sidebar/` - Sidebar, NavPane, NavItem)
- [x] **Tooltip** (`src/elements/tooltip/`)
- [x] **Header** (`src/elements/header/`)
- [x] **Menu** (`src/elements/menu/` - Menu, MenuItem, ListMenu, PortalMenu)

---

## `src/components`

### Top-level Components
- [x] Alert
- [x] AutocompleteBase
- [x] Avatar
- [x] BulletList
- [x] Checkbox (Component version)
- [x] CodeBlock
- [x] ConfirmationDialog
- [x] CopyToClipboard
- [x] DisplayKeyValues
- [x] DisplayLabels
- [x] DocumentMeta
- [x] DropdownButton & DropdownButtons
- [x] ExternalLink
- [x] FilterSpec
- [x] FontAwesomeIcon
- [x] HelpContainer
- [x] InfoPanel
- [x] InfoTooltip
- [x] KeyValues
- [x] MultiSelect
- [x] NoContentMessage
- [x] PasswordValidationDisplay
- [x] PollingData
- [x] PresetField
- [x] QuantitySelector
- [x] SearchBar
- [x] SelectableCard
- [x] SimpleLink
- [x] SingleSelect
- [x] SubmitButton
- [x] Timeline
- [x] image-fallback
- [x] numbered-steps
- [x] passive-header-link

### Component Modules (Folders)

#### Accordion
- [ ] Accordion

#### Buttons (Component wrappers)
- [ ] BannerButton, CancelButton, CloseButton, CreateButton, NextButton, PrevButton, RefreshButton, SubmitButton

#### CardTable
- [ ] CardTable
- [ ] CardTableToolbar
- [ ] FilterToolbar

#### CodeMirror
- [ ] CodeMirror
- [ ] CodeMirrorModal

#### DataPointLine
- [x] DataPointLine
- [x] DataPoint

#### Graphs
*(StackedAreaChart and SingleAreaChart are covered)*
- [ ] PieGraph
- [ ] SemiCircleGraph

#### Labels & Annotations
- [ ] LabelsOrAnnotations

#### Log Viewer
- [ ] LogViewer

#### Page Container
- [ ] PageContainer
- [ ] PageContainerHeader

#### Progress
- [ ] Progress
- [ ] ProgressBar

#### ValidatedForm (Form System)
- [ ] ValidatedForm (Main wrapper)
- [ ] Form Fields (TextField, CheckboxField, DropdownField, ToggleSwitchField, etc.)
- [ ] Form Layouts (FormFieldCard, FormFieldSection)

#### Widgets
- [ ] DonutWidget
- [ ] PieUsageWidget
- [ ] UsageWidget
