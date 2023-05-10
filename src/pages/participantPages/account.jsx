import React, { useState } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';


// This is the main function that returns the accountSetting component
export default function AccountSetting() {

    // States for managing password and confirm password values and error messages
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState({
        pwd: '',
        pwdConfirm: '',
    });

    // States for managing password and confirm password validity
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState(false);

    // Functions to handle changes in password and confirm password fields
    const handlePasswordChange = (e) => {
        const trimmedValue = e.target.value.trim();
        setPassword(trimmedValue);
        validateField('password', trimmedValue);
    };

    const handleConfirmPasswordChange = (e) => {
        const trimmedValue = e.target.value.trim();
        setConfirmPassword(trimmedValue);
        validateField('confirmPassword', trimmedValue);
    };

    // Function to validate password and confirm password fields
    const validateField = (fieldName, value) => {
        let fieldValidationErrors = errorMessage;
        let isPwdValid = pwdValid;
        let isPwdConfirmValid = pwdConfirmValid;

        switch (fieldName) {
            case 'password':
                isPwdValid = validatePassword(value);
                setPwdValid(isPwdValid);
                fieldValidationErrors.pwd = isPwdValid
                    ? ''
                    : 'Password must be at least 8 characters';
                break;
            case 'confirmPassword':
                isPwdConfirmValid = validateConfirmPassword(value);
                setPwdConfirmValid(isPwdConfirmValid);
                fieldValidationErrors.pwdConfirm = isPwdConfirmValid
                    ? ''
                    : 'Passwords do not match';
                break;
            default:
                break;
        }
        setErrorMessage(fieldValidationErrors);
    };

    // Function to validate password length
    const validatePassword = (password) => {
        return password.length >= 8;
    };

    // Function to validate confirm password match
    const validateConfirmPassword = (pwdConfirm) => {
        return pwdConfirm === password;
    };

    return (
        <>
            {/* Center-aligned content */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >

                    {/* Title: Account setting */}
                    <Typography
                        sx={{
                            mb: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '18px',
                            fontWeight: 700,
                            lineHeight: '28px',
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Account setting
                    </Typography>

                    {/* Password TextField */}
                    <Box width="425px" mb={3}>
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="p_pwd"
                            value={password}
                            onChange={handlePasswordChange}
                            error={!!errorMessage.pwd}
                            helperText={errorMessage.pwd}
                            sx={{ background: '#21262D', }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Password Confirm TextField */}
                    <Box width="425px" mb={3}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            name="p_pwdConfirm"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={!!errorMessage.pwdConfirm}
                            helperText={errorMessage.pwdConfirm}
                            sx={{ background: '#21262D', }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Submit button */}
                    <Box width="425px" mb={3}>
                        <Button
                            type="submit"
                            name="save"
                            disabled={!pwdValid || !pwdConfirmValid}
                            sx={{
                                width: '425px',
                                height: '40px',
                                background: '#FF9300',
                                color: '#F7F7FC',
                                textTransform: 'none',
                                borderRadius: '5px',
                                '&:disabled': {
                                    background: 'rgba(255, 147, 0, 0.5)',
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Box>

                </Box>
            </Box>
        </>
    );

}