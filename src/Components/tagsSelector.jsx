import React, { useState } from 'react';
import { Button, Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const TagsSelector = ({ tags, onSubmit }) => {
    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = () => {
        onSubmit(selectedTags);
    };

    return (
        <>
            <Box>
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" justifyContent="flex-start" flexWrap="wrap" gap={1}>
                            {tags.map((tag) => (
                                <Box key={tag} m={1} width="20%" >
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

                <Box mt={2} display="flex" justifyContent="flex-start" sx={{ ml: '240px' }} >
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
