import { styled } from '@mui/material/styles'

// Common styled components for shared use across the app

// Container for layout elements
export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}))

// Wrapper for grouping elements
export const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

// FlexContainer for flexible layouts
export const FlexContainer = styled('div')({
  display: 'flex',
})

// GridContainer for grid layouts
export const GridContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
}))

// HeaderContainer for headers
export const HeaderContainer = styled('header')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}))

// FooterContainer for footers
export const FooterContainer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
}))
