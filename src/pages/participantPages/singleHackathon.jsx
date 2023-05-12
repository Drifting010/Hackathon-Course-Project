import React from "react";
import { AppContext } from "../../Components/AppContextProvider";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getHackathonAndParticipants } from '../../Components/firebase/firebaseFunction';
import { useParams } from "react-router-dom/dist";

// This is the main functional component SingleHackathon.
export default function SingleHackathon() {
    // TODO: obtain id of current hackathon project
    const hackathonId = useParams().id;
    console.log(hackathonId);

    // Current user
    const user  = React.useContext(AppContext).currentUser;
    // alert(JSON.stringify(user))
    //const user = { email: 'TEST0509@TEST.com' };
    //const user = { email: 'test0511@gmail.comm' };

    // State variables are declared using React's useState hook for the hackathon details and user's registration status.
    const [hackathon, setHackathon] = React.useState(null);
    const [isRegistered, setIsRegistered] = React.useState(false);

    // The useEffect hook runs when the component is first mounted and whenever the `user` state changes.
    React.useEffect(() => {
        const fetchData = async () => {
            // const hackathonData = await getHackathonAndParticipants('BEOVWWEhOvv68qHEOFsv');
            const hackathonData = await getHackathonAndParticipants(hackathonId);
            setHackathon(hackathonData);

            // Check if the user is already registered for the hackathon
            if (user && hackathonData.participants.some(participant => participant.email === user.email)) {
                setIsRegistered(true);
            }
        };

        fetchData();
    }, [user]);

    // If hackathon data is not loaded yet, display "Loading...".
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

    // The start and end dates of the hackathon are calculated.
    const startDate = formatDate(hackathon.startDate);
    const endDate = formatDate(hackathon.endDate);

    return (
        <>
            {/* The main container for the hackathon details. */}
            <Container>

                {/* The first Box is to create a responsive container, the second one is to create a colored background. */}
                {/* An image is also included in the box with src and alt attributes. */}
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
                        src='../src/Icons/background.png'
                        alt="bg_img"
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </Box>

                {/* Typography component is used for displaying text. Here, it's used to display the hackathon title. */}
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

                {/* Button component to navigate to hackathon submission or registration based on the user's registration status. */}
                <Button
                    href={isRegistered ? '/submit_hackathons/'+hackathonId : '/register_hackathons/'+hackathonId}
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

                {/* List component to list down the hackathon details. */}
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
            </Container>
        </>
    );
}