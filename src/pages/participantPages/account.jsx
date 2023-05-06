import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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


const theme = createTheme();

export default function AccountSetting() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // State for Cancel and Save buttons hover
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

    // 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

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

                    <Stack spacing={2}>
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

                        <Box width="30ch">
                            {passwordMismatch && (
                                <Alert severity="error">Passwords do not match!</Alert>
                            )}
                        </Box>
                    </Stack>

                    <Box sx={{ mt: 3 }}> {/* Add margin-top to the ButtonGroup */}
                        <Button
                            onMouseEnter={handleCancelMouseEnter}
                            onMouseLeave={handleCancelMouseLeave}
                            sx={{ mr: 2, textTransform: 'none' }}
                            variant={isCancelHovered ? 'contained' : 'outlined'}
                        >
                            Cancel
                        </Button>

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