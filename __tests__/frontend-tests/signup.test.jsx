import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import Signup from '../../src/pages/signup';


describe("Signup", () => {
    it('Renders all input and button elements correctly', () => {
        // render component
        const { getAllByRole } = render(<Signup />);

        // obtain elements
        const inputs = getAllByRole('textbox');
        const buttons = getAllByRole('button');

        // test
        expect(inputs.length).toBe(6);
        expect(buttons).toHaveLength(4);
    });

    it('Renders user input correctly', () => {
        const intputPlaceholders = [
            'Email (Participant)',
            'Password (Participant)',
            'Confirm Password (Participant)',
            'Email (Host)',
            'Password (Host)',
            'Confirm Password (Host)'
        ]

        // render component
        const { getByPlaceholderText} = render(<Signup />);

        // test
        intputPlaceholders.forEach((item)=>{
            expect(getByPlaceholderText(item)).toBeDefined();
        })
    })
})