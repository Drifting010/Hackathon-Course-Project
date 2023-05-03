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

    test('opens and closes user menu when avatar is clicked', async () => {
        render(<ParticipantHeader />);

    });




});