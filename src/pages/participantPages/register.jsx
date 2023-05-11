import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

// This is the main function that returns the registerHackathons component
export default function RegisterHackathons() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Box component to create a container that fills the viewport height and centers its content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    pt: '5rem',
                }}
            >
                {/* Inner Box containing the form */}
                <Box
                    sx={{
                        textAlign: 'left',
                    }}
                >
                    {/* Typography component for displaying the hackathon registration title */}
                    <Typography
                        align="left"
                        sx={{
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontSize: '24px',
                            fontWeight: 500,
                            letterSpacing: '0.75px',
                            color: '#FFFFFF',
                        }}
                        mb={3}
                    >
                        Register Project Event bengal tiger
                    </Typography>

                    {/* Box component wrapping the first TextField and providing margin-bottom */}
                    <Box width="100%" >
                        <TextField
                            required
                            id="outlined-required"
                            label="What do you do?"
                            multiline
                            rows={4}
                            sx={{
                                border: '1px solid #30363D',
                                borderRadius: '6px',
                                width: '500px',
                                mb: 4,
                                background: '#21262D'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Box component wrapping the second TextField and providing margin-bottom */}
                    <Box width="100%" >
                        <TextField
                            required
                            id="outlined-required"
                            label="Enter description"
                            multiline
                            rows={4}
                            sx={{
                                border: '1px solid #30363D',
                                borderRadius: '6px',
                                width: '500px',
                                mb: 4,
                                background: '#21262D'
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DescriptionOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    {/* Cancel button to cancel the registration process */}
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
                            borderColor: '#FF9300',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#FF9300',
                            '&:hover': {
                                borderColor: '#FF9300',
                            },

                        }}

                    >
                        Cancel
                    </Button>

                    {/* Register button */}
                    <Button
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            width: '142px',
                            height: '38px',
                            borderRadius: '10px',
                            background: '#FF9300',
                            textTransform: 'none',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#FFFFFF',
                            '&:hover': {
                                background: '#21262D',
                            },

                        }}
                    >
                        Register
                    </Button>

                </Box>
            </Box>
        </ThemeProvider>
    );
}