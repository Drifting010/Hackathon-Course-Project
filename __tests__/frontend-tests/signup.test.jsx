import '@testing-library/jest-dom';
import { expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Signup from '../../src/pages/onboardingPages/signup';
import { AppContext } from '../../src/Components/AppContextProvider';

describe('Signup', () => {
    it('Renders all input and button elements correctly', () => {
        // Mocking function call inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByText, getByRole } = render(
            <AppContext.Provider value={{ createUserWithEmailAndPasswordFunction }}>
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

    it('Should swith role selection satate', () => {
        // Mocking function call inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByText, getByRole, queryByText } = render(
            <AppContext.Provider value={{ createUserWithEmailAndPasswordFunction }}>
                <Signup />
            </AppContext.Provider>
        );

        // simulate click on "Participant" radio button to display participant input fields
        const participantRadioButton = getByRole('radio', { name: 'Participant' });
        fireEvent.click(participantRadioButton);

        // test: input and button elements are rendered for participant but not for host
        expect(getByLabelText('Email (Participant)')).toBeInTheDocument();
        expect(getByLabelText('Password (Participant)')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password (Participant)')).toBeInTheDocument();
        expect(getByText('Participant Proceed')).toBeInTheDocument();
        expect(queryByText('Email (Host)')).toBeNull();
        expect(queryByText('Password (Host)')).toBeNull();
        expect(queryByText('Confirm Password (Host)')).toBeNull();
        expect(queryByText('Host Proceed')).toBeNull();

        // simulate click on "Host" radio button to display host input fields
        const hostRadioButton = getByRole('radio', { name: 'Host' });
        fireEvent.click(hostRadioButton);

        // test: input and button elements are rendered for host but not for participant
        expect(queryByText('Email (Participant)')).toBeNull();
        expect(queryByText('Password (Participant)')).toBeNull();
        expect(queryByText('Confirm Password (Participant)')).toBeNull();
        expect(queryByText('Participant Proceed')).toBeNull();
        expect(getByLabelText('Email (Host)')).toBeInTheDocument();
        expect(getByLabelText('Password (Host)')).toBeInTheDocument();
        expect(getByLabelText('Confirm Password (Host)')).toBeInTheDocument();
        expect(getByText('Host Proceed')).toBeInTheDocument();
    });

    it('Renders user input correctly', () => {
        // Mocking function call inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByRole } = render(
            <AppContext.Provider value={{ createUserWithEmailAndPasswordFunction }}>
                <Signup />
            </AppContext.Provider>
        );

        // simulate click on "Participant" radio button to display participant input fields
        const participantRadioButton = getByRole('radio', { name: 'Participant' });
        fireEvent.click(participantRadioButton);

        // simulate user input as "Participant"
        fireEvent.change(getByLabelText('Email (Participant)'), { target: { value: '123@123.com' } });
        fireEvent.change(getByLabelText('Password (Participant)'), { target: { value: '123123123' } });
        fireEvent.change(getByLabelText('Confirm Password (Participant)'), { target: { value: '123123123' } });

        // test: user inputs value from "Participant" are rendered
        expect(getByLabelText('Email (Participant)').value).toBe('123@123.com');
        expect(getByLabelText('Password (Participant)').value).toBe('123123123');
        expect(getByLabelText('Confirm Password (Participant)').value).toBe('123123123');

        // simulate click on "Host" radio button to display host input fields
        const hostRadioButton = getByRole('radio', { name: 'Host' });
        fireEvent.click(hostRadioButton);

        // simulate user input as "Host"
        fireEvent.change(getByLabelText('Email (Host)'), { target: { value: '123@123.com' } });
        fireEvent.change(getByLabelText('Password (Host)'), { target: { value: '123123123' } });
        fireEvent.change(getByLabelText('Confirm Password (Host)'), { target: { value: '123123123' } });

        // test: user inputs value from "Host" are rendered
        expect(getByLabelText('Email (Host)').value).toBe('123@123.com');
        expect(getByLabelText('Password (Host)').value).toBe('123123123');
        expect(getByLabelText('Confirm Password (Host)').value).toBe('123123123');
    });

    it('Renders error message for invalid user inputs', () => {
        // Mocking function call inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByRole, getByText } = render(
            <AppContext.Provider value={{ createUserWithEmailAndPasswordFunction }}>
                <Signup />
            </AppContext.Provider>
        );

        // simulate click on "Participant" radio button to display participant input fields
        const participantRadioButton = getByRole('radio', { name: 'Participant' });
        fireEvent.click(participantRadioButton);

        // simulate invalid user input as "Participant"
        fireEvent.change(getByLabelText('Email (Participant)'), { target: { value: '123-123.com' } });
        fireEvent.change(getByLabelText('Password (Participant)'), { target: { value: '12312' } });
        fireEvent.change(getByLabelText('Confirm Password (Participant)'), { target: { value: '123123123' } });

        // test: error messages are rendered
        expect(getByText('Email is invalid')).toBeInTheDocument();
        expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
        expect(getByText('Passwords do not match')).toBeInTheDocument();

        // simulate click on "Host" radio button to display host input fields
        const hostRadioButton = getByRole('radio', { name: 'Host' });
        fireEvent.click(hostRadioButton);

        // simulate invalid user input as "Host"
        fireEvent.change(getByLabelText('Email (Host)'), { target: { value: '123-123.com' } });
        fireEvent.change(getByLabelText('Password (Host)'), { target: { value: '12312' } });
        fireEvent.change(getByLabelText('Confirm Password (Host)'), { target: { value: '123123123' } });

        // test: error messages are rendered
        expect(getByText('Email is invalid')).toBeInTheDocument();
        expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
        expect(getByText('Passwords do not match')).toBeInTheDocument();
    });

    it('Should diable submit button when form is invalid', () => {
        // Mocking function call inside Signup component
        const createUserWithEmailAndPasswordFunction = vi.fn();
        // render component
        const { getByLabelText, getByRole, getByText } = render(
            <AppContext.Provider value={{ createUserWithEmailAndPasswordFunction }}>
                <Signup />
            </AppContext.Provider>
        );
        
        // simulate click on "Participant" radio button to display participant input fields
        const participantRadioButton = getByRole('radio', { name: 'Participant' });
        fireEvent.click(participantRadioButton);

        // simulate invalid user input as "Participant"
        fireEvent.change(getByLabelText('Email (Participant)'), { target: { value: '123-123.com' } });
        fireEvent.change(getByLabelText('Password (Participant)'), { target: { value: '12312' } });
        fireEvent.change(getByLabelText('Confirm Password (Participant)'), { target: { value: '123123123' } });

        // test: submit button disabled for invalid input
        expect(getByText('Participant Proceed')).toBeDisabled();

        // simulate click on "Host" radio button to display host input fields
        const hostRadioButton = getByRole('radio', { name: 'Host' });
        fireEvent.click(hostRadioButton);

        // simulate invalid user input as "Host"
        fireEvent.change(getByLabelText('Email (Host)'), { target: { value: '123-123.com' } });
        fireEvent.change(getByLabelText('Password (Host)'), { target: { value: '12312' } });
        fireEvent.change(getByLabelText('Confirm Password (Host)'), { target: { value: '123123123' } });

        // test: submit button disabled for invalid input
        expect(getByText('Host Proceed')).toBeDisabled();
    });
});
