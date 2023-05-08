import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../../Components/theme';

export default function HostProfile() {
   
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
        </ThemeProvider>
    );

}