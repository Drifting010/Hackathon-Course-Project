import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import theme from '../../Components/theme';

// An array of card objects to be displayed
const cards = [1, 2, 3];

// Exporting a React functional component named 'HostHome'
export default function HostHome() {

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pb: 2,
                }}
            >
                <Alert sx={{color: 'white', bgcolor: '#161B21'}} severity="info" onClose={() => { }}>You are now in the host view</Alert>
                <CssBaseline />
                {/* four button */}
                <Container maxWidth="md" sx={{ pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} container justifyContent="flex-start" spacing={2}>
                            <Grid item>
                                <Button variant="outlined" sx={{ color: '#4474F1', borderColor: '#4474F1'}}>All</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" sx={{ color: '#4474F1', borderColor: '#4474F1'}}>Ongoing</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" sx={{ color: '#4474F1', borderColor: '#4474F1'}}>Finished</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Button variant='contained' sx={{ color: 'white', bgcolor: '#4474F1'}}>Host a Hackathon</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            {/* display cards */}
            <Container sx={{ py: 2 }} maxWidth="md">
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                data-testid="card"
                            >
                                <CardMedia
                                    component="img"
                                    sx={{}}
                                    image="https://source.unsplash.com/random"
                                    alt="random"
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        title
                                    </Typography>
                                    <Typography>prize pool $1000</Typography>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <LinearProgress
                                            sx={{ height: 10, width: '60%' }}
                                            color="secondary"
                                            variant="determinate"
                                            value={50}
                                        />
                                        <Typography fontSize="10px">Apply in 30 days</Typography>
                                    </Stack>
                                    <Typography>ongoing</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
