// Import the createTheme function from the MUI (Material-UI) library
import { createTheme } from '@mui/material/styles';

// Create a custom theme using the createTheme function
const theme = createTheme({
  // Define the color palette for the theme
  palette: {
    mode: 'dark', // Set the background color mode to dark (e.g., black)
    text: {
      primary: '#ffffff', // Set the primary text color to white
    },
  },
  // Define the typography settings for the theme
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Set the default font family for the theme
  },
});

// Export the created custom theme to be used in other parts of the application
export default theme;
