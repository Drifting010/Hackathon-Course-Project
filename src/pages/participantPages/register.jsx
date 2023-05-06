import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const theme = createTheme();

export default function RegisterHackathons() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Box component to create a container that fills the viewport height and centers its content */}
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
                    {/* Typography component for displaying the hackathon registration title */}
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.secondary"
                        gutterBottom
                        mb={5} // Add margin-bottom here
                    >
                        Register Project Event bengal tiger
                    </Typography>

                    {/* Typography component for displaying the hackathon rules and information */}
                    <Typography
                        variant="h5"
                        align="left"
                        color="text.secondary"
                        paragraph
                        mb={5} // Add margin-bottom here
                    >
                        Infor from host about rules for the hackathon
                    </Typography>

                    {/* Box component wrapping the first TextField and providing margin-bottom */}
                    <Box width="100%" mb={5}>
                        <TextField
                            required
                            id="outlined-required"
                            label="What do you do?"
                            placeholder="Be creative here"
                            multiline
                            rows={4}
                            fullWidth // Use fullWidth to take up the entire width of the parent Box
                        />
                    </Box>

                    {/* Box component wrapping the second TextField and providing margin-bottom */}
                    <Box width="100%" mb={5}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter description"
                            multiline
                            rows={4}
                            fullWidth // Use fullWidth to take up the entire width of the parent Box
                        />
                    </Box>

                        {/* Cancel button to cancel the registration process */}
                        <Button sx={{ mr: 2, textTransform: 'none' }}>Cancel</Button>
                        {/* Register button to submit the registration information */}
                        <Button sx={{ textTransform: 'none' }}>Register</Button>
                    </ButtonGroup>

                </Container>
            </Box>
        </ThemeProvider>
    );
}