import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../Components/theme';
import { useState, useEffect } from 'react';
import TemporaryDrawer from '../../Components/TemporaryDrawer';
import HackathonList from './HackathonList'

const initialFilters = { tag: null, offset: null, status: null }
// const limit = 10

// Exporting a React functional component named 'Explopre'
export default function Explopre() {

  const [filters, setFilters] = useState(initialFilters);
  const [activeBtn, setActiveBtn] = useState(null);

  useEffect(() => {
    setFilters(initialFilters)
  }, [])

  function onTagClick(tag) {
    setFilters({ ...initialFilters, tag })
  }

  function onAllClick() {
    setActiveBtn('all')
    setFilters({ ...initialFilters, tag: null, status:null })
  }

  function onOngoingClick() {
    setActiveBtn('ongoing')
    setFilters({ ...initialFilters, status: "ongoing" })
  }

  function onFinishedClick() {
    setActiveBtn('finished')
    setFilters({ ...initialFilters, status: "ended" })
  }

  // Function to determine button style based on active button
  const getButtonStyle = (btn) => ({
    color: activeBtn === btn ? '#FF9300' : '#6D7681',
    borderRadius: '10px',
    borderColor: activeBtn === btn ? '#FF9300' : '#6D7681',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    textTransform: 'none',
    '&:hover': {
      borderColor: '#FF9300',
      color: '#FF9300',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 2,
        }}
      >
        {/* three button */}
        <Container maxWidth="md">
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="flex-start"
          >
            <Button
              variant="outlined"
              onClick={onAllClick}
              sx={getButtonStyle('all')}
            >
              All
            </Button>
            <Button
              variant="outlined"
              onClick={onOngoingClick}
              sx={getButtonStyle('ongoing')}
            >
              Ongoing
            </Button>
            <Button
              variant="outlined"
              onClick={onFinishedClick}
              sx={getButtonStyle('finished')}
            >
              Finished
            </Button>
            <TemporaryDrawer
              onTagClick={onTagClick} />
          </Stack>
        </Container>
      </Box>
      {/* display cards */}
      <Box>
        <HackathonList filters={filters} />
      </Box>
    </ThemeProvider>
  );
}
