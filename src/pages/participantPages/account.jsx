import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const theme = createTheme();

export default function AccountSetting() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    height: '100vh', // 100% of viewport height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        component="h4"
                        variant="h4"
                        align="center"
                        color="text.secondary"
                        gutterBottom
                        mb={5} // Add margin-bottom here
                    >
                        Edit Profile
                    </Typography>


                </Container>
            </Box>
        </ThemeProvider>
    );
}