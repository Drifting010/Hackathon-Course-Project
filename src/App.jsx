import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// header
import { HeaderWrapper } from './Components/headerWrapper';
// footer
import { HomeFooter } from './Components/';
//part one - onboarding
import { Home } from './pages';
import Signup from './pages/signup'
import { Interests } from './pages';
//part two - participant
import { ParticipantHome } from './pages/participantPages';
import { ExploreHackathons } from './pages/participantPages';
import { MyEvents } from './pages/participantPages';
import { RegisterHackathons } from './pages/participantPages';
import { Profile } from './pages/participantPages';
import { EditProfile } from './pages/participantPages';
import { AccountSetting } from './pages/participantPages';
//part three - host
import { HostHome } from './pages/hostPages';
import { Dashboard } from './pages/hostPages';
import { DataAnalytics } from './pages/hostPages';
import { HelpCentre } from './pages/hostPages';
import { HostAccountSetting } from './pages/hostPages';
import { HostProfile } from './pages/hostPages';
import { HostEditprofile } from './pages/hostPages';

import './App.css'
import theme from './Components/theme';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <HeaderWrapper />
          <main>
            <Routes>
              {/* part 01 */}
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/interests" element={<Interests />} />
              {/* part 02 */}
              <Route path="/participant_home" element={<ParticipantHome />} />
              <Route path="/explore_hackathons" element={<ExploreHackathons />} />
              <Route path="/my_events" element={<MyEvents />} />
              <Route path="/register_hackathons" element={<RegisterHackathons />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit_profile" element={<EditProfile />} />
              <Route path="/account" element={<AccountSetting />} />
              {/* part 03 */}
              <Route path='/host_home' element={<HostHome />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/data_analytics' element={<DataAnalytics />} />
              <Route path='/help_centre' element={<HelpCentre />} />
              <Route path='/host_account' element={<HostAccountSetting />} />
              <Route path='/host_profile' element={<HostProfile />} />
              <Route path='/host_editprofile' element={<HostEditprofile />} />
            </Routes>
          </main>
          <HomeFooter />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

