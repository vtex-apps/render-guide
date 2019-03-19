import React, { FunctionComponent } from 'react'
import { EmptyState } from 'vtex.styleguide'

interface Props {
  title: string
}

// A simple empty state with a "coming soon" message.
const ComingSoon: FunctionComponent<Props> = ({ title }) => (
  <EmptyState title={title}>Coming soon...</EmptyState>
)

export default ComingSoon
