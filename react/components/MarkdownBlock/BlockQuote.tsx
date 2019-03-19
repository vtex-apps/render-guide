import React, { FunctionComponent } from 'react'

const BlockQuote: FunctionComponent = ({ children }) => (
  <blockquote>
    <p>{children}</p>
  </blockquote>
)

export default BlockQuote
