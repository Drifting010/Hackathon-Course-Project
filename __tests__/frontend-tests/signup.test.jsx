import '@testing-library/jest-dom';
import { expect, it, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../../src/pages/onboardingPages/signup';
import { AppContext } from '../../src/Components/AppContextProvider';

describe('Signup', () => {
    it('Renders all input and button elements correctly', () => {
        // Mocking function inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByText, getByRole } = render(
            <AppContext.Provider value={{createUserWithEmailAndPasswordFunction}}>
                <Signup />
            </AppContext.Provider>
        );

        // test: input and button elements are rendered for participant
        expect(getByLabelText('Email (Participant)')).toBeInTheDocument();
        expect(getByLabelText('Password (Participant)')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password (Participant)')).toBeInTheDocument();
        expect(getByText('Participant')).toBeInTheDocument();
        expect(getByText('Host')).toBeInTheDocument();
        expect(getByText('Participant Proceed')).toBeInTheDocument();

        // simulate click on "Host" radio button to display host input fields
        const hostRadioButton = getByRole('radio', { name: 'Host' });
        fireEvent.click(hostRadioButton);

        // test: input and button elements are rendered for host
        expect(getByLabelText('Email (Host)')).toBeInTheDocument();
        expect(getByLabelText('Password (Host)')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password (Host)')).toBeInTheDocument();
        expect(getByText('Host Proceed')).toBeInTheDocument();
    });
});
