import React from 'react';
import { test, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import MyComponent from '../../src/Components/MyComponent';

test('increments the counter', () => {
  
  const { getByText } = render(<MyComponent />);
  const incrementButton = getByText('Increment');
  const countText = getByText('Count: 0');

  fireEvent.click(incrementButton);

  expect(countText).withTest(() => toHaveTextContent('Count: 1'));
});
