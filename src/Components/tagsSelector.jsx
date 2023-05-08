import React, { useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

// TagsSelector component takes an array of tags and an onSubmit function as props
const TagsSelector = ({ tags, onSubmit }) => {
    // Initialize selectedTags state to hold the currently selected tags
    const [selectedTags, setSelectedTags] = useState([]);

    // Function to handle the selection and deselection of tags
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Function to handle the submission of selected tags
    const handleSubmit = () => {
        onSubmit(selectedTags);
    };

    return (
        <>
            <Box>

                {/* Create a grid container to display the tags in a responsive layout */}
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                            {/* Map the tags to Button components */}
                            {tags.map((tag) => (
                                <Box key={tag} m={1}>
                                    <Button
                                        sx={{
                                            padding: '7px 16px',
                                            gap: '8px',

                                            height: '32px',
                                            background: '#21262D',
                                            borderRadius: '39px',
                                            border: selectedTags.includes(tag) ? '1px solid #FF9300' : 'none',
                                        }}

                                        onClick={() => handleTagClick(tag)}
                                    >
                                        <Typography
                                            sx={{

                                                fontFamily: 'Inter',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                fontSize: '14px',
                                                textTransform: 'none',
                                                textAlign: 'center',
                                                letterSpacing: '0.75px',
                                                color: selectedTags.includes(tag) ? '#FF9300' : '#C9D1D9',
                                            }}
                                        >
                                            {tag}
                                        </Typography>
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                {/* Create a grid container for the Submit button */}

                <Box mt={2} display="flex" justifyContent="flex-start" sx={{ ml: '140px' }}>
                    {/* Create a Submit button that changes its appearance when hovered */}
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        sx={{
                            width: '425px',
                            height: '40px',
                            background: '#FF9300',
                            textTransform: 'none',
                            borderRadius: '5px',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '14px',
                            color: '#F7F7FC',
                        }}
                    >
                        Submit
                    </Button>
                </Box>


            </Box >
        </>
    );
};

// Export the TagsSelector component as the default export
export default TagsSelector;
