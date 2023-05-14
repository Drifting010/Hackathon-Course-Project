import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CountrySelect, { countries } from '../../Components/countrySelect';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import Button from '@mui/material/Button';

// Define a RegisterProfileHost component for registering a host (organization)
export default function RegisterProfileHost() {

    // import user data stored in browser by signup page 
    const user = JSON.parse(window.localStorage.getItem('user'));
    const email = user.h_email.toLowerCase();

    // state: participantProfile
    const [hostProfile, setHostProfile] = useState({
        country: '',
        description: '',
        tags: [],
        user: email,
        userIcon: '',
        nameOfOrganization: '',
        website: ''
    });

    // store data in the browser
    useEffect(() => {
        window.localStorage.setItem('hostProfile', JSON.stringify(hostProfile));
    }, [hostProfile]);

    const [isSubmitting, setSubmitting] = useState(false);

    // State variables for form validation and form fields
    const [formValid, setFormValid] = useState(false);

    // Function to handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Add form submission logic here
        setSubmitting(true);
    };

    // Function to handle form data changes
    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        // Update the state based on the input field being changed
        setHostProfile((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to check form validity
    const checkFormValid = () => {
        const isValid = 
            hostProfile.nameOfOrganization !== '' 
            && hostProfile.country !== '' && hostProfile.description !== '' 
            && hostProfile.website !== '';
        setFormValid(isValid);
    };

    // Effect hook to update form validation state
    useEffect(() => {
        checkFormValid();
    }, [hostProfile.nameOfOrganization, hostProfile.country, hostProfile.description, hostProfile.website]);

    return (
        <>
            {isSubmitting && <Navigate to='/interests' />}
            {/* Outer Box for centering the inner content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    pt: '1rem',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* NameOfOrganization Input */}
                    <Typography
                        sx={{
                            mb: '10px',
                            mt: '5rem',
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
                        label="Name of company / organization"
                        name="nameOfOrganization"
                        value={hostProfile.nameOfOrganization}
                        onChange={handleFormDataChange}
                        sx={{ mb: '20px', width: '500px', background: '#21262D' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BusinessOutlinedIcon />
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
                        value={countries.find((option) => option.label === hostProfile.country)}
                        onChange={(event, newValue) => {
                            handleFormDataChange({ target: { name: 'country', value: newValue || '' } });
                        }}
                    />

                    {/* Description Input */}
                    <Typography
                        sx={{
                            mt: '15px',
                            mb: '15px',
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
                            mb: '25px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '14px',
                            fontWeight: 300,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        Add more details about your organization / company and what it does
                    </Typography>
                    <TextField
                        label="Description"
                        name="description"
                        value={hostProfile.description}
                        onChange={handleFormDataChange}
                        sx={{ mb: '15px', width: '500px', background: '#21262D' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Website Input */}
                    <Typography
                        sx={{
                            mb: '20px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '18px',
                            fontWeight: 700,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                    >
                        What is your website?
                    </Typography>
                    <TextField
                        label="www.yourwebsite.com"
                        name="website"
                        value={hostProfile.website}
                        onChange={handleFormDataChange}
                        sx={{ mb: '30px', width: '500px', background: '#21262D' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LinkOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Submit button */}
                    <Box >
                        <Button
                            onClick={handleFormSubmit}
                            name="host_proceed"
                            disabled={!formValid}
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
                            Host Proceed
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}