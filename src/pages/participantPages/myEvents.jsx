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
import { getUserProfile } from '../../Components/firebase/firebaseFunction';

// An array of card objects to be displayed
// const cards = [1];

// initial filter
const initialFilters = { tag: null, offset: null, status: null, username: null, role: null }

// This is the main function that returns the myEvents component
export default function MyEvents() {
  // const { getCurrentUser, getUser, signInWithEmailAndPasswordFunction } = useContext(AppContext);
  // const [user, setUser] = useState(null);

  // login in and get current user
  // thia part need to be delete
  // useEffect(()=>{
  //   async function signInAndSetUser() {
  //     // await signInWithEmailAndPasswordFunction('testparticipant@example.com','testpassword');
  //     // get user info from auth function
  //     const currentUser = getCurrentUser();
  //     console.log('currentUser:',currentUser)
  //     // get user role and username from users
  //     if (currentUser){
  //       const userinfo = await getUser(currentUser.email);
  //       setUser(userinfo);
  //     }
  //   };
  //   signInAndSetUser();
  // },[]);

  const { currentUser } = React.useContext(AppContext);
  
  // console.log('currentUser: ',currentUser);
  // console.log('user: ',user);
  
  const [loading, setLoading] = React.useState(false);

  const [uploadedAvatar, setUploadedAvatar] = React.useState(null);
  const [uploadedFile, setUploadedFile] = React.useState(null);
  const [username,setUsername] = React.useState("");
  const [country,setCountry] = React.useState(null);
  const [bio,setBio] = React.useState("");

  React.useEffect(() => {
    if (currentUser !== null) {
      setUploadedAvatar(currentUser.photoURL);
      // setUser(currentUser);

      const user = getUserProfile(currentUser.email);
      user.then(function (result) {
        setUsername(result.username);
        setCountry(result.country);
        setBio(result.description);
      });
    }
  }, [currentUser])



  const [filters, setFilters] = useState(initialFilters);
  const [isParticipant, setisParticipant] = useState(false);

  // add username into filter
  useEffect(() => {
    if (currentUser) {
      setFilters({ ...initialFilters, username: currentUser.email })
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      setisParticipant(true);
    }
  }, [currentUser])

  return (
    <div data-testid="MyEvents">
      {isParticipant ? (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <HackathonList filters={filters} pagename={'myEvents'} />
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