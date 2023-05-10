// Importing necessary dependencies and components from Material UI
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';

// An array to hold some dummy card values
const cards = [1, 2, 3];

// Defining the main Album component as the default export
export default function Album() {
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
          <Typography variant="h6" align="center" color="#C9C9C9" paragraph>
            Some brief descriptions about the Hackathon Website, etc. Make it short and sweet, but not too short so folks
            don&apos;t simply skip over it entirely.
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
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* Adding a grid layout for the cards */}
        <Grid container spacing={4}>
          {/* Mapping through the cards array and creating a card component for each item */}
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                // Setting the card height, display, and flex direction using the Material UI sx prop
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                // Setting a data-testid for testing purposes
                data-testid="card"
              >
                {/* Adding an image to the card */}
                <CardMedia
                  component="img"
                  // Adding styles to the image using the Material UI sx prop
                  sx={{
                  }}
                  // Setting the image source to a random image from Unsplash
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                {/* Adding card content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Adding a heading to the card */}
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  {/* Adding a description to the card */}
                  <Typography>
                    This is a media card. You can use this section to describe the
                    content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </ThemeProvider>
  );
}