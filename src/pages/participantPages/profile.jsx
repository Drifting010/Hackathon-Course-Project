import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import { getUser } from '../../Components/firebase/firebaseFunction';
// import { auth } from '../../firebaseConfig';

const theme = createTheme();

export default function Profile() {
    // Define a state variable 'user' and a function 'setUser' to update it
    // Initially, 'user' is set to 'null'
    // const [user, setUser] = React.useState(null);

    // Use the useEffect hook to set up side effects and clean them up when the component is unmounted
    // React.useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
    //         if (userAuth) {
    //             const userEmail = userAuth.email;
    //             const userData = await getUser(userEmail);
    //             setUser(userData);
    //         }
    //     });

    //     // Clean up the listener when the component is unmounted
    //     return () => unsubscribe();
    // }, []);

    // If the 'user' state variable is not set (i.e., it's 'null'), display a loading message.
    // if (!user) {
    //     return <div>Loading...</div>;
    // }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Grid container justifyContent="center" alignItems="center" direction="column" spacing={4}>

                    <Grid item>
                        {/* src={user.profile.userIcon} */}
                        <Avatar />
                    </Grid>

                    <Grid item>
                        <Typography>
                            {/* {user.profile.username} */}
                            UserName
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Grid container alignItems="center" direction="row" spacing={1}>
                            <Grid item>
                                <LocationOnOutlinedIcon />
                            </Grid>

                            <Grid item>
                                <Typography>
                                    {/* {user.profile.Country} */}
                                    Country
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography>
                            {/* {user.profile.Description} */}
                            Description
                        </Typography>
                    </Grid>


                </Grid>
            </Box>
        </ThemeProvider>
    );
}
