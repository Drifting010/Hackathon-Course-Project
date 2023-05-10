import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
import theme from '../../Components/theme';
import HackathonList from '../../Components/HackathonList'
import { useState, useEffect } from 'react';

// define initial filter
const initialFilters = { tag: null, offset: null, status: null };

// Exporting a React functional component named 'HostHome'
export default function HostHome() {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters)
  }, [])

  function onAllClick() {
    setFilters({ ...initialFilters, tag: null })
  }

  function onOngoingClick() {
    setFilters({ ...initialFilters, status: "ongoing" })
  }

  function onFinishedClick() {
    setFilters({ ...initialFilters, status: "ended" })
  }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pb: 2,
                }}
            >
                <Alert sx={{color: 'white', bgcolor: '#161B21'}} severity="info" onClose={() => { }}>You are now in the host view</Alert>
                <CssBaseline />
                {/* four button */}
                <Container maxWidth="md" sx={{ pt: 4 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} container justifyContent="flex-start" spacing={2}>
                            <Grid item>
                                <Button variant="outlined" onClick={onAllClick} sx={{ color: '#4474F1', borderColor: '#4474F1'}}>All</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={onOngoingClick} sx={{ color: '#4474F1', borderColor: '#4474F1'}}>Ongoing</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={onFinishedClick} sx={{ color: '#4474F1', borderColor: '#4474F1'}}>Finished</Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container justifyContent="flex-end">
                            <Button variant='contained' sx={{ color: 'white', bgcolor: '#4474F1'}}>Host a Hackathon</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            {/* display cards */}
            <Box>
                <HackathonList filters={filters} />
            </Box>
        </ThemeProvider>
    );
}
