import { createTheme } from '@mui/material/styles';

// Define the color palette
const palette = {
  ivory: '#f2f1ef', // used for backgrounds and for secondary text
  lightGray: '#d9d2cc', // used for borders and dividers
  sandy: '#d9b18e', // primary color for buttons and highlights
  terraCotta: '#a67564', // secondary color for icons and accents
  mahogany: '#412c27', // primary text color and some headers
};

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: palette.sandy,
      contrastText: palette.ivory,
    },
    secondary: {
      main: palette.terraCotta,
      contrastText: palette.ivory,
    },
    background: {
      default: palette.ivory,
      paper: palette.lightGray,
    },
    text: {
      primary: palette.mahogany,
      secondary: palette.terraCotta,
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 300, // Lighter weight for larger headers
      color: palette.mahogany,
    },
    h2: {
      fontWeight: 400,
      color: palette.mahogany,
    },
    button: {
      textTransform: 'none', // Buttons have regular casing, not uppercase
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadow from cards for a flatter design
          border: `1px solid ${palette.lightGray}`, // Add a subtle border
        },
      },
    },
  },
});

export default theme;
