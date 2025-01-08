// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008080', // Teal color
    },
    secondary: {
      main: '#888', 
    },
  },
  typography: {
    body1: {
      fontSize: '14px',
      fontWeight: 500,
      // color: 'white',
    },
  },
  spacing: 8, // Default spacing multiplier
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
