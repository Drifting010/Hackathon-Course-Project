import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getUserProfile } from '../../Components/firebase/firebaseFunction';
import { AppContext } from '../../Components/AppContextProvider';
import { useState, useEffect, useContext } from 'react';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';

export default function Profile() {
    const [user, setUser] = React.useState(null);
    const { currentUser } = useContext(AppContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userEmail = currentUser.email;
                const userData = await getUserProfile(userEmail);
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    let newDescription = null;
    if (user && user.description) {
        newDescription = user.description.replace(/\\n/g, '\n').split('\n');
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 'calc(100vh - 100px)',  // Subtract the height of Header and Footer
                }}
            >
                {user ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={3}>

                            <Grid
                                item
                                sx={{
                                    mt: 5,
                                }}
                            >
                                <Avatar src={user.userIcon} />
                            </Grid>

                            <Grid item>
                                <Typography
                                    sx={{
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontSize: '30px',
                                        fontWeight: 600,
                                        color: '#C9D1D9',
                                    }}
                                >
                                    {user.nameOfOrganization}
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Link
                                    href={user.website}
                                    target="_blank"
                                >
                                    <Box component="span" display="flex" alignItems="center" gap={1}>
                                        <LaunchOutlinedIcon />
                                        <span>Website</span>
                                    </Box>
                                </Link>
                            </Grid>

                            <Grid item>
                                <Button
                                    variant='contained'
                                    href='/host_editprofile'
                                    sx={{
                                        textTransform: 'none',
                                        width: '142px',
                                        height: '38px',
                                        borderRadius: '10px',
                                        background: '#4474F1',
                                        fontFamily: 'Inter',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: '#FFFFFF',
                                        '&:hover': {
                                            background: '#21262D',
                                        },

                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </Grid>

                            <Grid item>
                                <Grid container alignItems="center" direction="row" spacing={1}>
                                    <Grid item>
                                        <LocationOnOutlinedIcon />
                                    </Grid>

                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontFamily: 'Inter',
                                                fontStyle: 'normal',
                                                fontSize: '15px',
                                                fontWeight: 600,
                                                color: '#C9D1D9',
                                            }}
                                        >
                                            {user.country.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                {user.tags.map((tag, index) => (
                                    <Button
                                        key={index}
                                        sx={{
                                            width: '120px',
                                            height: '32px',
                                            background: '#21262D',
                                            borderRadius: '39px',
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            fontWeight: 500,
                                            fontSize: '12px',
                                            letterSpacing: '0.75px',
                                            color: '#C9D1D9',
                                            mr: 1,
                                        }}
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </Grid>

                            <Grid
                                item
                                sx={{
                                    width: '700px',
                                }}
                            >
                                {newDescription && newDescription.map((paragraph, index) => (
                                    <Typography
                                        sx={{
                                            fontFamily: 'Inter',
                                            fontStyle: 'normal',
                                            fontSize: '15px',
                                            fontWeight: 500,
                                            letterSpacing: '0.115emm',
                                            color: '#C9D1D9',
                                            mb: 1.5,
                                        }}
                                        key={index}
                                    >
                                        {paragraph}
                                    </Typography>
                                ))}
                            </Grid>

                        </Grid>
                    </Box>
                ) : (
                    <div>Loading...</div>
                )}
            </Box>
        </>
    );
}
