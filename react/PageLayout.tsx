import React, { FunctionComponent } from 'react'

import Sidebar from './components/Sidebar'

// This component generates the base layout for this app.
const PageLayout: FunctionComponent = ({ children }) => (
  <div className="vh-100 flex flex-row">
    <Sidebar />
    <div className="w-100 overflow-y-scroll">
      <div className="mw8 pv8 ph9 center">{children}</div>
    </div>
  </div>
)

export default PageLayout
