import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HackathonList from '../../src/pages/participantPages/HackathonList';

describe('HackathonList', () => {
  it('renders HackathonList correctly', () => {
    const { getAllByTestId } = render(<HackathonList />);

    // test HackathonList
    const cards = getAllByTestId('hackthonList', { container: document.body });
    expect(cards).toHaveLength(1);
  });
});