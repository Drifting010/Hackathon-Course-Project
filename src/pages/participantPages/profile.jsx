import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getUser, getUserProfile } from '../../Components/firebase/firebaseFunction';
import { AppContext } from '../../Components/AppContextProvider';

export default function Profile() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                const user = await getUser(currentUser.email);
                setUser(user);
                const userProfile = await getUserProfile(currentUser.email);
                setUserProfile(userProfile);
            }
        };

        fetchData();
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {currentUser ? (
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
                            <Avatar src={userProfile.userIcon} />
                        </Grid>

                        <Grid item>
                            <Typography>
                                {user.username}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" direction="row" spacing={1}>
                                <Grid item>
                                    <LocationOnOutlinedIcon />
                                </Grid>

                                <Grid item>
                                    <Typography>
                                        {userProfile.Country}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography>
                                {userProfile.Description}
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
            ) : (
                <div>Loading...</div>
            )}
        </ThemeProvider>
    );
}
