import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CountrySelect, { countries } from '../../Components/countrySelect';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Button from '@mui/material/Button';

// Define RegisterProfileParticipant component
export default function RegisterProfileParticipant() {
    // State hooks for form validation, username, country, and description
    const [formValid, setFormValid] = useState(false);
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');

    // Event handler for form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
    };

    // Event handler for input fields' data changes
    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        // Update the state based on the input field being changed
        switch (name) {
            case 'username':
                setUsername(value.trim());
                break;
            case 'country':
                setCountry(value);
                break;
            case 'description':
                setDescription(value.trim());
                break;
            default:
                break;
        }
        // Validate the form after each change
        // checkFormValid();
    };

    // Check if the form is valid
    const checkFormValid = () => {
        const isValid = username !== '' && country !== '' && description !== '';
        // Update form valid state
        setFormValid(isValid);
    };

    // Effect hook to check form validity when any input field changes
    useEffect(() => {
        checkFormValid();
    }, [username, country, description]);

    // Render the component
    return (
        <>
            {/* Outer Box for centering the inner content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    pt: '5rem',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* Username Input */}
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
                        Hey, Welcome!
                        <CelebrationOutlinedIcon />
                    </Typography>
                    <Typography
                        sx={{
                            mb: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Lets get started
                    </Typography>
                    <TextField
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(event) => handleFormDataChange(event)}
                        sx={{ mb: '20px', width: '500px', background: '#21262D' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Country Selector */}
                    <Typography
                        sx={{
                            mb: '10px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Where are you from?
                    </Typography>
                    <Typography
                        sx={{
                            mb: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Location
                    </Typography>
                    <CountrySelect
                        name="country"
                        value={countries.find((option) => option.label === country)}
                        onChange={(event, newValue) => {
                            handleFormDataChange({ target: { name: 'country', value: newValue || '' } });
                        }}
                    />

                    {/* Description Input */}
                    <Typography
                        sx={{
                            mt: '10px',
                            mb: '10px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        What do you do?
                    </Typography>
                    <Typography
                        sx={{
                            mb: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        I am a
                    </Typography>
                    <TextField
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(event) => handleFormDataChange(event)}
                        sx={{ mb: '30px', width: '500px', background: '#21262D' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Submit button */}
                    <Box >
                        <Button
                            type="submit"
                            name="participant_proceed"
                            disabled={!formValid}
                            href='./interests'
                            sx={{
                                width: '500px',
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
                </Box>
            </Box>
        </>
    );
}