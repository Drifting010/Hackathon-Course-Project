import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { HomeFooter } from './'
import { HostFooter } from './'
import { ParticipantFooter } from './'


// This is the main function that returns the headerWrapper component
export function FooterWrapper() {
    const location = useLocation();


    // Header2 covers 1 pages
    if (location.pathname.startsWith('/participant_home') || location.pathname.startsWith('/explore_hackathons') || location.pathname.startsWith('/my_events') ||
        location.pathname.startsWith('/register_hackathons') || location.pathname.startsWith('/account') || location.pathname.startsWith('/edit_participant_profile') ||
        location.pathname.startsWith('/profile') || location.pathname.startsWith('/page11')) {
        return <ParticipantFooter />;
    }

    // Header3 covers 1 pages
    if (location.pathname.startsWith('/host_home') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/data_analytics') ||
        location.pathname.startsWith('/help_centre') || location.pathname.startsWith('/host_account') || location.pathname.startsWith('/host_editprofile') ||
        location.pathname.startsWith('/host_profile') || location.pathname.startsWith('/publish_hackathon')) {
        return <HostFooter />;
    }

    
    // Header1 covers 1 pages
    if (location.pathname==='/' || location.pathname.startsWith('/page2') || location.pathname.startsWith('/page3')) {
        return <HomeFooter />;
    }

    // Default header if no conditions are met
    // return <HomeHeader />;
}
