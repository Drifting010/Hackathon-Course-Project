import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Components/AppContextProvider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Navigate } from 'react-router-dom';

// Signup function component
export default function Signup() {
    // Import firebase function from Context API
    const { createUserWithEmailAndPasswordFunction } = useContext(AppContext);

    // State variables for validity of email, password, and password confirmation fields
    const [emailValid, setEmailValid] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdConfirmValid, setPwdConfirmValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    // State variable for storing error messages related to email, password, and password confirmation
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        pwd: '',
        pwdConfirm: '',
    });

    // State variables for storing form data and submitting state
    const [user, setUser] = useState({
        p_email: '',
        p_pwd: '',
        p_pwdConfirm: '',
        h_email: '',
        h_pwd: '',
        h_pwdConfirm: '',
        role: 'participant' // by default
    });

    // store data in local storage
    useEffect(() => {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('role', user.role);
    }, [user]);

    // state hook for submit control
    const [isSubmitting, setSubmitting] = useState(false);

    // useEffect to validate the form when email, password, or password confirmation validity changes
    useEffect(() => {
        validateForm();
    }, [emailValid, pwdValid, pwdConfirmValid]);

    // Function to handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // data to submit
        let email, password, role;
        email = user.role === 'participant' ? user.p_email : user.h_email;
        password = user.role === 'participant' ? user.p_pwd : user.h_pwd;
        role = user.role === 'participant' ? 'participant' : 'host';
        // register new user
        await createUserWithEmailAndPasswordFunction(email, password, role);
        // submission approved
        setSubmitting(true);
    }

    // Function to handle form data changes
    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        const trimmedValue = value.trim();

        setUser((prevState) => ({
            ...prevState,
            [name]: name === 'p_pwd' || name === 'h_pwd' ? (trimmedValue || '') : trimmedValue,
        }));

        validateField(name, trimmedValue);
    };

    // Functions for validating email, password, and password confirmation
    const validateEmail = (email) => {
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        return emailRegex.test(email);
    }
    const validatePassword = (password) => {
        return password.length >= 8;
    }
    const validateConfirmPassword = (pwdConfirm) => {
        return pwdConfirm === user.p_pwd || pwdConfirm === user.h_pwd;
    }

    // Function to validate a specific field
    const validateField = (fieldName, value) => {
        let fieldValidationErrors = errorMessage;
        let isEmailValid = emailValid;
        let isPwdValid = pwdValid;
        let isPwdConfirmValid = pwdConfirmValid;

        switch (fieldName) {
            case 'p_email':
            case 'h_email':
                isEmailValid = validateEmail(value);
                setEmailValid(isEmailValid);
                fieldValidationErrors.email = isEmailValid ? '' : 'Email is invalid';
                break;
            case 'p_pwd':
            case 'h_pwd':
                isPwdValid = validatePassword(value);
                setPwdValid(isPwdValid);
                fieldValidationErrors.pwd = isPwdValid ? '' : 'Password must be at least 8 characters';
                break;
            case 'p_pwdConfirm':
            case 'h_pwdConfirm':
                isPwdConfirmValid = validateConfirmPassword(value);
                setPwdConfirmValid(isPwdConfirmValid);
                fieldValidationErrors.pwdConfirm = isPwdConfirmValid ? '' : 'Passwords do not match';
                break;
            default:
                break;
        }
        setErrorMessage(fieldValidationErrors);
    }

    // Function to validate the entire form
    const validateForm = () => {
        setFormValid(emailValid && pwdValid && pwdConfirmValid);
    }

    // Render the signup form with input fields, radio buttons, and submit button
    return (
        <>
            {isSubmitting && (
                <Navigate to={user.role === 'participant' ? '/register_profile_participant' : '/register_profile_host'} />
            )}
            {/* Outer Box for centering the inner content */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* Heading */}
                    <Typography
                        sx={{
                            mb: '10px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '25px',
                            fontWeight: 700,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Create a new account
                    </Typography>

                    {/* Subheading */}
                    <Typography
                        sx={{
                            mb: '10px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Enter your details
                    </Typography>

                    {/* Radio buttons for role selection */}
                    <FormControl component="fieldset" sx={{ mb: '10px' }}>
                        <RadioGroup
                            row
                            value={user.role}
                            onChange={(event) =>
                                setUser({ ...user, role: event.target.value })
                            }
                        >
                            <FormControlLabel
                                value="participant"
                                control={<Radio />}
                                label="Participant"
                            />
                            <FormControlLabel
                                value="host"
                                control={<Radio />}
                                label="Host"
                            />
                        </RadioGroup>
                    </FormControl>

                    {/* Form for participant */}
                    {user.role === 'participant' && (
                        <form onSubmit={(event) => handleFormSubmit(event)}>
                            {/* Email input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Email (Participant)"
                                    type="text"
                                    name="p_email"
                                    value={user.p_email}
                                    onChange={handleFormDataChange}
                                    error={!!errorMessage.email}
                                    helperText={errorMessage.email}
                                    sx={{ background: '#21262D', }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            {/* Password input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Password (Participant)"
                                    type="password"
                                    name="p_pwd"
                                    value={user.p_pwd}
                                    onChange={handleFormDataChange}
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

                            {/* Confirm password input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password (Participant)"
                                    type="password"
                                    name="p_pwdConfirm"
                                    value={user.p_pwdConfirm}
                                    onChange={handleFormDataChange}
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
                            <Box mb={3}>
                                <Button
                                    type="submit"
                                    name="participant_proceed"
                                    disabled={!formValid}
                                    sx={{
                                        width: '425px',
                                        height: '40px',
                                        background: '#FF9300',
                                        textTransform: 'none',
                                        borderRadius: '5px',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#F7F7FC',
                                        '&:disabled': {
                                            background: 'rgba(255, 147, 0, 0.5)',
                                        },
                                    }}
                                >
                                    Participant Proceed
                                </Button>
                            </Box>
                        </form>
                    )}

                    {/* Form for host */}
                    {user.role === 'host' && (
                        <form>
                            {/* Email input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Email (Host)"
                                    type="text"
                                    name="h_email"
                                    value={user.h_email}
                                    onChange={handleFormDataChange}
                                    error={!!errorMessage.email}
                                    helperText={errorMessage.email}
                                    sx={{ background: '#21262D', }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            {/* Password input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Password (Host)"
                                    type="password"
                                    name="h_pwd"
                                    value={user.h_pwd}
                                    onChange={handleFormDataChange}
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

                            {/* Confirm password input */}
                            <Box width="425px" mb={3}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password (Host)"
                                    type="password"
                                    name="h_pwdConfirm"
                                    value={user.h_pwdConfirm}
                                    onChange={handleFormDataChange}
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
                            <Box mb={3}>
                                <Button
                                    name="host_proceed"
                                    disabled={!formValid}
                                    onClick={handleFormSubmit}
                                    sx={{
                                        width: '425px',
                                        height: '40px',
                                        background: '#FF9300',
                                        textTransform: 'none',
                                        borderRadius: '5px',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        color: '#F7F7FC',
                                        '&:disabled': {
                                            background: 'rgba(255, 147, 0, 0.5)',
                                        },
                                    }}
                                >
                                    Host Proceed
                                </Button>
                            </Box>
                        </form>
                    )}
                </Box>
            </Box>
        </>
    );

}