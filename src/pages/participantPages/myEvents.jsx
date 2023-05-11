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
import theme from '../../Components/theme';
import { LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';

// An array of card objects to be displayed
const cards = [1];

// This is the main function that returns the myEvents component
export default function MyEvents(props) {
  return (
    <div>
      {props.isLoggedIn && props.data ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* display user's participant cards */}
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
              <img src="src\Icons\EmptyIcon.png" alt="Currently my event is empty" width="40%" height="40%" />
            </Box>
            <Typography
              align="center"
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '0.75px',
                mb: 1,
              }}
            >
              You haven't registered in any hackathon
            </Typography>
            <Typography
              align="center"
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.75px',
                mb: 3,
              }}
            >
              The hackathons registered by you will be shown here
            </Typography>
            <Box align="center">
              <Button
                href='/explore_hackathons'
                sx={{
                  width: '250px',
                  height: '52px',
                  background: '#FF9300',
                  textTransform: 'none',
                  borderRadius: '5px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#F7F7FC',
                }}
              >
                Explore Hackathons
              </Button>

            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}