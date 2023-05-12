import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HostHome from '../../src/pages/hostPages/hostHome';

describe('hostHome', () => {
  it('renders all elements correctly, all elements appeared on the page', () => {
    const { getAllByRole } = render(<HostHome />);

    // test buttons
    const buttonLabels = ['','All', 'Ongoing', 'Finished', 'Host a Hackathon'];
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(4);
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(buttonLabels[index]);
    });

  });
});
