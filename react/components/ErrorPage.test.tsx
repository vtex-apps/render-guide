import { render } from '@vtex/test-tools/react'
import React from 'react'

import ErrorPage from './ErrorPage'

test('should render ErrorPage component', () => {
  const { getByText } = render(<ErrorPage />)

  const element = getByText(/404/)

  expect(element).toBeDefined()
})
