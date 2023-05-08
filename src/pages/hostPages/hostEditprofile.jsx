import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CountrySelect from '../../Components/countrySelect'
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import theme from '../../Components/theme';

const interests = [
    'Abc',
    'Bac',
    'Cba',
];

const skills = [
    'Abc',
    'Bac',
    'Cba',
];

export default function HostEditprofile() {

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

    // State for uploaded avatar
    const [uploadedAvatar, setUploadedAvatar] = React.useState(null);

    // Event handler for avatar upload
    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Container for the whole form */}
            <Box
                sx={{
                    bgcolor: "background.paper",
                    minHeight: "100vh", // Use minHeight instead of height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    pl: 40,
                    pt: 5, // Add padding to the top
                    pb: 5, // Add padding to the bottom
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="flex-start">
                        {/* Edit Profile title */}
                        <Typography
                            component="h5"
                            variant="h5"
                            align="left"
                            color="text.secondary"
                            gutterBottom

                        >
                            Edit Profile
                        </Typography>

                        {/* Avatar and User Name */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* Avatar upload button */}
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                            >
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleAvatarUpload}
                                />
                                <Avatar src={uploadedAvatar} />
                            </IconButton>

                            {/* User Name input field */}
                            <TextField
                                id="outlined-username"
                                label="User Name"
                                defaultValue=""

                            />
                        </Stack>

                        {/* First Name and Last Name input fields */}
                        <Stack direction="row" spacing={2} alignItems="center">
                            {/* First Name input field */}
                            <TextField
                                id="outlined-firstname"
                                label="First Name"
                                defaultValue=""

                            />

                            {/* Last Name input field */}
                            <TextField
                                id="outlined-lastname"
                                label="Last Name"
                                defaultValue=""
                            />
                        </Stack>

                        {/* Country selection dropdown */}
                        <CountrySelect />

                        {/* Interests selection dropdown */}
                        <Autocomplete
                            multiple
                            id="outlined-multi"
                            options={interests}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Interests" />
                            )}
                            PopperComponent={({ children, ...popperProps }) => (
                                <Popper {...popperProps} placement="bottom-start" modifiers={[{ name: 'flip', enabled: false }]}>
                                    {children}
                                </Popper>
                            )}
                            style={{ width: 500 }}
                        />

                        {/* Skills selection dropdown */}
                        <Autocomplete
                            multiple
                            id="outlined-multi"
                            options={skills}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label="Select Skills" />
                            )}
                            PopperComponent={({ children, ...popperProps }) => (
                                <Popper {...popperProps} placement="bottom-start" modifiers={[{ name: 'flip', enabled: false }]}>
                                    {children}
                                </Popper>
                            )}
                            style={{ width: 500 }}
                        />

                        {/* Bio input field */}
                        <TextField
                            id="outlined-helperText"
                            label="Bio"
                            helperText="Add more details about your organization / company and what it does"
                            style={{ width: 500 }}
                        />

                        {/* Radio buttons for Student and Working professional */}
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                                <FormControlLabel value="Working professional" control={<Radio />} label="Working professional" />
                            </RadioGroup>
                        </FormControl>

                        {/* Cancel and Save buttons */}
                        <Stack direction="row" spacing={4}>
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
                        </Stack>

                    </Stack>
                </Container>
            </Box>
        </ThemeProvider>
    );
}