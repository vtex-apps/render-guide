import React from 'react'

import ErrorPage from './components/ErrorPage'
import topics from './components/topics'

interface Props {
  params: {
    topic: string
  }
}

const Topic: React.SFC<Props> = ({ params }) => {
  const topic = topics.find(entry => entry.slug === params.topic)

  return topic ? <topic.Component /> : <ErrorPage />
}

export default Topic
