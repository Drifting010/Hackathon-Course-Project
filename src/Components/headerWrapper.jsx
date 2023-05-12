import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ParticipantHeader } from './'
import { HomeHeader } from './'
import { HostHeader } from './'

// This is the main function that returns the headerWrapper component
export function HeaderWrapper() {
    const location = useLocation();

    // Header2 covers 8 pages
    if (location.pathname.startsWith('/participant_home') || location.pathname.startsWith('/explore_hackathons') || location.pathname.startsWith('/my_events') ||
        location.pathname.startsWith('/register_hackathons') || location.pathname.startsWith('/account') || location.pathname.startsWith('/edit_participant_profile') ||
        location.pathname.startsWith('/profile') || location.pathname.startsWith('/single_hackathon')|| location.pathname.startsWith('/submit_hackathons')) {
        return <ParticipantHeader />;
    }

    // Header3 covers 4 pages
    if (location.pathname.startsWith('/host_home') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/data_analytics') ||
        location.pathname.startsWith('/help_centre') || location.pathname.startsWith('/host_account') || location.pathname.startsWith('/host_editprofile') ||
        location.pathname.startsWith('/host_profile') || location.pathname.startsWith('/publish_hackathon') || location.pathname.startsWith('/host_editevent/')) {
        return <HostHeader />;
    }

    // Header1 covers 3 pages
    if (location.pathname==='/' || location.pathname.startsWith('/page2') || location.pathname.startsWith('/page3')) {
        return <HomeHeader />;
    }

    // Default header if no conditions are met
    // return <HomeHeader />;
}
