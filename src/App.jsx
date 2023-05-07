import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// header
import { HeaderWrapper } from './Components/headerWrapper';
// footer
import { HomeFooter } from './Components/';
//part one - onboarding
import { Home } from './pages'
import { Interests } from './pages'
//part two - signed in participant
import { ParticipantHome } from './pages/participantPages'
import { ExploreHackathons } from './pages/participantPages'
import { MyEvents } from './pages/participantPages'
import { RegisterHackathons } from './pages/participantPages'
import { Profile } from './pages/participantPages'
import { EditProfile } from './pages/participantPages'
import { AccountSetting } from './pages/participantPages'
import './App.css'

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <HeaderWrapper />
          <main>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/participant_home" element={<ParticipantHome />} />
              <Route path="/explore_hackathons" element={<ExploreHackathons />} />
              <Route path="/my_events" element={<MyEvents />} />
              <Route path="/register_hackathons" element={<RegisterHackathons />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit_profile" element={<EditProfile />} />
              <Route path="/account" element={<AccountSetting />} />
            </Routes>
          </main>
          <HomeFooter />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

