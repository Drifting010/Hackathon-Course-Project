import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import TemporaryDrawer from '../../Components/TemporaryDrawer';
import HackathonList from './HackathonList'

const initialFilters = { tag: null, offset: null, status: null}
// const limit = 10
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import TemporaryDrawer from "../../Components/TemporaryDrawer";
import HackathonList from './HackathonList'

const initialFilters = { tag: null, offset: null, status: null}
// const limit = 10

// An array of card objects to be displayed
const cards = [1, 2, 3];
const cards = [1, 2, 3];

// Creating a Material-UI theme object
const theme = createTheme();

// Exporting a React functional component named 'Explopre'
export default function Explopre() {
  const [filters, setFilters] = useState(initialFilters )

  const [filters, setFilters] = useState(initialFilters )

  useEffect(() => {
    setFilters(initialFilters)
  }, [])
    setFilters(initialFilters)
  }, [])

  function onTagClick(tag) {
    setFilters({ ...initialFilters, tag })
  }

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
            <Button variant="outlined" onClick={onAllClick}>All</Button>
            <Button variant="outlined" onClick={onOngoingClick}>Ongoing</Button>
            <Button variant="outlined" onClick={onFinishedClick}>Finished</Button>
            <TemporaryDrawer onTagClick={onTagClick} />
          </Stack>
        </Container>
      </Box>
      {/* display cards */}
      <Box>
        <HackathonList filters={filters}/>
      </Box>
    </ThemeProvider>
  );
}
