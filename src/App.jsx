import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderWrapper } from './Components/headerWrapper';
//part two - signed in participant
import { ParticipantHome } from './pages/participantPages'
import { ExploreHackathons } from './pages/participantPages'
import { MyEvents } from './pages/participantPages'
import { RegisterHackathons } from './pages/participantPages'
import { Home } from './pages'
import { Header } from './pages'
import { Footer } from './pages'
import './App.css'

export default function App() {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <HeaderWrapper />
          <main>
            <Routes>
              <Route>
                <Container maxWidth="lg">
                  <Header />
                  <main>
                    <Home />
                  </main>
                </Container>
                <Footer
                  title="Hackathon"
                  description="Something here to give the footer a purpose!"
                />
              </Route>
              <Route path="/participant_home" element={<ParticipantHome />} />
              <Route path="/explore_hackathons" element={<ExploreHackathons />} />
              <Route path="/my_events" element={<MyEvents />} />
              <Route path="/register_hackathons" element={<RegisterHackathons />} />
            </Routes>
          </main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

