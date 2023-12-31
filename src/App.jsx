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
import { Home } from './pages/onboardingPages';
import Signup from './pages/onboardingPages/signup'
import { Interests } from './pages/onboardingPages';
import { RegisterProfileParticipant } from './pages/onboardingPages';
import { RegisterProfileHost } from './pages/onboardingPages'
//part two - participant
import { ParticipantHome } from './pages/participantPages';
import { ExploreHackathons } from './pages/participantPages';
import { MyEvents } from './pages/participantPages';
import { RegisterHackathons } from './pages/participantPages';
import { Profile } from './pages/participantPages';
import { EditParticipantProfile } from './pages/participantPages';
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
import PublishHackathonPage from './pages/publishHackathonPage';
import Login from './pages/Login';

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
              <Route path="/register_profile_participant" element={<RegisterProfileParticipant />} />
              <Route path="/register_profile_host" element={<RegisterProfileHost />} />
              <Route path="/interests" element={<Interests />} />
              <Route path="/login" element={<Login/>}/>
              {/* part 02 */}
              <Route path="/participant_home" element={<ParticipantHome />} />
              <Route path="/explore_hackathons" element={<ExploreHackathons />} />
              <Route path="/my_events" element={<MyEvents />} />
              <Route path="/register_hackathons" element={<RegisterHackathons />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit_participant_profile" element={<EditParticipantProfile />} />
              <Route path="/account" element={<AccountSetting />} />
              {/* part 03 */}
              <Route path='/host_home' element={<HostHome />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/data_analytics' element={<DataAnalytics />} />
              <Route path='/help_centre' element={<HelpCentre />} />
              <Route path='/host_account' element={<HostAccountSetting />} />
              <Route path='/host_profile' element={<HostProfile />} />
              <Route path='/host_editprofile' element={<HostEditprofile />} />
              <Route path="/publish_hackathon" element={<PublishHackathonPage />} />
            </Routes>
          </main>
          <HomeFooter />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  )
}

