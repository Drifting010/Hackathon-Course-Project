import React from 'react';
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
import theme from '../../Components/theme';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// An array of card objects to be displayed
const cards = [1];

// This is the main function that returns the Dashboard component
export default function Dashboard(props) {
  return (
    <div>
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
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container sx={{ py: 2 }} maxWidth="md">
            <Box align="center">
              <img src="src\Icons\EmptyIcon.png" alt="Currently my event is empty" width="30%" height="30%"/>
            </Box>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              You havent hosted any hackathon.
            </Typography>
            <Typography variant="h8" align="center" color="text.secondary" paragraph>
              The hackathons hosted by you will be shown here
            </Typography>
            <Box align="center">
              <Button  sx={{color:'white', bgcolor: '#4474F1'}} variant="contained" text-decoration="none" href='/host_home'>Host a Hackathon now</Button>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}