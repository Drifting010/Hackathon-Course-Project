import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';

export default function ParticipantHeader() {

    //Make the user menu is closed
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    //When the avatar button is clicked, handleOpenUserMenu is called and sets anchorElUser to the event.currentTarget 
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    //When the user menu is open and any of the menu items are clicked, the handleCloseUserMenu function is called, setting the anchorElUser state back to null.
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <nav>
                            <Link
                                variant="button"
                                href="./explore_hackathons"
                                sx={{ my: 2, mr: 2, color: 'white', display: 'inline-block', textTransform: 'none', textDecoration: 'none' }}
                            >
                                Explore Hackathons
                            </Link>
                            <Link
                                variant="button"
                                href="./my_events"
                                sx={{ my: 2, color: 'white', display: 'inline-block', textTransform: 'none', textDecoration: 'none' }}
                            >
                                My Events
                            </Link>
                        </nav>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="./participant_home"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            href="#"
                            sx={{ my: 2, mr: 2, color: 'white', display: 'inline-block', textTransform: 'none' }}
                        >
                            Switch to Hosting
                        </Button>
                        <Tooltip>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/xx.jpg" data-testid="avatar-button" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="profile" onClick={handleCloseUserMenu} >
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="#"
                                    sx={{ textDecoration: 'none', color: 'black' }}
                                    data-testid="menu-item-profile"
                                >
                                    Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem key="account" onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="#"
                                    sx={{ textDecoration: 'none', color: 'black' }}
                                    data-testid="menu-item-account"
                                >
                                    Account
                                </Typography>
                            </MenuItem>
                            <MenuItem key="dashboard" onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="#"
                                    sx={{ textDecoration: 'none', color: 'black' }}
                                    data-testid="menu-item-dashboard"
                                >
                                    Dashboard
                                </Typography>
                            </MenuItem>
                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="#"
                                    sx={{ textDecoration: 'none', color: 'black' }}
                                    data-testid="menu-item-logout"
                                >
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar >
    );
}


