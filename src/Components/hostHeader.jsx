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

// This is the main function that returns the hostHeader component
export default function HostHeader() {

    // useState hook to handle user menu opening and closing
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    // Function called when the avatar button is clicked, opens the user menu 
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // Function called when a menu item is clicked, closes the user menu
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Render JSX
    return (
        // AppBar component for the top app bar
        <AppBar position="static">
            {/* Container for content within the AppBar */}
            <Container maxWidth="xl" sx={{ bgcolor: '#0D1116'}}>
                {/* Toolbar for displaying navigation items and actions */}
                <Toolbar disableGutters>

                    {/* First Box: Contains navigation links for "Explore Hackathons" and "My Events" */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <nav>
                            <Link
                                variant="button"
                                href="./dashboard"
                                sx={{ 
                                    my: 2, 
                                    mr: 2, 
                                    color: 'white', 
                                    display: 'inline-block', 
                                    textTransform: 'none', 
                                    textDecoration: 'none',
                                    '&:hover':{
                                        color: '#4474F1',
                                    },
                                    '&:active': {
                                        color: '#4474F1',
                                    }, }}
                            >
                                Dashboard
                            </Link>
                            <Link
                                variant="button"
                                href="./data_analytics"
                                sx={{ 
                                    my: 2, 
                                    mr: 2, 
                                    color: 'white', 
                                    display: 'inline-block', 
                                    textTransform: 'none', 
                                    textDecoration: 'none',
                                    '&:hover':{
                                        color: '#4474F1',
                                    },
                                    '&:active': {
                                        color: '#4474F1',
                                    }, }}
                            >
                                Data Analytics
                            </Link>
                            <Link
                                variant="button"
                                href="./help_centre"
                                sx={{ 
                                    my: 2, 
                                    mr: 2, 
                                    color: 'white', 
                                    display: 'inline-block', 
                                    textTransform: 'none', 
                                    textDecoration: 'none',
                                    '&:hover':{
                                        color: '#4474F1',
                                    },
                                    '&:active': {
                                        color: '#4474F1',
                                    }, }}
                            >
                                Help Centre
                            </Link>
                        </nav>
                    </Box>

                    {/* Second Box: Contains the logo and AdbIcon */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: '#4474F1' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="./host_home"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: '#4474F1',
                                textDecoration: 'none',
                            }}
                        >
                            {/* LOGO */}
                            HACKATHON
                        </Typography>
                    </Box>

                    {/* Third Box: Empty box used for spacing, visible only on medium screens and up */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />

                    {/* Fourth Box: Contains the "Switch to Hosting" button and user menu with avatar */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Button
                            variant='outlined'
                            href="#"
                            sx={{ my: 2, mr: 2, color: 'white', display: 'inline-block', textTransform: 'none', borderColor: 'white' }}
                        >
                            Switch to attending
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
                                    href="./host_profile"
                                    sx={{ textDecoration: 'none', color: 'white' }}
                                    data-testid="menu-item-profile"
                                >
                                    Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem key="account" onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="./host_account"
                                    sx={{ textDecoration: 'none', color: 'white' }}
                                    data-testid="menu-item-account"
                                >
                                    Account
                                </Typography>
                            </MenuItem>
                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                <Typography
                                    textAlign="center"
                                    component="a"
                                    href="#"
                                    sx={{ textDecoration: 'none', color: 'white' }}
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


