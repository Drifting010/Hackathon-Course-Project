import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'
import AdbIcon from '@mui/icons-material/Adb';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link to="/home" underline="none">
        Hackathon Website
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// This is the main function that returns the Footer component
function Footer(props) {
  const { description } = props;

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Box pt={10}>
          {/* AdbIcon component from Material UI, hidden on extra-small screens */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex', color: '#FF9300', fontSize: '50px', marginLeft: '5.5%' } }} />

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
          <Typography variant="body2" color="#C9C9C9" pt={3} paragraph>
            Host, Join, and Win with Our Hackathon Platform!<br />
            Some brief descriptions about the Hackathon Website, etc.
          </Typography>
          <Divider sx={{ my: 3, bgcolor: '#FF9300' }} />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="p"
          >
            {description}
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </Box>
  );
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;