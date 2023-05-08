import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import theme from '../../Components/theme';

// An array of card objects to be displayed
const cards = [1];

// This is the main function that returns the dashboard component
export default function DeshBoard(props) {
  return (
    <div sx={{}}>
      {props.isLoggedIn && props.data ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                    {/* card image */}
                    <CardMedia
                      component="img"
                      sx={{}}
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    {/* card content */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      {/* card title */}
                      <Typography gutterBottom variant="h5" component="h2">
                        title
                      </Typography>
                      {/* card prize pool */}
                      <Typography>prize pool $1000</Typography>
                      {/* progress bar */}
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <LinearProgress />
                        <Typography variant="body2" color="text.secondary">
                          60%
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      ) : (
        // if user is not logged in or data is not available, show login button
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        </Box>
      )}
    </div>
  );
}