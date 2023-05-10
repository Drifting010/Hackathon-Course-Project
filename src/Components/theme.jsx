// Import the createTheme function from the MUI (Material-UI) library
import { createTheme } from '@mui/material/styles';

// Create a custom theme using the createTheme function
const theme = createTheme({
  // Define the color palette for the theme
  palette: {
    mode: 'dark', // Set the background color mode to dark (e.g., black)
    text: {
      primary: '#C9D1D9',
    },
  },
  // Define the Normal Typography settings for part one pages
  typography: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    letterSpacing: '0.75px',
  },
  // 
  components: {
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          '&.Mui-focused, &:hover': {
            color: '#FF9300',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF9300',
          },
        },
        notchedOutline: {
          border: '1px solid #30363D',
          borderRadius: '6px',
        },
      },
    },
  },


});

// Export the created custom theme to be used in other parts of the application
export default theme;
