// import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../Components/AppContextProvider'
import TagsSelector from '../../Components/tagsSelector'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// This is the main function that returns the interests component
export default function Interests({ TagsSelectorComponent = TagsSelector }) {
    // import firebase functions from Context API
    const { createParticipantProfile, createHostProfile, getAllTags } = useContext(AppContext);

    // obtain data from local storage
    const role = window.localStorage.getItem('role');

    // obtain profile data from local storage
    const storedProfile = role === 'participant'
        ? JSON.parse(window.localStorage.getItem('participantProfile'))
        : JSON.parse(window.localStorage.getItem('hostProfile'))

    // state hook for profile data management
    const [profile, setProfile] = useState(storedProfile);
    // state hook for data submit control
    const [isSubmitting, setSubmitting] = useState(false);

    // obtain tags from DB
    const collectionName = role === 'participant' ? 'participantTags' : 'hostTags';
    const [tags, setTags] = useState([])

    // initialize tag data
    useEffect(() => {
        async function fetchData() {
            const storedTags = await getAllTags(collectionName);
            setTags(storedTags);
        }
        fetchData();
    }, []);

    // Function to handle the submission of participant or host profile
    const handleTagsSubmit = (selectedTags) => {
        console.log('Selected tags:', selectedTags);
        setProfile((prevState) => ({
            ...prevState,
            tags: selectedTags
        }));
        setSubmitting(true);
    };

    // Create user profile in DB based on role
    useEffect(() => {
        if (isSubmitting) {
            async function registerProfile() {
                if (role === 'participant') {
                    await createParticipantProfile(profile);
                } else {
                    await createHostProfile(profile);
                }
            }
            registerProfile();
        }
    }, [profile, isSubmitting])

    return (
        <>
            {isSubmitting && <Navigate to='/login' />}
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