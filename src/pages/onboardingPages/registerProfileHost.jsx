import React, { useState, useEffect } from 'react';
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

export default function RegisterProfileHost() {

    const [formValid, setFormValid] = useState(false);
    const [nameOfOrganization, setNameOfOrganization] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'nameOfOrganization':
                setNameOfOrganization(value.trim());
                break;
            case 'country':
                setCountry(value);
                break;
            case 'description':
                setDescription(value.trim());
                break;
            case 'website':
                setWebsite(value.trim());
                break;
            default:
                break;
        }

        checkFormValid();
    };

    const checkFormValid = () => {
        const isValid = nameOfOrganization !== '' && country !== '' && description !== '' && website !== '';
        setFormValid(isValid);
    };

    useEffect(() => {
        checkFormValid();
    }, [nameOfOrganization, country, description, website]);

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
                        value={nameOfOrganization}
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
                        value={countries.find((option) => option.label === country)}
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
                        value={description}
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
                        value={website}
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
                            type="submit"
                            name="host_proceed"
                            disabled={!formValid}
                            sx={{
                                width: '500px',
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
                            Host Proceed
                        </Button>
                    </Box>


                </Box>
            </Box>
        </>
    );
}