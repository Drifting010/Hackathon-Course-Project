import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ParticipantHeader from "../../src/Components/participantHeader";

describe('ParticipantHeader', () => {
    beforeEach(() => {
        render(<ParticipantHeader />);
    });

    test('renders logo and navigation links', () => {
        const logo = screen.getByText('LOGO');
        const exploreHackathons = screen.getByText('Explore Hackathons');
        const myEvents = screen.getByText('My Events');
        const switchToHosting = screen.getByText('Switch to Hosting');

        expect(logo).toBeInTheDocument();
        expect(exploreHackathons).toBeInTheDocument();
        expect(myEvents).toBeInTheDocument();
        expect(switchToHosting).toBeInTheDocument();
    });

    // this test has some issue to be updated!
    // test('opens and closes user menu when avatar is clicked', async () => {
    //     render(<ParticipantHeader />);
    //     // Update this line to use getByTestId
    //     const avatarButtons = screen.getAllByTestId('avatar-button');

    //     // Assuming the first avatar button is the one you want to interact with
    //     const avatarButton = avatarButtons[0];

    //     // Open user menu
    //     fireEvent.click(avatarButton);
    //     const profileMenuItem = await screen.findByText('Profile');
    //     const accountMenuItem = await screen.findByText('Account');
    //     const dashboardMenuItem = await screen.findByText('Dashboard');
    //     const logoutMenuItem = await screen.findByText('Logout');

    //     expect(profileMenuItem).toBeInTheDocument();
    //     expect(accountMenuItem).toBeInTheDocument();
    //     expect(dashboardMenuItem).toBeInTheDocument();
    //     expect(logoutMenuItem).toBeInTheDocument();

    //     // Close user menu by clicking the avatar button again
    //     fireEvent.click(avatarButton);

    //     // Wait for the user menu to close
    //     await waitFor(() => expect(screen.queryByText('Profile')).not.toBeInTheDocument());
    //     await waitFor(() => expect(screen.queryByText('Account')).not.toBeInTheDocument());
    //     await waitFor(() => expect(screen.queryByText('Dashboard')).not.toBeInTheDocument());
    //     await waitFor(() => expect(screen.queryByText('Logout')).not.toBeInTheDocument());
    // });

});