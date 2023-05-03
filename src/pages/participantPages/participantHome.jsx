import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Pagination } from '@mui/lab';
import { EmojiPeople } from '@mui/icons-material';

const cards = [1, 2, 3, 4, 5, 6];
const theme = createTheme();

export default function ParticipantHome() {

    // Handle the page change event of the Pagination component
    const handlePageChange = (event, value) => {
        // Implement the logic to load new data based on the selected page
        console.log("Selected page:", value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* Box component to wrap the heading and subheading with a background color */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: -2,
                    pl: 0,
                }}
            >
                <Container maxWidth="md">

                    {/* Typography component to display the greeting message with the user's name */}
                    <Typography
                        component="h4"
                        variant="h4"
                        align="left"
                        color="text.secondary"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        Hey, UserName
                        {/* EmojiPeople icon to visually enhance the greeting message */}
                        <EmojiPeople fontSize="large" sx={{ ml: 1 }} />
                    </Typography>
                    {/* Typography component to display a subheading with a call to action */}
                    <Typography variant="h5" align="left" color="text.secondary" paragraph>
                        Start participating in these hackathons.
                    </Typography>
                </Container>
            </Box>

            {/* Container component to wrap the hackathon cards and provide spacing */}
            <Container sx={{ py: 2 }} maxWidth="md">
                {/* Grid container to create a responsive layout for the hackathon cards */}
                <Grid container spacing={4}>
                    {/* Map through the cards array and create a Grid item with a Card component for each hackathon */}
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                data-testid="card"
                            >
                                {/* CardMedia component to display an image for the hackathon */}
                                <CardMedia
                                    component="img"
                                    sx={{}}
                                    image="https://source.unsplash.com/random"
                                    alt="random"
                                />
                                {/* CardContent component to hold the hackathon's title and status */}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Volvo Hackathon {/* Update this line to display the hackathon's title */}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ alignSelf: 'flex-end' }}
                                    >
                                        status {/* Update this line to display the hackathon's status */}
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Box component to center the Pagination component */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    {/* Pagination component to navigate between pages of hackathons */}
                    <Pagination count={10} color="primary" onChange={handlePageChange} />
                </Box>

            </Container>
        </ThemeProvider>
    );

}