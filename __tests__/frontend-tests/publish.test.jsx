import React from 'react';
import { test, expect } from 'vitest';
import { render, fireEvent, getByRole, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PublishHackathonPage from '../../src/pages/hostPages/publishHackathon';
import { AppContext } from '../../src/Components/AppContextProvider';

describe('Renders page correctly', () => {
  test('Hackathon essential inputs exists and works', () => {
    //Render essential information component
    const context = vi.fn();
    const { getByLabelText } = render(
    <AppContext.Provider value={{ context }}>
      <PublishHackathonPage/>
    </AppContext.Provider>);
  
    //Find textfields for name and description
    const inputElement = getByLabelText(/^Hackathon name/i);
    const descriptionElement = getByLabelText(/^Hackathon description/i);
  
    // Simulate user inputs by firing change events
    fireEvent.change(inputElement, { target: { value: 'User input' } });
    fireEvent.change(descriptionElement, { target: { value: 'User input' } });
  
    // Verify that the input field value has been updated
    expect(inputElement.value).toBe('User input');
    expect(descriptionElement.value).toBe('User input');
  });
  

  //Need to find a way to test that date picker actually works
  test('Start and end date input fields exist', () => {
    //Render essential information component
    const context = vi.fn();
    const { getByLabelText } = render(
    <AppContext.Provider value={{ context }}>
      <PublishHackathonPage/>
    </AppContext.Provider>);
  
    //Find date picker elements
    const inputElement = getByLabelText(/^Start Date/i);
    const endDateField = getByLabelText(/^End Date/i);

    //Verify presence of components
    expect(inputElement).toBeInTheDocument();
    expect(endDateField).toBeInTheDocument();
  });

  test('Publish button exists', () => {
    //Render publish hackathon page
    const context = vi.fn();
    const { getByRole } = render(
    <AppContext.Provider value={{ context }}>
      <PublishHackathonPage/>
    </AppContext.Provider>);

    //Find button and verify presence
    const loginButton = getByRole("button", { name: /publish/i });
    expect(loginButton).toBeInTheDocument();
  })

  //Need to add test to see if publish button works

});