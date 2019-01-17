import React from 'react'

import topics from '../topics'

import SidebarItem from './Item'

const Sidebar: React.SFC = () => (
  <nav className="pv8 br b--light-gray">
    <ul className="pl0 list">
      <SidebarItem name="Render Guide" />
      {topics.map(topic => (
        <SidebarItem key={topic.slug} name={topic.name} slug={topic.slug} />
      ))}
    </ul>
  </nav>
)

export default Sidebar
