import React from 'react'

import { Topic } from '../../typings/custom'

import Item from './Item'

interface Props {
  topics: Topic[]
}

const Sidebar: React.SFC<Props> = ({ topics }) => (
  <nav className="pa8 br b--light-gray">
    <ul className="pl0 list">
      <Item name="Render Guide" />
      {topics.map(topic => (
        <Item key={topic.slug} name={topic.name} slug={topic.slug} />
      ))}
    </ul>
  </nav>
)

export default Sidebar
