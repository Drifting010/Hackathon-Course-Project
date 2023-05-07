import * as React from 'react';
import {  ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getUser } from '../../Components/firebase/firebaseFunction';
import { auth } from '../../firebaseConfig';

export default function Profile() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // const userAuth = await auth.currentUser;
                const userAuth = { email: 'testParticipant@example.com' };
                if (userAuth) {
                    const userEmail = userAuth.email;
                    const userData = await getUser(userEmail);
                    setUser(userData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log(user);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {user ? (
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
                            <Avatar src={user.profile.userIcon} />
                        </Grid>

                        <Grid item>
                            <Typography>
                                {user.first_name} {user.last_name}
                            </Typography>
                        </Grid>

                        <Grid item>
                            <Grid container alignItems="center" direction="row" spacing={1}>
                                <Grid item>
                                    <LocationOnOutlinedIcon />
                                </Grid>

                                <Grid item>
                                    <Typography>
                                        {user.profile.Country}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <Typography>
                                {user.profile.Description}
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
