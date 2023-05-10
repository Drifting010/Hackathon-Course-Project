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

export default function SingleHackathon() {
    const hackathon = {
        prize_pool: 30000,
        start_date: '2023/05/02',
        end_date: '2023/05/10',
        description: 'Lorem ipsum dolor sit amet consectetur. Mattis ornare turpis auctor facilisis velit praesent blandit elit. Scelerisque malesuada adipiscing cras hac. Varius ipsum integer maecenas sed amet urna. Ac egestas cursus vulputate lectus donec. Viverra sociis fames eu commodo purus vel lobortis. Lobortis imperdiet lacinia duis elementum. In dui in nibh viverra ultrices cras eget enim. Erat habitant euismod morbi eget accumsan tortor facilisis. Molestie sodales duis cursus adipiscing. Tortor urna sit duis mauris gravida ac pellentesque id augue. Malesuada semper feugiat dignissim gravida mauris morbi. Sodales pulvinar nec nunc in maecenas morbi faucibus. Ultrices odio metus elementum eleifend semper eget.',
        criteria: [
            { novelty: 'Does it have unique and novel features or combine features of other products or services in a unique and novel way?' },
            { novelty: 'Does it solve a new problem or create a new paradigm?' },
            { novelty: 'Is it fun to use?' },
            // ...
        ]
    };

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
                    SIA App Challenge
                </Typography>

                <Button
                    href='/register_hackathons'
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
                    Join Hackathon
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
                                primary={`Prize pool - $ ${hackathon.prize_pool}`}
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
                                primary={`Start data - ${hackathon.start_date} | End data - ${hackathon.end_date}`}
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
                            {criterion.novelty}
                        </Typography>
                    </Box>
                ))}

            </Container>
        </>
    );
}