import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CountrySelect from '../../Components/countrySelect'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { getCurrentUser, uploadIcon } from '../../../src/Components/firebase/firebaseFunction';
import { useEffect } from 'react';

const interests = [
    'Abc',
    'Bac',
    'Cba',
];

// This is the main function that returns the editProfile component
export default function EditProfile() {
    // State for uploaded avatar
    if (currentUser != null ){
        const [uploadedAvatar, setUploadedAvatar] = React.useState(currentUser.photoURL);
    }
    const [uploadedAvatar, setUploadedAvatar] = React.useState(null);

    useEffect(() => {
        if (currentUser != null )
        setUploadedAvatar(currentUser.photoURL);
    },[currentUser])

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

    // Event handler for avatar upload
    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(currentUser.email);
            uploadIcon(file, currentUser.email ,setLoading)
        }
    };

    // 
    
   

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
                                disabled = {loading}
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
                                sx={{ background: '#21262D' }}
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
                            sx={{ width: '450px', background: '#21262D' }}
                        />

                        {/* Bio input field */}
                        <TextField
                            id="outlined-helperText"
                            label="Bio"
                            helperText="Add more details about your organization / company and what it does"
                            sx={{ width: '450px', background: '#21262D' }}
                        />

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