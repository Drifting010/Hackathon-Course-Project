// Importing necessary dependencies and components from Material UI
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import HackathonList from '../../Components/HackathonList';
import { useState, useEffect } from 'react';

// An array to hold some dummy card values
const initialFilters = { tag: null, offset: null, status: null }


// Defining the main Album component as the default export
export default function Album() {

  const [filters, setFilters] = useState(initialFilters);
  useEffect(() => {
    setFilters(initialFilters)
  }, [])
  // Rendering the Album component and returning JSX elements
  return (
    // Wrapping the entire component with the Material UI ThemeProvider component to apply the theme
    <ThemeProvider theme={theme}>
      {/* Adding the Material UI CSS baseline for global styling */}
      <CssBaseline />
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          my: 20,
          backgroundImage: 'url(https://i.328888.xyz/2023/05/11/iY1hPU.png)',
          backgroundSize: '100% 100%',
        }}
      >
        {/* Setting a maximum container width for the hero unit */}
        <Container maxWidth="md" sx={{ pt: 10 }}>
          {/* Adding the title of the website */}
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="white"
            gutterBottom
            fontWeight="bold"
          >
            Host, Join, and Win with Our <br />
            Hackathon Platform!
          </Typography>
          {/* Adding a brief description of the website */}
          <Typography variant="h6" align="center" color="#C9C9C9" fontWeight="bold" pt={ 3 } paragraph>
            Some brief descriptions about the Hackathon Website, etc.
          </Typography>
          {/* Adding two buttons to the hero unit */}
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              sx={{
                width: '188px',
                height: '52px',
                background: '#FF9300',
                textTransform: 'none',
                borderRadius: '5px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '16px',
                color: '#F7F7FC',
              }
              }>Try now</Button>
          </Stack>
        </Container>
      </Box>

      {/* Adding a container for the card section */}
      {/* display cards */}
      <Box>
        <HackathonList filters={filters} />
      </Box>

    </ThemeProvider>
  );
}