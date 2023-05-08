import * as React from 'react';
import {  ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// This is the main function that returns the registerHackathons component
export default function SubmitHackathon() {

    // State for Cancel and Register buttons hover
    const [isCancelHovered, setIsCancelHovered] = React.useState(false);
    const [isRegisterHovered, setIsRegisterHovered] = React.useState(false);
    const [isUploadHovered, setUploadHovered] = React.useState(false);
    const [fileName,setFileName] = React.useState('');

    // Event handlers for Cancel and Register buttons hover

    const handleUploadMouseEnter = () => {
        setUploadHovered(true);
    };

    const handleUploadMouseLeave = () => {
        setUploadHovered(false);
    };

    const handleCancelMouseEnter = () => {
        setIsCancelHovered(true);
    };

    const handleCancelMouseLeave = () => {
        setIsCancelHovered(false);
    };

    const handleRegisterMouseEnter = () => {
        setIsRegisterHovered(true);
    };

    const handleRegisterMouseLeave = () => {
        setIsRegisterHovered(false);
    };

    const handleFileUpload = event => {
        const fileUploaded = event.target.files[0];
        setFileName(event.target.files[0].name)
    };

    const fileInput = React.useRef(null);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Box component to create a container that fills the viewport height and centers its content */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    height: '100vh', // 100% of viewport height
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Container maxWidth="md">
                    {/* Typography component for displaying the hackathon registration title */}
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.secondary"
                        gutterBottom
                        mb={5} // Add margin-bottom here
                    >
                        Hackathon submission
                    </Typography>

                    {/* Typography component for displaying the hackathon rules and information */}
                    <Typography
                        variant="h5"
                        align="left"
                        color="text.secondary"
                        paragraph
                        mb={5} // Add margin-bottom here
                    >
                        Hackathon requirements etc.
                    </Typography>
                    
                    <input
                        type="file"
                        ref={fileInput}
                        onChange={handleFileUpload}
                        style={{display: 'none'}}
                    />

                    <Box
                        sx={{mb:5,display:'flex'}}
                    >
                        <Button
                            onMouseEnter={handleUploadMouseEnter}
                            onMouseLeave={handleUploadMouseLeave}
                            sx={{ mr: 2, textTransform: 'none' }}
                            variant={isUploadHovered ? 'contained' : 'outlined'}
                            onClick={() => fileInput.current.click()}
                        >
                            Upload Submission
                        </Button>
                        <Typography
                            variant="h5"
                            align="left"
                            color="text.secondary"
                            paragraph
                        >
                            {fileName}
                        </Typography>
                    </Box>

                    {/* Cancel button to cancel the registration process */}
                    <Button
                        onMouseEnter={handleCancelMouseEnter}
                        onMouseLeave={handleCancelMouseLeave}
                        sx={{ mr: 2, textTransform: 'none' }}
                        variant={isCancelHovered ? 'contained' : 'outlined'}
                    >
                        Cancel
                    </Button>
                    {/* Register button to submit the registration information */}
                    <Button
                        onMouseEnter={handleRegisterMouseEnter}
                        onMouseLeave={handleRegisterMouseLeave}
                        sx={{ textTransform: 'none' }}
                        variant={isRegisterHovered ? 'contained' : 'outlined'}
                    >
                        Register
                    </Button>

                </Container>
            </Box>
        </ThemeProvider>
    );
}