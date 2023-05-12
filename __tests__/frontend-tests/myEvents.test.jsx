import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import MyEvents from "../../src/pages/participantPages/myEvents";
import { AppContext } from '../../src/Components/AppContextProvider';

describe('MyEvents', () => {
  afterEach(cleanup);
  const getCurrentUser = vi.fn();
  const getUser = vi.fn();
  const signInWithEmailAndPasswordFunction = vi.fn();

  test('renders HackathonList correctly', () => {
    const { getAllByTestId } = render(
      <AppContext.Provider value={{ getCurrentUser, getUser, signInWithEmailAndPasswordFunction }}>
          <MyEvents />
      </AppContext.Provider>
    );
    // test MyEvents is rendered
    const component = getAllByTestId('MyEvents', { container: document.body });
    expect(component).toHaveLength(1);

  });
});
