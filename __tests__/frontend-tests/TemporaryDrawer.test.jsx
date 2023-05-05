import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TemporaryDrawer from '../../src/Components/TemporaryDrawer';

describe('TemporaryDrawer component', () => {
  test('should render the "TAG" button', () => {
    const { getByText } = render(<TemporaryDrawer />);
    const tagButton = getByText(/TAG/i);
    expect(tagButton).toBeInTheDocument();
  });

  test('should toggle the drawer when the "TAG" button is clicked', () => {
    const { getByText, queryByRole } = render(<TemporaryDrawer />);
    const tagButton = getByText(/TAG/i);
    fireEvent.click(tagButton);
    const drawer = queryByRole('tag');
    expect(drawer).toBeInTheDocument();
  });

  test('should call the onTagClick function when a tag is clicked', () => {
    const mockOnTagClick = vi.fn();
    const { getByText } = render(<TemporaryDrawer onTagClick={mockOnTagClick} />);
    const tagButton = getByText(/TAG/i);
    fireEvent.click(tagButton);
    const jsTag = getByText(/JavaScript/i);
    fireEvent.click(jsTag);
    expect(mockOnTagClick).toHaveBeenCalledWith('JavaScript');
  });
});
