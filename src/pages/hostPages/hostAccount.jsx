import React, { useState, useContext } from 'react';
import { TextField, InputAdornment, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Navigate } from 'react-router-dom/dist';
import { AppContext } from '../../Components/AppContextProvider';
import { styled } from '@mui/system';

const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#4474F1',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#4474F1',
        },
    },
    '& .MuiInputLabel-outlined': {
        '&:hover': {
            color: '#4474F1',
        },
        '&.Mui-focused': {
            color: '#4474F1',
        },
    },
});


// This is the main function that returns the accountSetting component
export default function HostAccountSetting() {
    // Import firebase function thourgh Context API
    const { resetPassword } = useContext(AppContext);

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

    // States for form submit control
    const [isSubmitting, setSubmtting] = useState(false);

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

    // Function to handle form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await resetPassword(password);
        setSubmtting(true);
    }

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
            {isSubmitting && <Navigate to='/login' />}
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
                            fontSize: '25px',
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
                        <CssTextField
                            fullWidth
                            label="Password"
                            type="password"
                            name="p_pwd"
                            value={password}
                            onChange={handlePasswordChange}
                            error={!!errorMessage.pwd}
                            helperText={errorMessage.pwd}
                            sx={{
                                background: '#21262D',
                            }}
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
                        <CssTextField
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
                            // type="submit"
                            onClick={(event) => { handleFormSubmit(event) }}
                            name="save"
                            disabled={!pwdValid || !pwdConfirmValid}
                            sx={{
                                width: '425px',
                                height: '40px',
                                background: '#4474F1',
                                color: '#F7F7FC',
                                textTransform: 'none',
                                borderRadius: '5px',
                                '&:disabled': {
                                    background: '#4474F1',
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