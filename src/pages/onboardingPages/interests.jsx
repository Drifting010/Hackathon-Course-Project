import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../Components/AppContextProvider'
import TagsSelector from '../../Components/tagsSelector'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// This is the main function that returns the interests component
export default function Interests({ TagsSelectorComponent = TagsSelector }) {
    // TODO: import firebase function from Context API 3个函数 - 两个创建 1个取数
    const { createParticipantProfile, createHostProfile, getAllTags } = useContext(AppContext);


    // obtain data from local storage
    const role = window.localStorage.getItem('role');

    // obtain profile data from local storage
    const storedProfile = role === 'participant'
        ? JSON.parse(window.localStorage.getItem('participantProfile'))
        : JSON.parse(window.localStorage.getItem('hostProfile'))

    // state hook for profile data management
    const [profile, setProfile] = useState(storedProfile);

    // if (role === 'participant') {
    //     setProfile(JSON.parse(window.localStorage.getItem('participantProfile')));
    // } else {
    //     setProfile(JSON.parse(window.localStorage.getItem('hostProfile')));
    // }
    // const participantProfile = JSON.parse(window.localStorage.getItem('participantProfile'));

    // TODO: Sample tags for the user to choose from
    // const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10', 'Tag 11', 'Tag 12'];

    // obtain tags from DB
    const collectionName = role === 'participant' ? 'participantTags' : 'hostTags';
    const [tags, setTags] = useState([])

    useEffect(() => {
        async function fetchData() {
            const storedTags = await getAllTags(collectionName);
            setTags(storedTags);
        }
        fetchData();
    }, []);

    // const tags = getAllTags('participantTags');
    console.log(tags);

    // console.log(participantProfile);
    // state hook for profile
    // const [profile, setProfile] = useState(participantProfile);

    // Function to handle the submission of participant or host profile
    const handleTagsSubmit = (selectedTags) => {
        console.log('Selected tags:', selectedTags);
        setProfile((prevState) => ({
            ...prevState,
            tags: selectedTags
        }))
    };

    // TODO: firebase function - create user profile based on role
    useEffect(() => {
        async function registerProfile() {
            if (role === 'participant') {
                await createParticipantProfile(profile);
            } else {
                await createHostProfile(profile);
            }
        }
        registerProfile();
    }, [profile])

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
                        width: '100%',
                    }}
                >
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={10}>
                            {/* Display a heading for the interests selection */}
                            <Typography
                                sx={{
                                    mb: '20px',
                                    ml: '240px',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: '25px',
                                    fontWeight: 700,
                                    letterSpacing: '0.75px',
                                    color: '#FFFFFF',
                                }}
                            >
                                What are you interested in?
                            </Typography>

                            {/* Display a sub-heading instructing users to select at least 5 interests */}
                            <Typography
                                sx={{
                                    mb: '20px',
                                    ml: '240px',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: '14px',
                                    fontWeight: 300,
                                    letterSpacing: '0.75px',
                                    color: '#FFFFFF',
                                }}
                            >
                                Select at least 5 interests
                            </Typography>

                            {/* Render the TagsSelectorComponent with the provided tags and onSubmit function */}
                            <TagsSelectorComponent tags={tags} onSubmit={handleTagsSubmit} />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

