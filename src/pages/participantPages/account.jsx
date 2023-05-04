import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

export default function AccountSetting() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            

        </ThemeProvider>
    );
}