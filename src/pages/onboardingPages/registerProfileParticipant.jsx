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

export default function RegisterProfileParticipant() {

    const [formValid, setFormValid] = useState(false);
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
    };

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;

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

        checkFormValid();
    };

    const checkFormValid = () => {
        const isValid = username !== '' && country !== '' && description !== '';
        setFormValid(isValid);
    };

    useEffect(() => {
        checkFormValid();
    }, [username, country, description]);

    return (
        <>
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
                        onChange={handleFormDataChange}
                        sx={{ mb: '20px', width: '450px', background: '#21262D' }}
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

                    {/* Description */}
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
                        onChange={handleFormDataChange}
                        sx={{ mb: '30px', width: '450px', background: '#21262D' }}
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
                            sx={{
                                width: '450px',
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
                            Participant Proceed
                        </Button>
                    </Box>


                </Box>
            </Box>
        </>
    );
}