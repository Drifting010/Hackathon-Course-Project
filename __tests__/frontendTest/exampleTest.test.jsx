// frontend-tests/Counter.test.jsx
import { test } from 'vitest'
import { render, fireEvent } from '@vitest/plugin-react'
import Counter from '../../src/Components/Counter'

test('increments the counter', async ({ is }) => {
  const { getByText } = render(<Counter />)
  const incrementButton = getByText('Increment')
  const countText = getByText('Count: 0')

  fireEvent.click(incrementButton)

  is(countText.textContent, 'Count: 1')
})
