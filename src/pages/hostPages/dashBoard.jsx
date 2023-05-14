import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import Box from '@mui/material/Box';
import HackathonList from '../../Components/HackathonList';
import { AppContext } from '../../Components/AppContextProvider';
import { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

// An array of card objects to be displayed
// const cards = [1];
const initialFilters = { tag: null, offset: null, status: null, username: null }

// This is the main function that returns the Dashboard component
export default function Dashboard() {

  const { currentUser } = useContext(AppContext);
  const [filters, setFilters] = useState(initialFilters);
  const [haveData, setHaveData] = useState([false]);

  useEffect(() => {
    if (currentUser) {
      setFilters({ ...initialFilters, username: currentUser.email })
    }
  }, [currentUser])

  function onAllClick() {
    setFilters({ ...initialFilters, username: currentUser.email })
  }

  function onOngoingClick() {
    setFilters({ ...initialFilters, status: "ongoing", username: currentUser.email })
  }

  function onFinishedClick() {
    setFilters({ ...initialFilters, status: "ended", username: currentUser.email })
  }

  const onDataLoaded = (data) => {
    if (data.length === 0) {
      setHaveData(false);
    } else {
      setHaveData(true);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pb: 2,
          }}
        >
          <Alert sx={{ color: 'white', bgcolor: '#161B21' }} severity="info" onClose={() => { }}>You are now in the host view</Alert>
          <CssBaseline />
          {/* four button */}
          <Container maxWidth="md" sx={{ pt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} container justifyContent="flex-start" spacing={2}>
                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={onAllClick}
                    sx={{
                      borderRadius: '10px',
                      color: '#6D7681',
                      borderColor: '#6D7681',
                      '&:hover': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                      '&:active': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                    }}>All</Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={onOngoingClick}
                    sx={{
                      borderRadius: '10px',
                      color: '#6D7681',
                      borderColor: '#6D7681',
                      '&:hover': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                      '&:active': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                    }}>Ongoing</Button>
                </Grid>
                <Grid item>
                  <Button
                    variant='outlined'
                    onClick={onFinishedClick}
                    sx={{
                      borderRadius: '10px',
                      color: '#6D7681',
                      borderColor: '#6D7681',
                      '&:hover': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                      '&:active': {
                        color: '#4474F1',
                        borderColor: '#4474F1',
                      },
                    }}>Finished</Button>
                </Grid>
              </Grid>
              <Grid item xs={6} container justifyContent="flex-end">
                <Button
                  href='/publish_hackathon'
                  sx={{
                    width: '220px',
                    background: '#4474F1',
                    textTransform: 'none',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#F7F7FC',
                  }}>Host a Hackathon</Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
        {/* display cards */}
        <Box>
          <HackathonList filters={filters} pagename={'dashBoard'} isParticipant={false} onDataLoaded={onDataLoaded} />
        </Box>
      </ThemeProvider>
      {haveData ? (
        <div></div>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container sx={{ py: 2 }} maxWidth="md">
            <Box align="center">
              <img src="src\Icons\EmptyIcon.png" alt="Currently my event is empty" width="40%" height="40%" />
            </Box>
            
            <Typography align="center"
              sx={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '12px',
                letterSpacing: '0.75px',
                mb: 3,
              }}>
              The hackathons hosted by you will be shown here
            </Typography>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}