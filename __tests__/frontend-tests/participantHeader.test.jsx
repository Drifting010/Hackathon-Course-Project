import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ParticipantHeader from "../../src/Components/participantHeader";

describe('ParticipantHeader', () => {
    beforeEach(() => {
        render(<ParticipantHeader />);
    });

    afterEach(cleanup)

    test('renders logo and navigation links', () => {
        const logo = screen.getByText('H A C K A T H O N');
        const exploreHackathons = screen.getByText('Explore Hackathons');
        const myEvents = screen.getByText('My Events');
        const switchToHosting = screen.getByText('Switch to Hosting');

        expect(logo).toBeInTheDocument();
        expect(exploreHackathons).toBeInTheDocument();
        expect(myEvents).toBeInTheDocument();
        expect(switchToHosting).toBeInTheDocument();
    });

    test('opens and closes user menu when avatar is clicked', async () => {
        const avatarButton = screen.getByTestId('avatar-button');

        // Open user menu by clicking the avatar button and four menu items exist
        fireEvent.click(avatarButton);

        const profileMenuItem = screen.getByTestId('menu-item-profile');
        const accountMenuItem = screen.getByTestId('menu-item-account');
        const logoutMenuItem = screen.getByTestId('menu-item-logout');

        expect(profileMenuItem).toBeInTheDocument();
        expect(accountMenuItem).toBeInTheDocument();
        expect(logoutMenuItem).toBeInTheDocument();

        // Close user menu by clicking the avatar button again
        fireEvent.click(avatarButton);

    });

});