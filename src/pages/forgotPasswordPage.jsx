import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import theme from '../Components/theme';

// This is the main function that returns the accountSetting component
export default function ForgotPasswordPage() {
    
    // States for managing password and confirm password values and password mismatch
    const [password, setPassword] = useState('');

    // Functions to handle changes in password and confirm password fields
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


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
                    pl: 40,
                }}
            >
                <Container maxWidth="sm">
                    {/* Account setting title */}
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left" // Align the text to the left
                        color="text.secondary"
                        gutterBottom
                        mb={2} // Add margin-bottom here
                    >
                        Forgot password
                    </Typography>

                    <Typography
                        component="h6"
                        variant="h6"
                        align="left" // Align the text to the left
                        color="text.secondary"
                        gutterBottom
                        mb={2} // Add margin-bottom here
                    >
                        Enter in the email you used to sign up. We will send a confirmation email.
                    </Typography>

                    {/* Password and Confirm Password inputs wrapped in a Stack component */}
                    <Stack spacing={2}>
                        {/* Password input field */}
                        <Box width="25ch">
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                    Email
                                </InputLabel>
                                <Input
                                    id="forgot-email"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                        </Box>
                    </Stack>
                    
                    {/* Cancel and Save buttons */}
                    <Box sx={{ mt: 3 }}> {/* Add margin-top to the ButtonGroup */}
                        {/* Cancel button */}
                        <Button
                            sx={{ mr: 2, textTransform: 'none' }}
                        >
                            Cancel
                        </Button>
                        
                        {/* Save button */}
                        <Button

                            sx={{ textTransform: 'none' }}
                        >
                            Save
                        </Button>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    );

}