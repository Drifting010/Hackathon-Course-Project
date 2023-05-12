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

// An array of card objects to be displayed
// const cards = [1];
const initialFilters = { tag: null, offset: null, status: null, username: null}

// This is the main function that returns the Dashboard component
export default function Dashboard() {
  const { getCurrentUser, getUser } = useContext(AppContext);
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AppContext);
  const [filters, setFilters] = useState(initialFilters);
  const [isHost, setisParticipant] = useState(false);
  
  // add username into filter
  useEffect(() => {
    if(user){
      setFilters({ ...initialFilters, username: currentUser.username})
    }
  }, [user])

  useEffect(() => {
    if (currentUser){
      setisParticipant(true);
    }
  }, [user])

  return (
    <div>
      {isHost ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* display cards */}
            <Box>
              <HackathonList filters={filters} pagename={'dashBoard'}/>
            </Box>
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
              You havent hosted any hackathon.
            </Typography>
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
            <Box align="center">
              <Button
                sx={{
                  width: '250px',
                  height: '52px',
                  background: '#4474F1',
                  textTransform: 'none',
                  borderRadius: '5px',
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#F7F7FC',
                }}
                variant="contained"
                text-decoration="none"
                href='/host_home'>Host a Hackathon now</Button>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}