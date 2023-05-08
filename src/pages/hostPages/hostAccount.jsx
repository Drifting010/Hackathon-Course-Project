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

import theme from '../../Components/theme';

// This is the main function that returns the hostAccountSetting component
export default function HostAccountSetting() {
    
    // States to manage password and confirm password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    // Functions to toggle password and confirm password visibility
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    // Function to prevent default behavior on mousedown event in the password field
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // States for Cancel and Save buttons hover
    const [isCancelHovered, setIsCancelHovered] = React.useState(false);
    const [isSaveHovered, setIsSaveHovered] = React.useState(false);

    // Event handlers for Cancel and Save buttons hover
    const handleCancelMouseEnter = () => {
        setIsCancelHovered(true);
    };

    const handleCancelMouseLeave = () => {
        setIsCancelHovered(false);
    };

    const handleSaveMouseEnter = () => {
        setIsSaveHovered(true);
    };

    const handleSaveMouseLeave = () => {
        setIsSaveHovered(false);
    };

    // States for managing password and confirm password values and password mismatch
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // Functions to handle changes in password and confirm password fields
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Function to handle the onBlur event for the confirm password field, checking for a mismatch
    const handleConfirmPasswordBlur = (e) => {
        if (e.target.value !== '' && e.target.value !== password) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
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
                        Account setting
                    </Typography>

                    {/* Password and Confirm Password inputs wrapped in a Stack component */}
                    <Stack spacing={2}>
                        {/* Password input field */}
                        <Box width="25ch">
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">
                                    Change Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        
                         {/* Confirm password input field */}
                        <Box width="25ch">
                            <FormControl sx={{ m: 1 }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-confirm-password">
                                    Double confirm
                                </InputLabel>
                                <Input
                                    id="standard-adornment-confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onBlur={handleConfirmPasswordBlur}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        
                        {/* Password mismatch error message */}
                        <Box width="30ch">
                            {passwordMismatch && (
                                <Alert severity="error">Passwords do not match!</Alert>
                            )}
                        </Box>
                    </Stack>
                    
                    {/* Cancel and Save buttons */}
                    <Box sx={{ mt: 3 }}> {/* Add margin-top to the ButtonGroup */}
                        {/* Cancel button */}
                        <Button
                            onMouseEnter={handleCancelMouseEnter}
                            onMouseLeave={handleCancelMouseLeave}
                            sx={{ mr: 2, textTransform: 'none' }}
                            variant={isCancelHovered ? 'contained' : 'outlined'}
                        >
                            Cancel
                        </Button>
                        
                        {/* Save button */}
                        <Button
                            onMouseEnter={handleSaveMouseEnter}
                            onMouseLeave={handleSaveMouseLeave}
                            sx={{ textTransform: 'none' }}
                            variant={isSaveHovered ? 'contained' : 'outlined'}
                        >
                            Save
                        </Button>
                    </Box>

                </Container>
            </Box>
        </ThemeProvider>
    );

}