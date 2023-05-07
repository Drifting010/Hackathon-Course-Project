import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../../src/pages/signup';

describe('Signup', () => {
    it('Renders all input and button elements correctly', () => {
        // render component
        const { getByPlaceholderText, getByText } = render(<Signup />);

        // test: input and button elements are rendered 
        expect(getByPlaceholderText('Email (Participant)')).toBeInTheDocument();
        expect(getByPlaceholderText('Password (Participant)')).toBeInTheDocument();
        expect(getByPlaceholderText('Confirm Password (Participant)')).toBeInTheDocument();
        expect(getByPlaceholderText('Email (Host)')).toBeInTheDocument();
        expect(getByPlaceholderText('Password (Host)')).toBeInTheDocument();
        expect(getByPlaceholderText('Confirm Password (Host)')).toBeInTheDocument();
        expect(getByText('Participant')).toBeInTheDocument();
        expect(getByText('Host')).toBeInTheDocument();
    });
})