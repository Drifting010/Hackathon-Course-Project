import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AdbIcon from '@mui/icons-material/Adb';

// Define the width of the drawer and navigation items
const drawerWidth = 240;
const navItems = ['Features', 'Services', 'blog', 'About'];

// Header component
export default function Header(props) {
    // Set state for menu and mobile menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    // Check if menu and mobile menu are open
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Close mobile menu
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    // Close menu and mobile menu
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    // Open mobile menu
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    // Set ID and render for primary menu
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
        </Menu>
    );

    // Set ID and render for mobile menu
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            <MenuItem>
                <IconButton
                    size="large"
                    color="inherit"
                >
                    <Badge>
                        <AccountCircle />
                    </Badge>
                </IconButton>
                <p>Login</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Signup</p>
            </MenuItem>
        </Menu>
    );

    // Get window from props and set state for mobile drawer
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Toggle mobile drawer
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // Define content for drawer
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    // Define container for drawer
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        // The main container for the header, using Box component from Material UI
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ bgcolor: '#0D1116' }}>

                    {/* AdbIcon component from Material UI, hidden on extra-small screens */}
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: '#FF9300' }, mr: 1 }} />

                    {/* Typography component from Material UI, showing the title of the header, hidden on extra-small and small screens */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        href="./home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: '#FF9300',
                            textDecoration: 'none',
                        }}
                    >
                        H A C K A T H O N
                    </Typography>

                    {/* Box component with flexGrow property, pushing the nav items to the right */}
                    <Box sx={{ flexGrow: 50 }} />

                    {/* Box component with buttons for navigation, hidden on extra-small and small screens */}
                    {/* <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 10 }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{
                                my: 2,
                                mr: 4,
                                color: '#C9D1D9',
                                display: 'inline-block',
                                textTransform: 'none',
                                textDecoration: 'none',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                fontSize: '14px',
                                letterSpacing: '0.75px',
                                '&:hover': {
                                    color: '#FF9300',
                                },
                                '&:active': {
                                    color: '#FF9300',
                                },
                            }}>
                                {item}
                            </Button>
                        ))}
                    </Box> */}

                    {/* Box component with flexGrow property, pushing the login and signup buttons to the right */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Box component with login and signup buttons, hidden on extra-small screens */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button variant="outlined"
                            sx={{
                                my: 2,
                                mr: 2,
                                color: 'white',
                                display: 'inline-block',
                                textTransform: 'none',
                                borderColor: '#0D1116',
                                borderRadius: '10px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                letterSpacing: '0.75px',
                                '&:hover': {
                                    borderColor: '#FF9300',
                                    color: '#FF9300',
                                },
                            }
                            }>Login</Button>
                        <Button variant="outlined"
                            sx={{
                                my: 2,
                                mr: 2,
                                color: 'white',
                                display: 'inline-block',
                                textTransform: 'none',
                                borderColor: '#FF9300',
                                borderRadius: '10px',
                                fontFamily: 'Inter',
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                letterSpacing: '0.75px',
                                '&:hover': {
                                    borderColor: '#FF9300',
                                    color: '#FF9300',
                                },
                            }
                            }>Sign up</Button>

                    </Box>

                    {/* Box component with the mobile menu button, hidden on medium screens */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Divider sx={{ bgcolor: '#FF9300' }} />

            {/* Box component with navigation drawer, only visible on extra-small and small screens */}
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Render mobile menu */}
            {renderMobileMenu}

            {/* Render menu */}
            {renderMenu}
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
