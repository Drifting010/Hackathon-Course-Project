import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomeHeader from "../../src/Components/homeHeader";

describe('ParticipantHeader', () => {
    beforeEach(() => {
        render(<HomeHeader />);
    });

    afterEach(cleanup)

    test('renders logo and navigation links', () => {
        const Hackathon = screen.getByText('Hackathon');

        expect(Hackathon).toBeInTheDocument();
    });


});