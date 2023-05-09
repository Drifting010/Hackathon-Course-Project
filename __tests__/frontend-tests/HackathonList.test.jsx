import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HackathonList from '../../src/pages/participantPages/HackathonList';

const initialFilters = { tag: null, offset: null, status: null };

describe('HackathonList', () => {
  it('renders HackathonList correctly', () => {
    const { getAllByTestId } = render(<HackathonList filters={initialFilters}/>);

    // test HackathonList is rendered
    const componennt = getAllByTestId('hackthonList', { container: document.body });
    expect(componennt).toHaveLength(1);
  });

});