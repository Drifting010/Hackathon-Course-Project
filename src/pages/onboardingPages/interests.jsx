import * as React from 'react';
import TagsSelector from '../../Components/tagsSelector'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// This is the main function that returns the interests component
export default function Interests({ TagsSelectorComponent = TagsSelector }) {
    // Sample tags for the user to choose from
    const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10', 'Tag 11', 'Tag 12'];

    // Function to handle the submission of selected tags
    const handleTagsSubmit = (selectedTags) => {
        console.log('Selected tags:', selectedTags);
        // Handle the selected tags, for example, send a request to the server

    };

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
                        <Grid item xs={12} sm={8}>
                            {/* Display a heading for the interests selection */}
                            <Typography
                                sx={{
                                    mb: '20px',
                                    ml:'140px',
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
                                    ml:'140px',
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

