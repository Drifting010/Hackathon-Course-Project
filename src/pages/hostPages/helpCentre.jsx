import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default function HelpCentre() {
   
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
        </ThemeProvider>
    );

}