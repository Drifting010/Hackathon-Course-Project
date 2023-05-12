import React, { useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

// Define the TagsSelector functional component, which takes 'tags' and 'onSubmit' as props
const TagsSelector = ({ tags, onSubmit }) => {
    // Initialize the selectedTags state
    const [selectedTags, setSelectedTags] = useState([]);

    // Function to handle tag click events, toggling the selection state of a tag
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Function to handle form submission
    const handleSubmit = () => {
        onSubmit(selectedTags);
    };

    return (
        <>
            <Box>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        {/* Container for tag buttons */}
                        <Box display="flex" justifyContent="flex-start" flexWrap="wrap" gap={1}>
                            {/* Render a button for each tag in the 'tags' prop */}
                            {tags.map((tag) => (
                                <Box key={tag} m={1} width="20%" >
                                    {/* Style the tag button based on whether it is selected */}
                                    <Button
                                        fullWidth
                                        sx={{
                                            padding: '7px 16px',
                                            gap: '8px',
                                            height: '32px',
                                            minWidth: '100px',
                                            background: '#21262D',
                                            borderRadius: '39px',
                                            border: selectedTags.includes(tag) ? '1px solid #FF9300' : 'none',
                                        }}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {/* Display the tag text */}
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
                
                {/* Container for the submit button */}
                <Box mt={2} display="flex" justifyContent="flex-start" sx={{ ml: '240px' }} >
                    {/* Submit button with custom styles, triggers the handleSubmit function */}
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
            </Box>
        </>
    );
};

// Export the TagsSelector component as the default export
export default TagsSelector;
