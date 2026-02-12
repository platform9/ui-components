# MUI v4 to v5 Migration Guide

This guide documents the migration from Material-UI v4 (`@material-ui/core`) to MUI v5 (`@mui/material`) with a focus on replacing `makeStyles` with the `styled` API.

## Overview

### Why Migrate?

- **Better React 18 compatibility**: MUI v5 fully supports React 18's concurrent features
- **Improved performance**: Emotion-based styling is more performant than JSS
- **Smaller bundle size**: No JSS runtime overhead
- **Better TypeScript support**: Improved type inference
- **Active maintenance**: MUI v5 receives active updates and bug fixes

### Key Changes

| MUI v4                | MUI v5                 |
| --------------------- | ---------------------- |
| `@material-ui/core`   | `@mui/material`        |
| `@material-ui/icons`  | `@mui/icons-material`  |
| `@material-ui/lab`    | `@mui/lab`             |
| `@material-ui/styles` | `@mui/material/styles` |
| `makeStyles`          | `styled` or `sx` prop  |
| `createMuiTheme`      | `createTheme`          |

---

## Installation

### Step 1: Install MUI v5 packages

```bash
yarn add @mui/material @mui/icons-material @mui/lab @emotion/react @emotion/styled
```

### Step 2: Remove MUI v4 packages (after full migration)

```bash
yarn remove @material-ui/core @material-ui/icons @material-ui/lab @material-ui/styles
```

---

## Automated Migration with Codemod

A codemod script is available to help automate the migration from `makeStyles` to `styled`:

```bash
# Dry run (preview changes without modifying files)
node scripts/migrate-makestyles-to-styled.cjs src/app/core/components/Avatar.tsx --dry-run

# Migrate a single file
node scripts/migrate-makestyles-to-styled.cjs src/app/core/components/Avatar.tsx

# Migrate a directory
node scripts/migrate-makestyles-to-styled.cjs src/app/plugins/openstack/components/

# Verbose output
node scripts/migrate-makestyles-to-styled.cjs src/app/core/ --verbose
```

### What the codemod does:

1. Finds files using `makeStyles` from `@mui/styles` or `@material-ui/styles`
2. Converts `makeStyles` definitions to `styled` components
3. Removes `useStyles()` calls
4. Updates imports accordingly
5. Adds `TODO` comments where you need to replace `className` with the new styled component

### After running the codemod:

1. Replace `<div className={classes.xxx}>` with `<StyledComponentName>`
2. Verify theme type annotations are correct
3. Review any dynamic styles or props
4. Test the component thoroughly

---

## Migration Patterns

### Pattern 1: `makeStyles` → `styled` (Recommended)

**Before (MUI v4):**

```tsx
import { makeStyles } from '@material-ui/styles'
import Theme from 'core/themes/model'

const useStyles = makeStyles<Theme>((theme) => ({
  container: {
    display: 'grid',
    gap: 16,
    padding: theme.spacing(2),
  },
  header: {
    backgroundColor: theme.components.header.background,
  },
}))

export default function MyComponent() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.header}>Header</div>
    </div>
  )
}
```

**After (MUI v5):**

```tsx
import { styled } from '@mui/material/styles'
import Theme from 'core/themes/model'

const Container = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  gap: 16,
  padding: theme.spacing(2),
}))

const Header = styled('div')(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.components.header.background,
}))

export default function MyComponent() {
  return (
    <Container>
      <Header>Header</Header>
    </Container>
  )
}
```

### Pattern 2: Simple styles without theme → `styled`

**Before:**

```tsx
const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
})
```

**After:**

```tsx
const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})
```

### Pattern 3: Conditional/Dynamic styles with props

**Before:**

```tsx
const useStyles = makeStyles<Theme, { isActive: boolean }>((theme) => ({
  button: {
    backgroundColor: ({ isActive }) =>
      isActive ? theme.palette.primary.main : theme.palette.grey[300],
  },
}))

function MyButton({ isActive }) {
  const classes = useStyles({ isActive })
  return <button className={classes.button}>Click</button>
}
```

**After:**

```tsx
interface StyledButtonProps {
  isActive: boolean
}

const StyledButton = styled('button')<StyledButtonProps>(({ theme, isActive }) => ({
  backgroundColor: isActive
    ? (theme as Theme).palette.primary.main
    : (theme as Theme).palette.grey[300],
}))

function MyButton({ isActive }: { isActive: boolean }) {
  return <StyledButton isActive={isActive}>Click</StyledButton>
}
```

### Pattern 4: Using `sx` prop for one-off styles

The `sx` prop is great for quick, inline styles that need theme access:

```tsx
import Box from '@mui/material/Box'

function MyComponent() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        p: 2,
        backgroundColor: (theme) => theme.components.frame.background,
      }}
    >
      Content
    </Box>
  )
}
```

### Pattern 5: Styling MUI components

**Before:**

```tsx
const useStyles = makeStyles((theme) => ({
  customButton: {
    borderRadius: 8,
    textTransform: 'none',
  },
}))

function MyComponent() {
  const classes = useStyles()
  return <Button className={classes.customButton}>Click</Button>
}
```

**After:**

```tsx
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)({
  borderRadius: 8,
  textTransform: 'none',
})

function MyComponent() {
  return <CustomButton>Click</CustomButton>
}
```

---

## Theme Migration

### Update ThemeManager.tsx

**Before:**

```tsx
import { createTheme as createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
```

**After:**

```tsx
import { createTheme, ThemeProvider } from '@mui/material/styles'
```

### Update theme model

The custom theme interface needs to extend the MUI v5 theme:

```tsx
// core/themes/model.ts
import { Theme as MuiTheme } from '@mui/material/styles'

// ... existing interfaces ...

type Theme = MuiTheme & AppTheme
export default Theme
```

---

## Common Import Updates

| v4 Import                                                   | v5 Import                                              |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| `import { makeStyles } from '@material-ui/styles'`          | `import { styled } from '@mui/material/styles'`        |
| `import { Theme } from '@material-ui/core'`                 | `import { Theme } from '@mui/material/styles'`         |
| `import Button from '@material-ui/core/Button'`             | `import Button from '@mui/material/Button'`            |
| `import { createMuiTheme } from '@material-ui/core/styles'` | `import { createTheme } from '@mui/material/styles'`   |
| `import { ThemeProvider } from '@material-ui/styles'`       | `import { ThemeProvider } from '@mui/material/styles'` |

---

## Naming Conventions for Styled Components

Follow these conventions for consistency:

1. **Container elements**: `[Purpose]Container` (e.g., `PageContainer`, `CardContainer`)
2. **Wrapper elements**: `[Purpose]Wrapper` (e.g., `ButtonWrapper`, `FormWrapper`)
3. **Styled MUI components**: `Styled[Component]` (e.g., `StyledButton`, `StyledCard`)
4. **Semantic elements**: Use semantic names (e.g., `Header`, `Footer`, `Sidebar`)

---

## Incremental Migration Strategy

Since there are **792 files** using `makeStyles`, we recommend an incremental approach:

### Phase 1: Setup (Week 1)

1. Install MUI v5 alongside v4 (they can coexist)
2. Update `ThemeManager.tsx` to support both
3. Create shared styled components in `core/elements/`

### Phase 2: Core Components (Weeks 2-3)

1. Migrate `core/components/` one by one
2. Update tests as needed

### Phase 3: Plugin Components (Weeks 4-8)

1. Migrate plugin components by feature area
2. Prioritize actively developed areas

### Phase 4: Cleanup (Week 9)

1. Remove MUI v4 packages
2. Remove any compatibility shims

---

## Codemod Tools

MUI provides codemods to help automate some migrations:

```bash
npx @mui/codemod v5.0.0/preset-safe src/
```

This handles:

- Import path updates
- Component prop renames
- Some `makeStyles` to `styled` conversions

---

## Testing Considerations

When migrating tests, update mock patterns:

**Before:**

```tsx
jest.mock('@material-ui/styles', () => ({
  ...jest.requireActual('@material-ui/styles'),
  makeStyles: () => () => ({}),
}))
```

**After:**

```tsx
jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  styled: () => (Component) => Component,
}))
```

---

## Complex Example: Dynamic Props with Theme

Here's a real-world example from `Alert.tsx` showing how to migrate a component with dynamic styles based on props:

**Before (MUI v4):**

```tsx
import { makeStyles } from '@material-ui/styles'
import Theme from 'core/themes/model'

interface AlertProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  maxWidth?: string
}

const useStyles = makeStyles<Theme, Partial<AlertProps>>((theme) => ({
  alert: {
    backgroundColor: ({ variant }) => theme.components.alert[variant].background,
    maxWidth: ({ maxWidth }) => (maxWidth ? maxWidth : 'unset'),
    borderTop: ({ variant }) => `1px solid ${theme.components.alert[variant].border}`,
  },
  alertTitle: {
    marginBottom: 10,
  },
}))

export default function Alert({ variant = 'primary', maxWidth }: AlertProps) {
  const classes = useStyles({ variant, maxWidth })
  return <article className={classes.alert}>...</article>
}
```

**After (MUI v5):**

```tsx
import { styled } from '@mui/material/styles'
import { ThemeV5 } from 'core/themes/model'

interface AlertProps {
  variant?: 'primary' | 'success' | 'warning' | 'error'
  maxWidth?: string
}

interface StyledAlertProps {
  variant: AlertProps['variant']
  maxWidth?: string
}

const StyledAlert = styled('article')<StyledAlertProps>(
  ({ theme, variant = 'primary', maxWidth }) => ({
    backgroundColor: (theme as ThemeV5).components.alert[variant].background,
    maxWidth: maxWidth ?? 'unset',
    borderTop: `1px solid ${(theme as ThemeV5).components.alert[variant].border}`,
    width: '100%',
    boxSizing: 'border-box',
    padding: 8,
    wordBreak: 'break-word',
  }),
)

const AlertTitle = styled('h5')({
  marginBottom: 10,
})

export default function Alert({ variant = 'primary', maxWidth }: AlertProps) {
  return (
    <StyledAlert variant={variant} maxWidth={maxWidth}>
      ...
    </StyledAlert>
  )
}
```

## Resources

- [Official MUI v5 Migration Guide](https://mui.com/material-ui/migration/migration-v4/)
- [styled() API Reference](https://mui.com/system/styled/)
- [sx prop Documentation](https://mui.com/system/getting-started/the-sx-prop/)
