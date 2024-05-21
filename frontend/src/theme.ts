import { createTheme } from '@mui/material/styles';

// Define the color palette
const palette = {
  primary: '#fac800', // used for primary elements
  secondary: '#d3ba84', // used for secondary elements
  tertiary: '#928d81', // used for tertiary elements
  background: '#ffffff', // used for backgrounds
  border: '#1a2e35', // used for borders
  textPrimary: '#1a2e35', // primary text color
  textSecondary: '#928d81', // secondary text color
};

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      contrastText: palette.background,
    },
    secondary: {
      main: palette.secondary,
      contrastText: palette.background,
    },
    background: {
      default: palette.background,
      paper: palette.background,
    },
    text: {
      primary: palette.textPrimary,
      secondary: palette.textSecondary,
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 300,
      color: palette.textPrimary,
    },
    h2: {
      fontWeight: 400,
      color: palette.textPrimary,
    },
    h3: {
      fontWeight: 500,
      color: palette.textPrimary,
    },
    body1: {
      color: palette.textPrimary,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: `1px solid ${palette.tertiary}`,
        },
      },
    },
  },
});

export default theme;
