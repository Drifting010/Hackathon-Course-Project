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
    const noRegistered = screen.getByText("You haven't registered in any hackathon");
    const willShow = screen.getByText("The hackathons registered by you will be shown here");
    expect(noRegistered).toBeInTheDocument();
    expect(willShow).toBeInTheDocument();
  });
});
