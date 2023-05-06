import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import MyEvents from "../../src/pages/participantPages/myEvents";

describe('MyEvents', () => {
  afterEach(cleanup);

  test('renders warning when not logged in or no data', () => {
    render(
      <BrowserRouter>
        <MyEvents isLoggedIn={false} data={null} />
      </BrowserRouter>
    );
    const NoResults = screen.getByText('No results found');
    expect(NoResults).toBeInTheDocument();
  });
});
