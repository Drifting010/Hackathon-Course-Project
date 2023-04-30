import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ParticipantHeader } from './participantPages'

export function HeaderWrapper() {
    const location = useLocation();

    // Header1 covers 3 pages
    // if (location.pathname.startsWith('/page1') || location.pathname.startsWith('/page2') || location.pathname.startsWith('/page3')) {
    //     return <Header1 />;
    // }

    // Header2 covers 8 pages
    if (location.pathname.startsWith('/participant_home') || location.pathname.startsWith('/explore_hackathons') || location.pathname.startsWith('/my_events') ||
        location.pathname.startsWith('/page7') || location.pathname.startsWith('/page8') || location.pathname.startsWith('/page9') ||
        location.pathname.startsWith('/page10') || location.pathname.startsWith('/page11')) {
        return <ParticipantHeader />;
    }

    // Header3 covers 4 pages
    // if (location.pathname.startsWith('/page12') || location.pathname.startsWith('/page13') || location.pathname.startsWith('/page14') ||
    //     location.pathname.startsWith('/page15')) {
    //     return <Header3 />;
    // }

    // Default header if no conditions are met
    // return <Header1 />;
}
