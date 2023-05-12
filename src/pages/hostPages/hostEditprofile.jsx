import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom/dist';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
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
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { getCurrentUser, uploadIcon } from '../../Components/firebase/firebaseFunction';
import { AppContext } from '../../Components/AppContextProvider';
import { getUser, getUserProfile, updateUserProfile } from '../../Components/firebase/firebaseFunction';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            background: '#21262D',
        },
    },
};
const interests = [
    '',
    'Abc',
    'Bac',
    'Cba',
];

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

const StyledFormControl = styled(FormControl)({
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

// This is the main function that returns the hostEditprofile component
export default function HostEditprofile() {

    const { currentUser, getAllTags } = React.useContext(AppContext);

    const [loading, setLoading] = React.useState(false);
    const [tags, setTags] = useState([]);
    // monitor submit action
    const [isSave, setSave] = React.useState(false);
    // Initialize the selectedTags state
    const [selectedTags, setSelectedTags] = useState([]);

    // State for uploaded avatar
    const [uploadedAvatar, setUploadedAvatar] = React.useState(null);
    const [uploadedFile, setUploadedFile] = React.useState(null);
    const [companyName, setCompanyName] = React.useState("");
    const [country, setCountry] = React.useState(null);
    const [bio, setBio] = React.useState("");
    const [website, setWebsite] = React.useState("");

    // Function to handle tag click events, toggling the selection state of a tag
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
        console.log(selectedTags);
    };

    // data initialization for interests dropdown menu
    React.useEffect(() => {
        async function fetchData() {
            const storedTags = await getAllTags('participantTags');
            setTags(storedTags);
        }
        fetchData();
    }, [])


    React.useEffect(() => {
        if (currentUser !== null) {
            setUploadedAvatar(currentUser.photoURL);

            const user = getUserProfile(currentUser.email);
            user.then(function (result) {
                setCompanyName(result.nameOfOrganization);
                setCountry(result.country);
                setBio(result.description);
                setWebsite(result.website);
            });
        }
    }, [currentUser])

    // Event handler for avatar upload
    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAvatar(reader.result);
                setUploadedFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        const update = {
            nameOfOrganization: companyName,
            country: country,
            description: bio,
            website: website,
            user: currentUser.email,
            tags: selectedTags
        }

        await updateUserProfile(update, "host");
        uploadIcon(uploadedFile, currentUser.email, setLoading);
        setSave(true);
    }
    // 
    const [selectedInterests, setSelectedInterests] = React.useState([]);

    // 
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedInterests(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleDelete = (valueToDelete) => (event) => {
        event.stopPropagation(); // prevent event propagation
        setSelectedInterests((prev) => prev.filter((value) => value !== valueToDelete));
    };


    return (
        <>
            {isSave && <Navigate to='host_account' />}
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
                                sx={{
                                    ...theme.typography,
                                    fontWeight: 700,
                                    fontSize: '25px',
                                    color: '#FFFFFF',
                                }}

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
                                <CssTextField
                                    label="Name of organization"
                                    name="username"
                                    sx={{ mb: '20px', width: '250px', background: '#21262D' }}
                                    value={companyName}
                                    onChange={(e) => { setCompanyName(e.target.value) }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlineOutlinedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>

                            {/* Country selection dropdown */}
                            <CountrySelect
                                value={country}
                                onChange={(e, newInputVal) => { setCountry(newInputVal) }}
                            />

                            {/* Interests selection dropdown */}
                            <StyledFormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Select Interests</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={selectedInterests}
                                    onChange={handleChange}
                                    input={<OutlinedInput
                                        id="select-multiple-chip"
                                        label="Select Interests"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <InterestsOutlinedIcon />
                                            </InputAdornment>
                                        }
                                        sx={{ width: '500px', background: '#21262D' }}
                                    />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.filter(value => value).map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    onDelete={handleDelete(value)}
                                                    sx={{
                                                        border: '1px solid #4474F1',
                                                        color: '#4474F1',
                                                    }}
                                                    deleteIcon={<CloseIcon style={{ color: '#4474F1' }} />}
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {tags.map((tag, index) => (
                                        <MenuItem
                                            key={tag}
                                            value={tag}
                                            sx={{ display: index === 0 ? 'none' : 'block' }}
                                            onClick={() => handleTagClick(tag)}
                                        >
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </StyledFormControl>

                            {/* Description Input field */}
                            <CssTextField
                                id="outlined-helperText"
                                label="Description"
                                helperText="Add more details about your organization / company and what it does"
                                sx={{ width: '500px', background: '#21262D' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DescriptionOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                            />

                            {/* Website Input field */}
                            <CssTextField
                                label="www.yourwebsite.com"
                                sx={{ width: '500px', background: '#21262D' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LinkOutlinedIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Cancel and Save buttons */}
                            <Stack direction="row" spacing={4}>
                                {/* Cancel button */}
                                <Button
                                    variant='outlined'
                                    sx={{
                                        mr: 2,
                                        ml: 10,
                                        textTransform: 'none',
                                        width: '142px',
                                        height: '38px',
                                        borderRadius: '10px',
                                        borderColor: '#4474F1',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '14px',
                                        color: '#4474F1',
                                        '&:hover': {
                                            borderColor: '#4474F1',
                                        },

                                    }}

                                >
                                    Cancel
                                </Button>

                                {/* Save button */}
                                <Button
                                    onClick={handleSave}
                                    variant='contained'
                                    sx={{
                                        textTransform: 'none',
                                        width: '142px',
                                        height: '38px',
                                        borderRadius: '10px',
                                        background: '#4474F1',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        fontSize: '16px',
                                        color: '#F7F7FC',
                                        '&:hover': {
                                            background: '#21262D',
                                        },

                                    }}
                                >
                                    Save
                                </Button>
                            </Stack>

                        </Stack>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    );
}