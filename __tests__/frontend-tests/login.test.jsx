import React from 'react';
import { test, expect } from 'vitest';
import { render, fireEvent, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../src/pages/Login';

describe('Renders page correctly', () => {
  test('Username input field exists and works', () => {
    const { getByLabelText } = render(<Login/>);
  
    const inputElement = getByLabelText(/^Enter email/i);
  
    // Simulate user input by firing a change event
    fireEvent.change(inputElement, { target: { value: 'User input' } });
  
    // Verify that the input field value has been updated
    expect(inputElement.value).toBe('User input');
  });
  
  test('Password input field exists and works', () => {
    const { getByLabelText } = render(<Login/>);
  
    const inputElement = getByLabelText(/^Password/i);
  
    // Simulate user input by firing a change event
    fireEvent.change(inputElement, { target: { value: 'User input' } });
  
    // Verify that the input field value has been updated
    expect(inputElement.value).toBe('User input');
  });

  it('Login button exists', () => {
    const { getByRole } = render(<Login/>);
    const loginButton = getByRole("button", { name: /log in/i });
    expect(loginButton).toBeInTheDocument();
  })

});