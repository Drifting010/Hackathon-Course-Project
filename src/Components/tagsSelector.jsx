import React, { useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a theme instance to provide consistent styling throughout the application
const theme = createTheme();

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

    // State to track if the Submit button is hovered
    const [isSubmitHovered, setIsSubmitHovered] = React.useState(false);

    // Function to handle mouse enter event on Submit button
    const handleSubmitMouseEnter = () => {
        setIsSubmitHovered(true);
    };

    // Function to handle mouse leave event on Submit button
    const handleSubmitMouseLeave = () => {
        setIsSubmitHovered(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>

                {/* Create a grid container to display the tags in a responsive layout */}
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8}>
                        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                            {/* Map the tags to Button components */}
                            {tags.map((tag, index) => (
                                <Box key={tag} m={1}>
                                    <Button
                                        sx={{
                                            minWidth: '150px',
                                            padding: '6px',
                                        }}
                                        variant={selectedTags.includes(tag) ? 'contained' : 'outlined'}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

                {/* Create a grid container for the Submit button */}
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={7.2}>
                        <Box mt={2} display="flex" justifyContent="flex-start">
                            {/* Create a Submit button that changes its appearance when hovered */}
                            <Button
                                variant={isSubmitHovered ? 'contained' : 'outlined'}
                                onClick={handleSubmit}
                                onMouseEnter={handleSubmitMouseEnter}
                                onMouseLeave={handleSubmitMouseLeave}
                                sx={{ textTransform: 'none' }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
        </ThemeProvider>
    );
};

// Export the TagsSelector component as the default export
export default TagsSelector;
