import React from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { auth } from '../../firebaseConfig';
import { getHackathonAndParticipants } from '../../Components/firebase/firebaseFunction';

export default function SingleHackathon() {

    //const user =  auth.currentUser;
    const user = { email: 'TEST0509@TEST.com' };

    const [hackathon, setHackathon] = React.useState(null);

    const [isRegistered, setIsRegistered] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const hackathonData = await getHackathonAndParticipants('BEOVWWEhOvv68qHEOFsv');
            setHackathon(hackathonData);

            console.log('Hackathon data:', hackathonData);

            // Check if the user is already registered for the hackathon
            if (user && hackathonData.participants.some(participant => participant.email === user.email)) {
                setIsRegistered(true);
            }
        };

        fetchData();
    }, [user]);

    console.log(isRegistered);

    if (!hackathon) {
        return <div>Loading...</div>;
    }

    // Get a date string in the format 'yyyy/mm/dd'
    const formatDate = (timestamp) => {
        const date = timestamp.toDate();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}/${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}`;
    };

    // Usage:
    const startDate = formatDate(hackathon.startDate);
    const endDate = formatDate(hackathon.endDate);

    return (
        <>
            <Container>

                <Box sx={{ width: '100%', height: 'auto', my: 2, position: 'relative' }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '45%',
                        background: '#050505',
                    }} />
                    <img
                        src='src\Icons\background.png'
                        alt="bg_img"
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </Box>

                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '24px',
                        letterSpacing: '0.75px',
                        color: '#FFFFFF',
                        mt: 2,
                        mb: 2,
                        ml: 10,
                    }}
                >
                    {hackathon.title}
                </Typography>

                <Button
                    href={isRegistered ? '/submit_hackathons' : '/register_hackathons'}
                    disabled={!user}
                    sx={{
                        width: '200px',
                        height: '45px',
                        background: '#FF9300',
                        borderRadius: '5px',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        fontSize: '13px',
                        color: '#F7F7FC',
                        mt: 2,
                        mb: 2,
                        ml: 10,
                    }}
                >
                    {isRegistered ? 'Submit Hackathon' : 'Join Hackathon'}
                </Button>

                <List>
                    <ListItem>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: 8,
                            }}
                        >
                            <EmojiEventsOutlinedIcon />
                            <ListItemText
                                primary={`Prize pool - $ ${hackathon.prizePool}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.75px',
                                    color: '#FFFFFF',
                                    ml: 1,
                                }}
                            />
                        </Box>
                    </ListItem>

                    <ListItem>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                ml: 8,
                            }}
                        >
                            <CalendarMonthOutlinedIcon />
                            <ListItemText
                                primary={`Start data - ${startDate} | End data - ${endDate}`}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontFamily: 'Inter',
                                    fontStyle: 'normal',
                                    fontSize: '16px',
                                    fontWeight: 500,
                                    letterSpacing: '0.75px',
                                    color: '#FFFFFF',
                                    ml: 1,
                                }}
                            />
                        </Box>
                    </ListItem>
                </List>

                {/* Hackathon Description */}
                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        letterSpacing: '0.75px',
                        color: '#C9D1D9',
                        mb: 2,
                        ml: 10,
                    }}
                >
                    {hackathon.description}
                </Typography>


                <Typography
                    sx={{
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '18px',
                        letterSpacing: '0.75px',
                        color: '#C9D1D9',
                        mt: 6,
                        mb: 2,
                        ml: 10,
                    }}
                >
                    JUDGING CRITERIA
                </Typography>

                {hackathon.criteria.map((criterion, index) => (
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                fontSize: '18px',
                                letterSpacing: '0.75px',
                                color: '#C9D1D9',
                                mt: 3,
                                mb: 2,
                                ml: 10,
                            }}
                        >
                            Novelty & Creativity
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                fontSize: '14px',
                                letterSpacing: '0.75px',
                                color: '#8B949E',
                                mt: 3,
                                mb: 2,
                                ml: 10,
                            }}
                        >
                            {criterion}
                        </Typography>
                    </Box>
                ))}

            </Container>
        </>
    );
}