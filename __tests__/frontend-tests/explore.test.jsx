import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Explopre from '../../src/pages/participantPages/explore';

describe('Explopre', () => {
  it('renders all elements correctly, all elements appeared on the page', () => {
    const { getAllByRole, getAllByTestId } = render(<Explopre />);

    // test buttons
    const buttonLabels = ['All', 'Ongoing', 'Finished', 'TAG'];
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(4);
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(buttonLabels[index]);
    });

    // test cards
    // const cards = getAllByTestId('card', { container: document.body });
    // expect(cards).toHaveLength(3);
  });
});
