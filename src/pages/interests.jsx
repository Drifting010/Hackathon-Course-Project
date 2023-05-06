import * as React from 'react';
import TagsSelector from '../Components/tagsSelector'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const theme = createTheme();

export default function Interests({ TagsSelectorComponent = TagsSelector }) {
    // Sample tags for the user to choose from
    const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6', 'Tag 7', 'Tag 8', 'Tag 9', 'Tag 10', 'Tag 11', 'Tag 12'];

    // Function to handle the submission of selected tags
    const handleTagsSubmit = (selectedTags) => {
        console.log('Selected tags:', selectedTags);
        // Handle the selected tags, for example, send a request to the server

    };

    return (
        // Wrap the content in a ThemeProvider to apply the theme to child components
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Create a container with flexbox to center-align the content */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="100%"
            >
                {/* Create a box to hold the Typography components and the TagsSelector */}
                <Box width="80%">
                    {/* Display a heading for the interests selection */}
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.secondary"
                        mb={2}
                        pl={23}
                    >
                        What are you interested in?
                    </Typography>

                    {/* Display a sub-heading instructing users to select at least 5 interests */}
                    <Typography
                        component="h5"
                        variant="h5"
                        align="left"
                        color="text.secondary"
                        mb={2}
                        pl={23}
                    >
                        Select at least 5 interests
                    </Typography>

                    {/* Render the TagsSelectorComponent with the provided tags and onSubmit function */}
                    <TagsSelectorComponent tags={tags} onSubmit={handleTagsSubmit} />

                </Box>
            </Box>
        </ThemeProvider>
    );
}

